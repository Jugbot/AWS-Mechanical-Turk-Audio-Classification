import os

from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy_utils import UUIDType, database_exists, create_database



print(os.environ['DATABASE_URL'])

db_path = 'postgresql+psycopg2://postgres:annie779572@localhost/annotations1'
eng = create_engine(db_path)

if not database_exists(eng.url):
    create_database(eng.url)

eng.connect().execute("commit")

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
    classification_time : DateTime
        Date and time when the classification was made
    class_label : str
        The class label of the sound event (e.g. siren_wailing), in the case of binary classification, it will always be the same label.
    ip_address : str
        The IP address of the annotators if available and collected.
    platform_specific_data : str
        The platform specific user id and subject id corresponding to each annotation.
    annotator_task : str
        The task and workflow used to create the annotation.
    workflow_version : int
        The version of the workflow used to create the annotation.
    platform_specific_classification_id : int
        The platform specific id for each annotation

    recording_id : int
        Reference to the recording which was annotated.
    user_id : int
        Reference to the user who performed the annotation.
    """

    __tablename__ = "Annotation"

    id = Column(Integer, primary_key=True)
    classification_time = Column(DateTime)
    class_label = Column(String)
    bet = Column(Float)
    presence_of_label = Column(Float)
    ip_address = Column(String)
    platform_specific_data = Column(String)
    survey_id = Column(String, ForeignKey('Survey.id'))
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


Base.metadata.bind = eng

Session = sessionmaker(bind=eng)
ses = Session()


if __name__ == "__main__":
    print("recreating database...")
    Base.metadata.drop_all()
    Base.metadata.create_all()

