import os
import random
import uuid

from flask import *
from server.db_tables import ses, Recording, Annotation, Survey

try:
    # sample temp data
    ses.add(Recording(file_name='soundscape_train_bimodal0.wav', id_hash='whatever'))
    ses.add(Recording(file_name='soundscape_train_bimodal02.wav', id_hash='whatever2'))
    ses.commit()
except:
    ses.rollback()


app = Flask(__name__,
            static_folder="../docs/assets",
            template_folder="../docs")


@app.route('/')
def hello_world():
    id = uuid.uuid4()
    random.seed(id)
    task_type = random.randrange(1, 3)
    result = [r for [r,] in ses.query(Recording.file_name).all()]
    print(result)
    files = random.sample(result, len(result))
    labels = ["jackhammer"] * len(files)
    items = []
    for file, label in zip(files, labels):
        items.append({
            'file': file,
            'label': label
        })
    preemptive = Survey(id=str(id), task_type=task_type)
    ses.add(preemptive)
    ses.commit()

    data = {
        'id': id,
        'task_type': task_type,
        'items': items,
    }
    return render_template("index.html", data=data)


@app.route('/post', methods=["POST"])
def results():
    data = request.get_json()
    print(data)

    survey = ses.query(Survey).filter(Survey.id == data['id']).one()

    for item in data['items']:
        rec = ses.query(Recording).filter(Recording.file_name==item["file"]).one()
        survey.annotations.append(Annotation(recording=rec, class_label=item['label'], bet=item['confidence']))
    ses.commit()
    return "success"


if __name__ == "__main__":
    app.run()
    
