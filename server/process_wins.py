import random
from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup

TYPE_YOUR_ANSWER = 1

if __name__ == "__main__":
	annotations = ses.query(Annotation).filter(Annotation.won == None).all()
	for ann in annotations:
		randchoice = random.randint(0, 4)
		ann.lotto_choice = randchoice
		did_win = None
		if ann.choices[randchoice]: # your answer
			did_win = int(ann.recording.presence == ann.presence_of_label)
		else:
			chance = (randchoice + 5)/10
			did_win = int(random.random() < chance)
		ann.won = did_win
	ses.commit()


def bonus_type_two(ann: Annotation):
	rand_choice = random.randint(0, 4)
	ann.lotto_choice = rand_choice
	response = {}
	type_choice = ann.choices[rand_choice]
	if type_choice != TYPE_YOUR_ANSWER:
		percent = (rand_choice + 5) * 10
		response['chance'] = percent
	response['type'] = type_choice
	response['chose'] = rand_choice
	return response


def bonus_type_one(ann: Annotation):
	return {'type': TYPE_YOUR_ANSWER}