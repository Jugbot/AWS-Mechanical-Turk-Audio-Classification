
from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup

if __name__ == "__main__":
	rg = RecordingGroup(id=0)
	ses.add(rg)
	ses.add(Recording(id=0, recording_group_id=rg.id, file_name='soundscape_train_bimodal0.wav'))
	ses.add(Recording(id=1, recording_group_id=rg.id, file_name='soundscape_train_bimodal02.wav'))
	ses.commit()
