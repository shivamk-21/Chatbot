#Imports
from flask import Flask, jsonify, request
from model import predict_intent
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
