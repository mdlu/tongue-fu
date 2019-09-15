import React from "react";

class Input extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        stream: null,
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
    mediaRecorder.start();

    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, {type: 'audio/webm'});
        // Send audio blob to be processed

        console.log("i did it");
        console.log(audioBlob.size);

        return fetch('https://tongue-fu.herokuapp.com/', {
          method: 'post',
          body: audioBlob,
          mode: 'no-cors', // 'cors' by default
          headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'Host': 'tongue-fu.herokuapp.com'
          },
        }).then(function(response) {
          return response.json();
        }).then(function(data) {
          console.log(data);
          console.log("whas data");

        });
        
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
            <button id="record" className="btn btn-light" onClick={this.record}>Record Audio</button>
          ) : (
            <div></div>
          )
        }
      </div>
    )
    ;
  }
}

export default Input;
