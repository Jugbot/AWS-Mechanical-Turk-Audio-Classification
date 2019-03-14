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
	randchoice = random.randint(0, 4)
	ann.lotto_choice = randchoice
	did_win = None
	spin_result = None
	response = {}
	type_choice= ann.choices[randchoice]
	if type_choice == TYPE_YOUR_ANSWER:
		did_win = int(ann.recording.presence == ann.presence_of_label)
	else:
		spin_result = random.random()
		percent = (randchoice + 5) * 10
		did_win = int(spin_result < percent / 100)
		response['chance'] = percent
		response['spin'] = spin_result
	ann.won = did_win
	response['type'] = type_choice
	response['won'] = did_win
	return response


def bonus_type_one(ann: Annotation):
	ann.won = int(ann.recording.presence == ann.presence_of_label)
	return {'won': ann.won, 'type': TYPE_YOUR_ANSWER}