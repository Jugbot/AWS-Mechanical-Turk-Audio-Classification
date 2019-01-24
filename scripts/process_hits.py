import json
from awsclient import get_client
import xml.etree.ElementTree as ET



client, mturk_environment = get_client(live=False)


review = client.list_reviewable_hits()

while review['NumResults'] > 0:
	for hid in client.list_reviewable_hits()['HITs']:
		# print(hid['HITId'])
		hit = client.get_hit(HITId=hid['HITId'])
		print(hit['HIT']['Title'])
		for assignment in client.list_assignments_for_hit(HITId=hid['HITId'],AssignmentStatuses=['Submitted'])['Assignments']:
			tree = ET.fromstring(assignment['Answer'])
			# root = tree.getroot()
			ns = {'ns': "http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2005-10-01/QuestionFormAnswers.xsd"}
			for answer in tree.findall('ns:Answer', ns):
				data = json.loads(answer.find('ns:FreeText', ns).text)
				for obj in data:
					print(obj['file'], ',', obj['question'], ':', obj['classification'], ',', obj['confidence'])
	break