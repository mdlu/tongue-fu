import os, json, logging
from flask import Flask, flash, request, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from get_transcript import *

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

if __name__ == '__main__':
    app.run(debug=True)
