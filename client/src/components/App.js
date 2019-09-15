import React, { Component } from 'react';
import "../css/app.css";
import Redirect from "react-router-dom/es/Redirect";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import {withRouter} from "react-router-dom";
import Game from "./Game";
import Profile from "./Profile";
import NavBar from "./NavBar";
import Home from "./Home";
const API_ENDPOINT_START = 'https://hottake.herokuapp.com/';

class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        userInfo: null
      };
  }

  componentDidMount() {
    this.getUser().then(newState => this.setState(newState));
  }


  render() {
    return (
      <div className="app">
        <NavBar userInfo={this.state.userInfo} logout={this.logout}/>

        <Switch>
          <Route exact path="/" render={(props) => (
            <Home userInfo={this.state.userInfo}/>
          )}/>
          <Route exact path="/profile" render={(props) => (
            this.state.userInfo ? (
              <Profile {...props}
                userInfo={this.state.userInfo}
                getUser={this.getUser}
                game = {this.state.gameInfo}
              />
            ) : (
              <Home 
                userInfo={this.state.userInfo}
                setUrl={this.setUrl}
              />
            )
          )}/>
          <Route exact path="/game/:roomid" render={(props) => (
            (this.state.userInfo ? (
              <Game {...props} userInfo={this.state.userInfo} />
            ) : (
              <p className="instructions">Loading...</p>
            ))
          )}/>
        </Switch>

      </div>

    );
  }

  logout = () => {
    this.setState({
        userInfo: null
    })
  };

  getUser = async () => {
    return fetch('/api/whoami')
    .then(res => res.json())
    .then(
        userObj => {
            if (userObj._id !== undefined) {
                return({
                    userInfo: userObj
                });
            } else {
                return({
                    userInfo: null
                });
            }
        }
    );
  }

  setUrl = (path) => {
    this.props.history.push(path);
  }
}

export default withRouter(App);
