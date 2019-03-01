import random
from db_tables import ses, Recording, Annotation, Survey, RecordingGroup


if __name__ == "__main__":
	annotations = ses.query(Annotation).filter(Annotation.confidence == None, Annotation.won == None).all()
	for ann in annotations:
		randchoice = random.randint(0, 4)
		ann.lotto_choice = randchoice
		didwin = None
		if ann.choices[randchoice]: # your answer
			didwin = int(ann.recording.presence == ann.presence_of_label)
		else:
			chance = (randchoice + 5)/10
			didwin = int(random.random() < chance)
		ann.won = didwin
		ses.commit()

	annotations = ses.query(Annotation).filter(Annotation.choices == None, Annotation.won == None).all()
	for ann in annotations:
		true_label = ses.query(Recording).filter(ann.recording_id == Recording.id)
		if true_label.presence == True and ann.presence_of_label == 1:
			didwin = 1
		else:
			didwin = 0
		ann.won = didwin
		ses.commit()
