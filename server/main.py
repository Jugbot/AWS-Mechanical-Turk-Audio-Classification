import random
import uuid

from flask import *
from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup
from server.process_wins import bonus_type_one, bonus_type_two

app = Flask(__name__,
            static_folder="../docs/assets",
            template_folder="../docs")


@app.route('/')
def home():
    uid = uuid.uuid4()
    random.seed(uid)
    task_type = random.randrange(1, 3)
    recordings = ses.query(RecordingGroup).all()
    group = random.choice(recordings)
    items = []
    for audio in group.recordings:
        items.append({
            'file': audio.file_name,
            'label': audio.label
        })
    preemptive = Survey(id=str(uid), task_type=task_type)
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
    ses.commit()
    return jsonify(response)


if __name__ == "__main__":
    app.run()
