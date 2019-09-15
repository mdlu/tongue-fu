import React, {Component} from 'react';
import Game from "./Game";
import { Link } from 'react-router-dom';
// import googlelogo2 from './googlelogo2.png';
// import googlelogosvg from './googlelogo.svg';
// import googlelogo from '../css/googlelogo.png';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentPage:"home"
    };
  }

  componentDidMount() {
    // this.props.setUrl && this.props.setUrl("/");
  }
//
  render () {
    return (
      <div className="page">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <div className="first-section">
          <div className="display-card-with-slogan">
           <h1 className="slogan">Tussles till tongues twists, turns, twit and twat.</h1>
          </div>
          <div className="hover-box">
          <div className="display-card-with-title">
           <h1 className="title">Tongue Fu 😛</h1>
          </div>
          </div>
          {
            this.props.userInfo && this.props.userInfo._id ? (
              <div className="goprofilebutton">
                <Link to="/profile">
                Go to Profile
                </Link>
              </div>
            ) : (
              <div className="signupbutton">
                <a href="/auth/google">
                </a>
              </div>
            )
          }
        </div>

        <div className="over-second-section">
          <div className="second-section">
              <div className="row centering">
                <div className="col-sm-4 column-padding">
                  <div className="section-header">Sign in.</div>
                  <span className="section-text">The first step is always easy. If you can't do it, consult a doctor, do not even attempt this game. Bye felicia. 👋</span>
                </div>
                <div className="col-sm-4 column-padding">
                  <div className="section-header">Team up.</div>
                  <span className="section-text"> Unleash your inner savage by roasting your friends, reveal the skeletons in your closet, and lead your friends astray with bad advice. </span>
                </div>
                <div className="col-sm-4 column-padding">
                  <div className="section-header">Get busy.</div>
                  <span className="section-text">We mean it. Life does not revolve around games. Luckily, HotTake's quick gaming sessions let you pick up right where you left off.</span>
                </div>
              </div>
          </div>
        </div>

        <div className="footer">
          <span>&copy; HackMIT 2019. All Rights Reserved.</span>
        </div>
      </div>
    );
  }
}

export default Home;
