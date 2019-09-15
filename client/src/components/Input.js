import React from "react";

class Input extends React.Component {

  constructor (props) {
      super(props);
      // this.state = {
      //   value: "",
      //   numInputs: 0,
      //   inputsArray: []
      // };
      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);

  }

  record(){

    const recordButton = document.getElementById("record");
    let stream = null;

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stre => {
        this.stream = stre;
    });


    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, {type: 'audio/webm'});
        // Send audio blob to be processed

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
        <button id="record" className="btn btn-light" onClick={this.record}>Record Audio</button>
      </div>
    )
    ;
  }
}

export default Input;
