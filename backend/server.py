#Imports
from flask import Flask, jsonify, request
from model import predict_intent,get_follow_up
from flask_cors import CORS,cross_origin
#APP
app = Flask("App")
#CORS Configuration
CORS(app)
@app.route("/",methods=["POST"])
@cross_origin()
#Basic Route to get the result
def get_result():
    return jsonify(predict_intent(request.get_json()['sentence']))

#Route to get Follow Ups Output
@app.route("/follow",methods=["POST"])
@cross_origin()
def get_follow_ups():
    return jsonify(get_follow_up(request.get_json()['intent']))