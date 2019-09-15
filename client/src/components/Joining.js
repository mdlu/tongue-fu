import React from "react";
// import UserCard from "./UserCard";

class Joining extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        teamname: this.props.game.teamname
      };
  }

  componentDidMount() {
    fetch('/api/game/'+this.props.game.roomid+'/join', {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      // console.log(res);
    });
  }

  startGame = ()=> {
    fetch('/api/game/'+this.props.game.roomid+'/startgame', {method: 'POST'})
    //.then(...) TODO: check if it worked
  }

  handleChangeTeamName = (event)=>{
    this.setState({teamname: event.target.value});
  }
  handleBlurTeamName = (event) => {
    fetch('/api/game/'+this.props.game.roomid+'/maketeamname', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({'teamname': this.state.teamname})
    });
  }

  render() {
    return (
      <div className="new-wrap">
      <div className = "top-bar">Getting your room set up 😛</div>
      <div className="joining">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <div className="teamname">
                <span>Your Room</span>
                {/* {(this.props.isHost ? (
                  <input type="text" className="teamname-input" placeholder="Name" value={this.state.teamname} onChange={this.handleChangeTeamName} onBlur={this.handleBlurTeamName}/>
                ) : (
                  this.props.game.teamname
                ))} */}
                </div>
              <div className="your-team"> Your room code is <span className="roomid">{this.props.game.roomid}</span></div>
              <div className="joined-players">Current Players</div>
              <div>
                <div className="joiner-photo">{this.props.game.users.map((user) => (<img src={user.photo} />))}</div>
                <div className="joiners">{this.props.game.users.map(u => u.name).join(",\n")}</div>
              </div>
            </div>
            <div className="col-sm-5 start-game">
              {(this.props.isHost ? (
                <div>
                  <p className="instructions">Click start to begin the game.</p>
                  <button className="btn btn-light" onClick={this.startGame}>Start 😛</button>
                </div>
              ) : (
                <div className="instructions">
                  Waiting for host...
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Joining;
