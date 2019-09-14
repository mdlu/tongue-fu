import time
from rev_ai import apiclient
import os

def get_transcript(audio_fpath):
    client = apiclient.RevAiAPIClient("023nGm1xNAOR_e8BecAb-8UNWoHzpqh-xBOOgr85kiy1f3y95NYZLo_r634vB8GDBGhlPBhqX7Am-4Mu6-WUcRWtqSfU4")
    job = client.submit_job_local_file(os.path.realpath(audio_fpath))
    job_id = client.get_job_details(job.id)
    time.sleep(2)
    attempts = 20
    for i in range(attempts):
        try:
            transcript_text = client.get_transcript_text(job.id)
            return transcript_text
        except:
            time.sleep(1)
    else:
        return "Operation timed out"

# TODO: Test bytes_to_wav
def bytes_to_wav(bfile,fname):
    with open("%s.wav" % (fname), mode = 'bx+') as f:
        f.write(bfile)