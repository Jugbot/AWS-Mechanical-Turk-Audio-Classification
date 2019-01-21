import random

from flask import Flask, render_template, request, make_response
# from flask_sqlalchemy import SQLAlchemy

DEV_ENVIROMENT_BOOLEAN = True
DEBUG = True

#This allows us to specify whether we are pushing to the sandbox or live site.
if DEV_ENVIROMENT_BOOLEAN:
    AMAZON_HOST = "https://workersandbox.mturk.com/mturk/externalSubmit"
else:
    AMAZON_HOST = "https://www.mturk.com/mturk/externalSubmit"

application = Flask(__name__,
                    static_folder="../docs/assets",
                    template_folder="../docs")
# application.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
# db = SQLAlchemy(application)
#
#
# class Entry(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     audio_id = db.Column(db.String(80), nullable=False)
#     class_id = db.Column(db.String(120), nullable=False)
#     answer = db.Column(db.Boolean, nullable=False)
#     confidence = db.Column(db.Float, nullable=False)
#
#     def __repr__(self):
#         return '<Entry %r>'


@application.route('/', methods=['GET', 'POST'])
def main():
    return render_template("index.html")
    # render_data = {}
    # if request.args.get("assignmentId") == "ASSIGNMENT_ID_NOT_AVAILABLE":
    #     pass
    # else:
    #     random.seed = request.args.get("assignmentId")
    #     render_data = {
    #         "worker_id": request.args.get("workerId"),
    #         "assignment_id": request.args.get("assignmentId"),
    #         "amazon_host": request.args.get("turkSubmitTo"),
    #         "hit_id": request.args.get("hitId"),
    #         "some_info_to_pass": request.args.get("someInfoToPass"),
    #         "task_type": random.choice(1, 2)
    #     }
    #
    # resp = make_response(render_template("index.html", name=render_data))
    #
    # # Without this header, your iFrame will not render in Amazon
    # resp.headers['x-frame-options'] = 'this_can_be_anything'
    # return resp


if __name__ == "__main__":
    application.debug = DEBUG
    application.run()
