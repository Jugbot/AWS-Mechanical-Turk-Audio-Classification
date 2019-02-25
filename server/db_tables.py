import os

from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

db_path = ''
try:
    db_path = os.environ['DATABASE_URL']
except:
    db_path = 'postgresql+psycopg2://postgres:annie779572@sound-annotation.herokuapp.com//annotations1'

eng = create_engine(db_path)
Base = declarative_base()


class Survey(Base):

    __tablename__ = "Survey"

    id = Column(String, primary_key=True)
    approved = Column(Boolean, default=False)
    annotations = relationship("Annotation", backref='Survey')
    task_type = Column(SmallInteger)


class Annotation(Base):
    """
    A single annotation of a recording, i.e. specifying one class label.

    Fields
    ------
    id : int
    class_label : str
        The class label of the sound event (e.g. siren_wailing), in the case of binary classification, it will always be the same label.
    question_1 : int
        The answer to the first question, if task type is 2. It takes values 0 for choosing the lottery and 1 for choosing their answer.
    question_2 : int
        The answer to the second question, if task type is 2. It takes values 0 for choosing the lottery and 1 for choosing their answer.
    question_3 : int
        The answer to the third question, if task type is 2. It takes values 0 for choosing the lottery and 1 for choosing their answer.
    question_4 : int
        The answer to the fourth question, if task type is 2. It takes values 0 for choosing the lottery and 1 for choosing their answer.
    question_5 : int
        The answer to the fifth question, if task type is 2. It takes values 0 for choosing the lottery and 1 for choosing their answer.
    question_6 : int
        The answer to the question for task type is 1. Takes values from 0 to 100
    recording_id : int
        Reference to the recording which was annotated.
    user_id : int
        Reference to the user who performed the annotation.
    """

    __tablename__ = "Annotation"

    id = Column(Integer, primary_key=True)
    class_label = Column(String)
    question_1 = Column(Integer)
    question_2 = Column(Integer)
    question_3 = Column(Integer)
    question_4 = Column(Integer)
    question_5 = Column(Integer)
    question_6 = Column(Integer)
    presence_of_label = Column(String)
    user_id = Column(String, ForeignKey('Survey.id'))
    recording_id = Column(Integer, ForeignKey("Recording.id"))
    #task_id = Column(String, ForeignKey("Survey.id"))

    #recording = relationship("Recording", backref="annotations")

    def __repr__(self):
        return "<Annotation(id='{}', label='{}')>".format(self.id,
                                                          self.class_label,)


class Recording(Base):

    __tablename__ = "Recording"

    id = Column(Integer, primary_key=True)
    file_name = Column(String, unique=True)
    id_hash = Column(String)
    recording_group_id = Column(Integer, ForeignKey("RecordingGroup.id"))


class RecordingGroup(Base):

    __tablename__ = "RecordingGroup"

    id = Column(Integer, primary_key=True)


Base.metadata.bind = eng
Session = sessionmaker(bind=eng)
ses = Session()

if __name__ == "__main__":
    print("recreating database...")
    Base.metadata.drop_all()

Base.metadata.create_all()

