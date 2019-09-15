import React from "react";

import Prompt from "./Prompt";
import Input from "./Input";
import Waiting from "./Waiting";


class Prompting extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  submit = (input) => {
    fetch('/api/game/'+this.props.game.roomid+'/input', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({'text': input})
    });
  }

  dataSubmitV2 = (input) => {
    fetch('/api/game/'+this.props.game.roomid+'/input', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'input': input
      })
    });
  }

  waitingOnUser = (userid)=>{
    return !(userid in this.props.game.inputs);
  }
/*
{Object.entries(this.props.game.inputs).map(
  entry => entry[0]+' says ' +entry[1]+'! '
).join('')}
*/
  render() {
    return (this.waitingOnUser(this.props.userInfo._id) ? (
      <div>
      {/* <div className = "top-bar">Can you conquer inconstant consontants quickly? <span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round 🎯<span className="actualteamname">{this.props.game.roundnumber}</span></span></div> */}
        <div className="prompting">
          <Prompt promptText={this.props.game.currentprompt}/>
          <Input submit={this.submit}/>
        </div>
      </div>
    ) : (
      <div>
      <div className = "top-bar">Some slow slimes still sounding slippery syllables...<span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round ✊<span className="actualteamname">{this.props.game.roundnumber}</span></span></div>
      <Waiting
        users={this.props.users}
        waitingOnUser={this.waitingOnUser}
        message="Waiting for others... Will you be the Tongue Fu Master?"
      />
      </div>
    ));
  }
}

export default Prompting;
