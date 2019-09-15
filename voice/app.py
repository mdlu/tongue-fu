import os
from flask import Flask, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename
from get_transcript import *

UPLOAD_FOLDER = './audio'
# ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        return 
    else:
        if request.method == 'POST':
            file = request.files['']
            filename = secure_filename(file.filename)
            path = os.path.join(app.config['UPLOAD_FOLDER'], filename) # path to audio file
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename)) # saves locally

            return get_transcript(path) # retrieves the file again using the path

if __name__ == '__main__':
    app.run(debug=True)
