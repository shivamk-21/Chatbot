from flask import Flask, jsonify, request
from model import predict_intent
from flask_cors import CORS,cross_origin

app = Flask("App")
CORS(app)
@app.route("/",methods=["POST"])
@cross_origin()
def get_result():
    return jsonify(predict_intent(request.get_json()['sentence']))
