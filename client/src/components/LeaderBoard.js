import React from "react";
import Card from "./Card";

class LeaderBoard extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  nextRound = () => {
    fetch('/api/game/'+this.props.game.roomid+'/nextround', {method: 'POST'});
  };

  render() {
    var cards = {}; // {'userid': {card}}

    // v1
    //   // var scored = fetch('https://tongue-fu.herokuapp.com/score', {
    //   //   method: 'post',
    //   //   body: {
    //   //     'orig': this.props.game.currentprompt,
    //   //     'sample': this.props.game.inputs[userid]
    //   //   },
    //   // }).then(
    //   //   response => response.json()
    //   // ).then(
    //   //   data => {
    //   //     console.log(data);  
    //   //     // this.props.submit(data);
    //   //   }
    //   // )
    //   // .catch(error => console.error('Error:', error));
  
    //   cards[userid] = {
    //     userid: userid,
    //     author: this.props.getUser(userid),
    //     text: this.props.game.inputs[userid],
    //     votesThisRound: 0,
    //     // votesThisRound: scored, // supposed to be the scored thing above
    //     totalVotes: this.props.game.score[userid],
    //     usersThatVoted: []
    //   }
    // });
    
    // v2 
    Object.keys(this.props.game.revResults).forEach( (userid) => {  
      cards[userid] = {
        userid: userid,
        author: this.props.getUser(userid),
        text: this.props.game.revResults[userid],
        votesThisRound: parseInt(this.props.game.scoreMap[userid], 10),
        totalVotes: this.props.game.score[userid],
        usersThatVoted: []
      }
    });


    // v1
    // Object.keys(this.props.game.votesFor).forEach((userid) => {
    //   let voteFor = this.props.game.votesFor[userid];
    //   cards[voteFor].votesThisRound += 1;
    //   cards[voteFor].usersThatVoted.push(this.props.getUser(userid));
    // })

    cards = Object.values(cards);
    cards.sort( (c1, c2) => (c2.votesThisRound - c1.votesThisRound) );

    return (
      <div>
      {/* <div className = "top-bar">Round reveals 😛 <span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round 🎯<span className="actualteamname">{this.props.game.roundnumber}</span></span></div> */}
      <div className="leaderboard-prompt">{this.props.game.currentprompt}</div>
      <div className="leaderboard-page">
        
        <div className = "all-cards">
          {cards.map(card => (
            <Card
              author={card.author}
              key={`Card_${card.userid}`}
              text={card.text}
              votesThisRound={card.votesThisRound}
              totalVotes={card.totalVotes}
              usersThatVoted = {card.usersThatVoted}
            />
          ))}
        </div>
        <div>
          <button className="btn btn-light nexthottake" onClick={this.nextRound}>Next Round 💪</button>
        </div>
      </div>
    </div>
    );
  }
}

export default LeaderBoard;
