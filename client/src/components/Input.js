import React from "react";
import { request } from "https";

class Input extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        stream: null,
        listenStatus: "off",
        // value: "",
        // numInputs: 0,
        // inputsArray: []
      };
      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
    
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(audioStream => {
          this.setState({
            stream: audioStream
          });
      });
  }

  record = () => {
    const recordButton = document.getElementById("record");

    const mediaRecorder = new MediaRecorder(this.state.stream);
    this.setState({
      listenStatus: "on"
    })
    mediaRecorder.start();

    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, {type: 'audio/webm'});
        this.setState({
          listenStatus: "scoring"
        })
        // Send audio blob to be processed
        var audioData = new FormData();
        audioData.append('', audioBlob, 'audio.webm');
        audioData.append("orig", this.props.currentprompt);

        // this.props.submit("{\"left\": \"twix\"}");

        // return fetch('https://tongue-fu.herokuapp.com/', {
        //   method: 'post',
        //   body: audioData,
        // }).then(
        //   response => response.json()
        // ).then(
        //   data => {
        //     console.log(data);  
        //     this.props.submit(data);
        //   }
        // )
        // .catch(error => console.error('Error:', error));


        // // begin test data
        // this.props.submitV2({"ts":"Speaker 0    00:00    It\'s Saturday, Sunday. \n","stripped_ts":"It\'s Saturday, Sunday.","compare":0.28,"orig_score":10,"orig":"peter piper picked a peck","userid":"5d7e49e3c8d5a2627c02ed19"});
        
        // return 0
        // //
        
        // return fetch('https://tongue-fu.herokuapp.com/score', {
        // return fetch('http://localhost:3454/score', {
        return fetch('https://tongue-fu.herokuapp.com/score', {
        // return fetch('http://localhost:3454/', {
          method: 'post',
          body: audioData,
        }).then(
          response => response.json()
        ).then(
          data => {
            data.userid = this.props.userid;
            console.log(data);
            // this.props.submit(data);
            this.props.submitV2(data);
          }
        )
        .catch(error => console.error('Error:', error));
        
        
        // const audioUrl = URL.createObjectURL(audioBlob);
        // const down = document.getElementById("download");
        // down.href = audioUrl;
        // down.download = "test_audio.webm";
    });

    setTimeout(() => {
    mediaRecorder.stop();
    }, 3000);

  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  //   console.log(this.state.value);
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.props.onSubmit(this.state.value);
  //   this.setState({
  //     value: ""
  //   })
  // }



  render() {
    return (
      <div className="promptInput">
        {
          this.state.stream ? (
            this.state.listenStatus == "off" ? (
              <button id="record" className="btn btn-light" onClick={this.record}>Record Audio</button>
            ) : (
              this.state.listenStatus == "on" ? (
                <button id="record" className="btn btn-light" disabled>Recording 🔴</button>
              ) : (
                <button id="record" className="btn btn-light" disabled>Scoring...</button>
              )
            )
          ) : (
            <p className="instructions">Loading...</p>
          )
        }
      </div>
    )
    ;
  }
}

export default Input;
