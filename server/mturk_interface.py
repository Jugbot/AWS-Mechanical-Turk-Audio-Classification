from io import StringIO
import pandas
import json
import time
import hashlib

import matplotlib
matplotlib.use('Agg')

from db_tables import ses, Annotation, Recording, Base, User

import dateutil

import numpy as np


def get_recording(recording_id=None, id_hash=None):
    if recording_id is not None:
        recording = ses.query(Recording).get(int(recording_id))
    elif id_hash is not None:
        recording = ses.query(Recording).filter(Recording.id_hash == id_hash).first()
    else:
        raise Exception('Either `recording_id` or `id_hash` must be defined.')

    return recording


def post_recordings_to_mturk(group_id, subject_set_id):
    """
    * Add those files from directory `<group_id>` to the database.
    * Add subjects to Zooniverse.
    
    Parameters
    ----------
    group_id : int
        id of the group chosen which files will be uploaded to zooniverse.
    subject_set : int
        The subject set ID as defined by Zooniverse. Look into the Zooniverse project builder to find it.

    Returns
    -------
    None
    """


def get_user(citsci_platform_username):
    """
    * Gets user from database that its `user_id` = hash(zooniverse user name).
    * Creates user if it does not exist.
    
    Parameters
    ----------
    user_id : int
        id of the user to be located.

    Returns
    -------
    user
    """
    if isinstance(citsci_platform_username, str):
        pass
    elif np.isnan(citsci_platform_username):
        citsci_platform_username = 'None'

    md5 = hashlib.md5()
    md5.update(citsci_platform_username.encode('utf-8'))
    hash_citsci_platform_username = md5.hexdigest()

    users = []
    user = ses.query(db_user).filter(db_user.citsci_platform_userid == hash_citsci_platform_username).first()

    if user is None:
        u = db_user(citsci_platform='MTurk',
                    citsci_platform_userid=hash_citsci_platform_username)
        users.append(u)
        ses.add_all(users)
        ses.commit()

        user = ses.query(db_user).filter(db_user.citsci_platform_userid == hash_citsci_platform_username).first()

    return user


def get_annotation(platform_specific_classification_id):
    """
    * Gets annotations from database.
    
    Parameters
    ----------
    platform_specific_classification_id : int
        id of existing classification.

    Returns
    -------
    annot
    """
    annot = ses.query(Annotation).filter(Annotation.platform_specific_classification_id == platform_specific_classification_id).first()

    return annot

def process_annotations(row):
    """
    * Add experience labels to user database

    Parameters
    ----------
    row :
        row being processed from the classification file of the zooniverse database.

    Returns
    -------
    None
    """

def download_annotations(output_dir, generate=False):
    """
    Download annotations as CSVs to `output_dir`.    

    Parameters
    ----------
    output_dir : str
        The output directory.	
    generate : bool
        Generate new data exports to download. (default is False)

    Returns
    -------
    None
    """


def add_annotations_to_db(generate, save_implicit_no_classes=None):
    """
    * Add annotations to database
    * Add experience labels to database

    Parameters
    ----------
    generate : bool
        Generate new data exports to download.

    Returns
    -------
    None
    """
