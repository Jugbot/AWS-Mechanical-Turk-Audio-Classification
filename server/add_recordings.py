
from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup

if __name__ == "__main__":
	rg = RecordingGroup(id=0)
	ses.add(rg)
	ses.add(Recording(id=0, group_id=rg.id, file_name='soundscape_train_bimodal0.wav', label='jackhammer', presence=1))
	ses.add(Recording(id=1, group_id=rg.id, file_name='soundscape_train_bimodal02.wav', label='jackhammer', presence=0))
	ses.commit()
