import boto3


def get_client(live=False):

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

	mturk_environment = environments["live"] if live else environments["sandbox"]

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


	return client, mturk_environment
