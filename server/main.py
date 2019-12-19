import random
import uuid

from flask import *
from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup
from server.process_wins import bonus_type_one, bonus_type_two

app = Flask(__name__,
            static_folder="../docs/assets",
            template_folder="../docs")

BATCH_SIZE = 10
PAY_PER_ANNOTATION_NORMAL = 0.24
PAY_PER_ANNOTATION_LOTTERY = 0.20

NORMAL_TASK = 1
LOTTERY_TASK = 2
NEW_TASK = 3

@app.route('/')
def home():
    uid = uuid.uuid4()
    random.seed(uid)
    recordings_type2 = ses.query(RecordingGroup).filter((RecordingGroup.completions_type2 < BATCH_SIZE)).all()
    recordings_type1 = ses.query(RecordingGroup).filter((RecordingGroup.completions_type1 < BATCH_SIZE)).all()
    recordings_type3 = ses.query(RecordingGroup).filter((RecordingGroup.completions_type3 < BATCH_SIZE)).all()
    groups = recordings_type2 + recordings_type1 + recordings_type3
    # recording groups with neither type batch satisfied are counted twice
    group = random.choice(groups)
    if group.completions_type2 < BATCH_SIZE and group.completions_type1 < BATCH_SIZE and group.completions_type3 < group.completions_type3:
        task_type = random.randint(1, 2, 3)
    elif group.completions_type1 < BATCH_SIZE:
        task_type = 1
    elif group.completions_type2 < BATCH_SIZE:
        task_type = 2
    else:
    	task_type = 3
    items = []
    if app.debug:
        print("sending small debug batch")
        recordings = group.recordings[:2]
    else:
        recordings = group.recordings
    for audio in recordings:
        items.append({
            'file': group.folder + '/' + audio.file_name,
            'truth': audio.presence,
            # 'label': audio.label
        })
    preemptive = Survey(id=str(uid), task_type=task_type, recording_group_id=group.id)
    ses.add(preemptive)
    ses.commit()

    data = {
        'id': uid,
        'reward': PAY_PER_ANNOTATION_NORMAL if (task_type == NORMAL_TASK or task_type == NEW_TASK) else PAY_PER_ANNOTATION_LOTTERY,
        'task_type': task_type,
        'items': items,
    }
    return render_template("index.html", data=data)


@app.route('/truth', methods=["POST"])
def truth():
    data = request.get_json()
    rec = ses.query(Recording).filter(Recording.file_name == data['item']['file']).one()
    return jsonify(rec.presence)


@app.route('/post/all', methods=["POST"])
def results():
    data = request.get_json()
    survey = ses.query(Survey).filter(Survey.id == data['id']).one()

    for item in data['items']:
        rec = ses.query(Recording).filter(Recording.file_name == item["file"].split('/')[-1]).one()
        ann = Annotation(recording=rec, class_label='jackhammer', won=int(item["won"]),
                         presence_of_label=item['classification'], timestamp=item["timestamp"])
        if survey.task_type == 1:
            ann.confidence = item['confidence']
            # bonus_type_one(ann)
        elif survey.task_type == 2:
            ann.choices = [int(c) for c in item['choices']]
            ann.lotto_choice = item['chose']
            # bonus_type_two(ann)
        elif survey.task_type == 3:
        	continue
        else:
            ses.rollback()
            app.logger.info("Incorrect task type (%s)", survey.task_type)
        survey.annotations.append(ann)
    survey.wins = data["wins"]

    if len(survey.annotations) == len(survey.recording_group.recordings):
        survey.completed = True
        if survey.task_type == 1:
            survey.recording_group.completions_type1 += 1
        elif survey.task_type == 2:
            survey.recording_group.completions_type2 += 1
        elif survey.task_type == 3:
        	survey.recording_group.completions_type3 += 1

    ses.commit()
    return "success"


@app.route('/post/feedback', methods=["POST"])
def feedback():
    data = request.get_json()
    survey = ses.query(Survey).filter(Survey.id == data['id']).one()

    survey.feedback = data['feedback']

    ses.commit()
    return "success"


@app.route('/post/one', methods=["POST"])
def result():
    data = request.get_json()
    survey = ses.query(Survey).filter(Survey.id == data['id']).one()
    if survey.completed:
        return jsonify("This survey is already completed!")
    item = data['item']
    rec = ses.query(Recording).filter(Recording.file_name == item["file"]).one()
    ann = Annotation(recording=rec, class_label=item['label'], presence_of_label=item['classification'])
    response = ""

    if survey.task_type == 1:
        ann.confidence = item['confidence']
        response = bonus_type_one()
    elif survey.task_type == 2:
        ann.choices = [int(c) for c in item['choices']]
        response = bonus_type_two(ann)
    elif survey.task_type == 3:
    	ann.presence_of_label = 1 if (item['presence_of_label'] == 'true') else 0
    	response = bonus_type_one()
    else:
        ses.rollback()
        app.logger.info("Incorrect task type (%s)", survey.task_type)
        return jsonify(response)

    survey.annotations.append(ann)
    if data['practice']:
        ses.rollback()
    else:
        ses.commit()
    response['id'] = ann.id
    return jsonify(response)


@app.route('/post/one/result', methods=["POST"])
def process_result():
    data = request.get_json()
    survey = ses.query(Survey).filter(Survey.id == data['id']).one()
    # group = ses.query(RecordingGroup).filter(RecordingGroup.id == Survey.recording_group_id).one()
    if len(survey.annotations) == len(survey.recording_group.recordings):
        survey.completed = True
        if survey.task_type == 1:
            survey.recording_group.completions_type1 += 1
        elif survey.task_type == 2:
            survey.recording_group.completions_type2 += 1
        elif survey.task_type == 3:
        	survey.recording_group.completions_type3 += 1


if __name__ == "__main__":
    app.run(debug=True, use_debugger=False, use_reloader=False, passthrough_errors=True)
