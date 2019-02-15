import pickle
import sklearn
import modAL
from modAL.models import ActiveLearner
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import f1_score
from sklearn.metrics import roc_curve, precision_recall_curve, auc, make_scorer
import numpy as np
from modAL.uncertainty import uncertainty_sampling
#from modAL.uncertainty import entropy_sampling
#from modAL.uncertainty import margin_sampling
#from modAL.utils.selection import multi_argmax
import sys
import os

#import audio_decryption
#import IPython.display
import random

import matplotlib.pyplot as plt

project_path = '/Users/anaemendezmendez/Documents/GitHub/independent_research/'
data_path = os.path.join(project_path, 'data')
model_path = os.path.join(project_path, 'models')


def get_data(data_set='train_all'):

	data = pickle.load(open(os.path.join(data_path, data_set+'.pickle'), "rb" ))

	X = [data[i][0] for i in range(len(data))]

	y = [data[i][1] for i in range(len(data))]
	
	recordings = [data[i][2] for i in range(len(data))]

	return X, y, recordings

def train_inital_model():
    X_train, y_train, recordings_train = get_data('train_all')

	np.random.seed(123)

	query_idx = np.random.choice(len(X_train))

	X_train_init = X_train[query_idx].reshape(1, -1)
	y_train_init = np.array(y_train[query_idx]).reshape(1)
	recordings_train_init = recordings_train[query_idx]

	clf = RandomForestClassifier(n_estimators=100, random_state=0)
	clf.fit(X_train_init, y_train_init)
	with open(os.path.join(model_path, 'model_initial.pickle'), 'wb') as f:
	    pickle.dump(clf, f, protocol=pickle.HIGHEST_PROTOCOL)

	with open(os.path.join(data_path, 'X_train.pickle'), 'wb') as f:
	    pickle.dump(X_train_init, f, protocol=pickle.HIGHEST_PROTOCOL)
	with open(os.path.join(data_path, 'y_train.pickle'), 'wb') as f:
	    pickle.dump(y_train_init, f, protocol=pickle.HIGHEST_PROTOCOL)
	with open(os.path.join(data_path, 'recordings_train.pickle'), 'wb') as f:
	    pickle.dump(recordings_train_init, f, protocol=pickle.HIGHEST_PROTOCOL)

	X_pool = np.delete(X_train, query_idx, axis=0)
	with open(os.path.join(data_path, 'X_pool.pickle'), 'wb') as f:
	    pickle.dump(X_pool, f, protocol=pickle.HIGHEST_PROTOCOL)
	y_pool = np.delete(y_train, query_idx, axis=0)
	with open(os.path.join(data_path, 'y_pool.pickle'), 'wb') as f:
	    pickle.dump(y_pool, f, protocol=pickle.HIGHEST_PROTOCOL)
	recordings_pool = np.delete(recordings_train, query_idx, axis=0)
	with open(os.path.join(data_path, 'recordings_pool.pickle'), 'wb') as f:
	    pickle.dump(recordings_pool, f, protocol=pickle.HIGHEST_PROTOCOL)

def active_learning(n_queries=1, sampling_strategy=uncertainty_sampling):
    #Load data
    X_train = pickle.load(open(os.path.join(data_path, 'X_train.pickle'), "rb" ))
    y_train = pickle.load(open(os.path.join(data_path, 'y_train.pickle'), "rb" ))
    recordings_train = pickle.load(open(os.path.join(data_path, 'recordings_train.pickle'), "rb" ))
    X_val, y_val, recordings_val = get_data('validate_all')
    X_test, y_test, recordings_test = get_data('test_all')
    X_pool = pickle.load(open(os.path.join(data_path, 'X_pool.pickle'), "rb" ))
    y_pool = pickle.load(open(os.path.join(data_path, 'y_pool.pickle'), "rb" ))
    info_pool = pickle.load(open(os.path.join(data_path, 'recordings_pool.pickle'), "rb" ))
    
    #Load initial classifier
    clf = pickle.load(open(os.path.join(model_path, 'model_initial.pickle'), "rb" ))
    pred = clf.predict(X_test)
    starting_precision = precision_score(y_test,pred)
    starting_recall = recall_score(y_test,pred)
    starting_confusion_matrix = confusion_matrix(y_test,pred)
    
    #Initialize parameters
    count = 1
    #queries = []
    
    #Initialize active leaner
    learner = ActiveLearner(
    estimator=clf,
    query_strategy=sampling_strategy,
    X_training=X_train, y_training=y_train
    )
    
    #Active learning loop
    while count < n_queries+1:
        y = []
        query_idx, query_instance = learner.query(X_pool, n_instances=10)
        #query_idx, query_instance = learner.query(X_pool)
        print('query_idx:')
        print (query_idx)
        
        for i in range(len(query_idx)):
            filepath = info_pool[query_idx[i]].decode('UTF-8')
            filepath = os.path.join(os.path.splitext(filepath)[0]+'.wav')
            print(filepath)
        
            #If quried labeled data, use the label directly, otherwise get human annotation
            if type(filepath) == int:
                y_new = filepath
            else:
                IPython.display.Audio('/scratch/amm1209/independent_research/URBAN_SED/URBAN-SED/audio/train/'+str(filepath))
                print('query #: ', count)
                y_new = input("Please input label for file = '%s' \
                              (1 if noise is present, 0 if noise is not present)" \
                              % (filepath))
                y.append(int(y_new))
        
        print(len(y))
        print(X_pool[query_idx].shape)
        
            #Teach learner with new assured queried label
        if int(y_new) != 2:
            learner.teach(
                X=X_pool[query_idx],
                y=np.array(y).reshape(-1, ))

            #update queries dictionary
            #queries.append(np.array([X_pool[query_idx], info_pool[query_idx], y]))


            #Save the model
            with open(os.path.join(model_path, 'model_initial.pickle'), 'wb') as f:
                pickle.dump(learner, f, protocol=pickle.HIGHEST_PROTOCOL)
                
            X_train = np.vstack((X_train,X_pool[query_idx]))
            print(y_train.shape)
            print(np.array(y).reshape(-1, ).shape)
            y_train = np.concatenate((y_train,np.array(y).reshape(-1, )))
            [recordings_train].append(info_pool[query_idx])
            
            with open(os.path.join(data_path, 'X_train.pickle'), 'wb') as f:
                pickle.dump(X_train, f, protocol=pickle.HIGHEST_PROTOCOL)
            with open(os.path.join(data_path, 'y_train.pickle'), 'wb') as f:
                pickle.dump(y_train, f, protocol=pickle.HIGHEST_PROTOCOL)
            with open(os.path.join(data_path, 'recordings_train.pickle'), 'wb') as f:
                pickle.dump(recordings_train, f, protocol=pickle.HIGHEST_PROTOCOL)
            
                
            count += 1
            
        #Update pool
        X_pool = np.delete(X_pool, query_idx, axis=0)
        y_pool = np.delete(y_pool, query_idx, axis=0)
        info_pool = np.delete(info_pool, query_idx, axis=0)
        
        with open(os.path.join(data_path, 'X_pool.pickle'), 'wb') as f:
                pickle.dump(X_pool, f, protocol=pickle.HIGHEST_PROTOCOL)
        with open(os.path.join(data_path, 'y_pool.pickle'), 'wb') as f:
                pickle.dump(y_pool, f, protocol=pickle.HIGHEST_PROTOCOL)
        with open(os.path.join(data_path, 'recordings_pool.pickle'), 'wb') as f:
                pickle.dump(info_pool, f, protocol=pickle.HIGHEST_PROTOCOL)
