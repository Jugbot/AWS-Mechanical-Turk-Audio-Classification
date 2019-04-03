import os

from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.dialects import postgresql

db_path = ''
try:
    db_path = os.environ['DATABASE_URL']
except:
    f = open('secrets', 'r')
    db_path = f.read()

eng = create_engine(db_path)
Base = declarative_base()


class Survey(Base):

    __tablename__ = "Survey"

    id = Column(String, primary_key=True)
    approved = Column(Boolean, default=False)
    completed = Column(Boolean, default=False)
    annotations = relationship("Annotation", back_populates='survey')
    recording_group_id = Column(Integer, ForeignKey("RecordingGroup.id"))
    recording_group = relationship("RecordingGroup")
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
    confidence = Column(Integer)
    choices = Column(postgresql.ARRAY(Integer))
    presence_of_label = Column(String)
    # bonus calculations
    lotto_choice = Column(Integer)
    won = Column(SmallInteger)
    """ relationships """
    survey_id = Column(String, ForeignKey("Survey.id"))
    survey = relationship("Survey", back_populates='annotations')
    recording_id = Column(Integer, ForeignKey("Recording.id"))
    recording = relationship("Recording", uselist=False)

    def __repr__(self):
        return "<Annotation(id='{}', label='{}')>".format(self.id,
                                                          self.class_label,)


class RecordingGroup(Base):

    __tablename__ = "RecordingGroup"

    id = Column(Integer, primary_key=True)
    folder = Column(String, unique=True)
    completions_type1 = Column(Integer, default=0)
    completions_type2 = Column(Integer, default=0)
    """ relationships """
    recordings = relationship("Recording", back_populates="group")


class Recording(Base):

    __tablename__ = "Recording"

    id = Column(Integer, primary_key=True)
    file_name = Column(String, unique=True)
    id_hash = Column(String)
    label = Column(String)
    presence = Column(SmallInteger, nullable=False)
    """ relationships """
    group_id = Column(Integer, ForeignKey("RecordingGroup.id"))
    group = relationship("RecordingGroup", back_populates="recordings")


Base.metadata.bind = eng
Session = sessionmaker(bind=eng)
ses = Session()

if __name__ == "__main__":
    print("Wipe & reset database?")
    if input("Y/n: ") == "Y":
        print("recreating database...")
        Base.metadata.drop_all()

Base.metadata.create_all()

