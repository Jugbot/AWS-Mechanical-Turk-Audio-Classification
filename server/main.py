import random
import uuid

from flask import *
from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup
from server.process_wins import bonus_type_one, bonus_type_two

app = Flask(__name__,
            static_folder="../docs/assets",
            template_folder="../docs")

BATCH_SIZE = 10


@app.route('/')
def home():
    uid = uuid.uuid4()
    random.seed(uid)
    recordings_type2 = ses.query(RecordingGroup).filter((RecordingGroup.completions_type2 < BATCH_SIZE)).all()
    recordings_type1 = ses.query(RecordingGroup).filter((RecordingGroup.completions_type1 < BATCH_SIZE)).all()
    recordings = recordings_type2 + recordings_type1
    # recording groups with neither type batch satisfied are counted twice
    group = random.choice(recordings)
    task_type = 1 if (group.completions_type1 < BATCH_SIZE) else 2
    items = []
    for audio in group.recordings:
        items.append({
            'file': audio.file_name,
            'label': audio.label
        })
    preemptive = Survey(id=str(uid), task_type=task_type, recording_group_id=group.id)
    ses.add(preemptive)
    ses.commit()

    data = {
        'id': uid,
        'group': group.folder,
        'task_type': task_type,
        'items': items,
    }
    return render_template("index.html", data=data)


@app.route('/post/all', methods=["POST"])
def results():
    data = request.get_json()
    survey = ses.query(Survey).filter(Survey.id == data['id']).one()

    for item in data['items']:
        rec = ses.query(Recording).filter(Recording.file_name == item["file"]).one()
        ann = Annotation(recording=rec, class_label=item['label'], presence_of_label=item['classification'])
        if survey.task_type == 1:
            ann.confidence = item['confidence']
            bonus_type_one(ann)
        elif survey.task_type == 2:
            ann.choices = [int(c) for c in item['choices']]
            bonus_type_two(ann)
        survey.annotations.append(ann)

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
        response = bonus_type_one(ann)
    elif survey.task_type == 2:
        ann.choices = [int(c) for c in item['choices']]
        response = bonus_type_two(ann)
    else:
        ses.rollback()
        app.logger.info("Incorrect task type (%s)", survey.task_type)
        return jsonify(response)

    survey.annotations.append(ann)
    # group = ses.query(RecordingGroup).filter(RecordingGroup.id == Survey.recording_group_id).one()
    if len(survey.annotations) == len(survey.recording_group.recordings):
        survey.completed = True
        if survey.task_type == 1:
            survey.recording_group.completions_type1 += 1
        elif survey.task_type == 2:
            survey.recording_group.completions_type2 += 1
    if data['practice']:
        ses.rollback()
    else:
        ses.commit()
    return jsonify(response)


if __name__ == "__main__":
    app.run()
