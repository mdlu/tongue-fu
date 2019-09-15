import os, json, logging
from flask import Flask, flash, request, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from get_transcript import *
import twister_score

UPLOAD_FOLDER = './audio'
ALLOWED_EXTENSIONS = {'webm'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def home():
    if request.method == 'GET':
        return 
    else:
        if request.method == 'POST':
            file = request.files['']
            filename = secure_filename(file.filename)
            path = os.path.join(app.config['UPLOAD_FOLDER'], filename) # path to audio file
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) # saves locally

            a = get_transcript(path) # retrieves the file again using the path
            return json.dumps(a)


@app.route('/score', methods=['GET', 'POST'])
@cross_origin()
def score():
    if request.method == 'GET':
        return 
    else:
        if request.method == 'POST':
            orig = request.form["orig"]
            sample = request.form["sample"]
            a = int(twister_score.compare(orig, sample) * twister_score.score(orig) * 10) # multiplies accuracy by the difficulty of the tongue twister, and scales by 10
            return json.dumps(a)

if __name__ == '__main__':
    app.run(debug=True)
