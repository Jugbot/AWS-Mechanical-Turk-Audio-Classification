import os

from server.db_tables import ses, Recording, Annotation, Survey, RecordingGroup
from server.main import app

if __name__ == "__main__":
	ROOT, DIRS, FILES = 0, 1, 2
	root = os.path.join(app.static_folder, 'audio')
	config_path = os.path.join(root, 'audiometa.txt')
	with open(config_path, 'r') as file:
		config = {eval(t)[0]:eval(t)[1] for t in file.readlines() if t is not None}
	print("creating entries from", root)
	folders = next(os.walk(root))[DIRS]
	for folder in folders:
		print('---', folder)
		rg = RecordingGroup(folder=folder)
		ses.add(rg)
		files = next(os.walk(os.path.join(root, folder)))[FILES]
		for file in files:
			print(file)
			ses.add(Recording(group=rg, file_name=file, label='jackhammer', presence=config[file]))
	ses.commit()
