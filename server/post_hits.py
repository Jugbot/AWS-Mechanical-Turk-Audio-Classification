
import boto3

create_hits_in_live = False

environments = {
        "live": {
            "endpoint": "https://mturk-requester.us-east-1.amazonaws.com",
            "preview": "https://www.mturk.com/mturk/preview",
            "manage": "https://requester.mturk.com/mturk/manageHITs",
            "reward": "0.00",
            "survey_base_url": "https://localhost/?"
        },
        "sandbox": {
            "endpoint": "https://mturk-requester-sandbox.us-east-1.amazonaws.com",
            "preview": "https://workersandbox.mturk.com/mturk/preview",
            "manage": "https://requestersandbox.mturk.com/mturk/manageHITs",
            "reward": "0.11",
            "survey_base_url": "https://jugbot.github.io/AWS-Mechanical-Turk-Audio-Classification/?"
        },
}
mturk_environment = environments["live"] if create_hits_in_live else environments["sandbox"]


### THIS ASSUMES ENV VARS ARE SET ###
session = boto3.Session()
client = session.client(
    service_name='mturk',
    region_name='us-east-1',
    endpoint_url=mturk_environment['endpoint'],
)

# Test that you can connect to the API by checking your account balance
user_balance = client.get_account_balance()

# In Sandbox this always returns $10,000. In live, it will be your acutal balance.
print("Your account balance is {}".format(user_balance['AvailableBalance']))

# data to pass via url header
# questions = ['some_type', 'another']
# files = ['soundscape_train_bimodal0.wav', 'soundscape_train_bimodal0.wav']
items = [
    {
        'question': 'some_type',
        'file': 'soundscape_train_bimodal0.wav'
    },
    # {
    #     'question': 'another',
    #     'file': 'soundscape_train_bimodal0.wav'
    # }
]
task_type = 1
from json import dumps
data = {'items': dumps(items), 'task_type': task_type}

# The question we ask the workers is contained in this file.
question_sample = open("external_question.xml", "r").read()
# Add extra arguments
survey_url = mturk_environment["survey_base_url"]
from urllib.parse import urlencode
survey_url += urlencode(data) # "task_type={}&questions={}&files={}".format(task_type, ','.join(questions), ','.join(files))
# print(survey_url)
from xml.sax.saxutils import escape
question_sample = question_sample.format(escape(survey_url))
print(question_sample)

# Example of using qualification to restrict responses to Workers who have had
# at least 80% of their assignments approved. See:
# http://docs.aws.amazon.com/AWSMechTurk/latest/AWSMturkAPI/ApiReference_QualificationRequirementDataStructureArticle.html#ApiReference_QualificationType-IDs
worker_requirements = [{
    'QualificationTypeId': '000000000000000000L0',
    'Comparator': 'GreaterThanOrEqualTo',
    'IntegerValues': [80],
    'RequiredToPreview': False,
}]

# Create the HIT
response = client.create_hit(
    MaxAssignments=9,
    LifetimeInSeconds=6000,
    AssignmentDurationInSeconds=600,
    Reward=mturk_environment['reward'],
    Title='TEST',
    Keywords='question, answer, research',
    Description='Answer a simple question. Created from mturk-code-samples.',
    Question=question_sample,
    QualificationRequirements=worker_requirements,
)

# The response included several fields that will be helpful later
hit_type_id = response['HIT']['HITTypeId']
hit_id = response['HIT']['HITId']
print("\nCreated HIT: {}".format(hit_id))
print("Current HITs:")
for hit in client.list_hits()['HITs']:
    print(hit['HITId'])
print("\nYou can work the HIT here:")
print(mturk_environment['preview'] + "?groupId={}".format(hit_type_id))

print("\nAnd see results here:")
print(mturk_environment['manage'])