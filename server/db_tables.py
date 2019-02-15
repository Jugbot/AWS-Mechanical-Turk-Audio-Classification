import os

from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy_utils import UUIDType, database_exists, create_database

db_path = ''
try:
    # postgres://ydxhqgznjlrimb:298fedc97d3ee382affd81dcdf202fb47d4ec17324d617fd4b6be98afb9320ba@ec2-23-21-165-188.compute-1.amazonaws.com:5432/d5imubgfjut62u
    db_path = os.environ['DATABASE_URL']
except:
    db_path = 'postgresql+psycopg2://postgres:annie779572@sound-annotation.herokuapp.com//annotations1'

eng = create_engine(db_path)

# if not database_exists(eng.url):
#     create_database(eng.url)

# eng.connect().execute("commit")

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
   survey_id : int
        The task used to create the annotation.
    recording_id : int
        Reference to the recording which was annotated.
    user_id : int
        Reference to the user who performed the annotation.
    """

    __tablename__ = "Annotation"

    id = Column(Integer, primary_key=True)
    class_label = Column(String)
    bet = Column(Float)
    presence_of_label = Column(String)
    user_id = Column(String, ForeignKey('Survey.id'))
    recording_id = Column(Integer, ForeignKey("Recording.id"))

    recording = relationship("Recording", backref="annotations")

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

