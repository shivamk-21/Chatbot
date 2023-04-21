#Imports
from tensorflow.keras.models import load_model
import difflib
import nltk
import numpy as np
from nltk.stem import WordNetLemmatizer
import pickle
import json

#NLTK Downloads
nltk.download('punkt')
nltk.download('wordnet')

#Data Load of words and classes
responses = json.loads(open('responses.json', encoding="utf8").read())
with open('data.pkl', 'rb') as f:
    data = pickle.load(f)
words,classes=data['words'],data['classes']

#Model Load
model=load_model('Model.h5')

#Function for Sentence Lemmatization and spell correction
def lemmatize(senetence):
    lemmatizer = WordNetLemmatizer()
    ignore = ['a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'being', 'been', 'and', 'or', 'of', 'at', 'by', 'in', 'on', 'to', 'with', 'that', 'this', 'for', 'from', 'it', 'you', 'he', 'she', 'they', 'we', 'me', 'him', 'her', 'them', 'my', 'your', 'his', 'her', 'our', 'their', 'what', 'where', 'when', 'why', 'how', 'which', 'who', 'whom','next', '!', '?', '.', ',', ';', ':', '-', '_', '(', ')', '[', ']', '{', '}', "'", '"']
    sentence_words = nltk.word_tokenize(senetence)
    sentence_words = [lemmatizer.lemmatize(word)  for word in sentence_words if word not in ignore]
    try :
        l=[difflib.get_close_matches(word, words)[0] for word in sentence_words]  #Corrected spells 
        if len(l)!=0:
            sentence_words = l
    except IndexError:
        pass
    return sentence_words

#Function for Transforming data in required format
def bag_of_words(sentence):
    bag = [0] * len(words)
    for w in sentence:
        for i, word in enumerate(words):
            if word == w.lower():
              bag[i] = 1
    return bag

#Function for Predicting the intent
def predict_intent(message):
    bag=bag_of_words(lemmatize(message))
    res=model.predict(np.array([bag]))[0]
    ERROR_THRESHOLD = 0.3
    results = [[i,r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda  x:x[1], reverse=True)
    res_list = []
    for r in results:
        res_list.append(classes[r[0]])
    if len(res_list)==0:
      res_list.append("sorry")
    return {"msg":[responses[r] for r in res_list[:3]]}