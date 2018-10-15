import React, { Component } from 'react';
import './home.css'

class Container extends Component {
  constructor() {
    super()

    this.state = {
        text : 'nabeel'
    }

  }

  componentDidMount(){
    // const currentUsers = firebase.auth().app.services_.auth
    // for(var key in currentUsers){
    //   console.log(currentUsers[key].currentUser)
    // }
  }

  render() {
    return (
      <div className = 'profile'>
          <h1>Profile</h1>
          <div>{this.state.text}</div>
      </div>
    );
  }
}

export default Container;
