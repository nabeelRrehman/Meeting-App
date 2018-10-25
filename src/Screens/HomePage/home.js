import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import './home.css'
import History from '../../History/History';
import Container from '../../Container/container';
import Profile from '../Profile/profile'
import Dashboard from '../Dashboard/dashboard';


class Home extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileOpen: false,
  };

  componentDidMount() {
    const { profile } = this.state
    const user = localStorage.getItem("userUid")
    firebase.database().ref('/users/' + user + '/profile/').on('value', (snapShot) => {
      // console.log(snapShot.val().location,'profile')
      if (snapShot.val()) {
        if (snapShot.val().location) {
          // console.log(snapShot.val().beverages)
          const obj = {
            location : snapShot.val().location,
            beverages: snapShot.val().beverages,
            duration: snapShot.val().timeDuration
          }
          this.setState({ profile: 'true', userData: obj })
        } else {
          this.setState({ profile: 'false' })
        }
      }
      else {
        this.setState({ profile: 'false' })
      }
    })

    // if (profile == 'true') {

    // }
  }

  render() {
    const { profile, userData } = this.state
    return (
      <Container name={profile === 'true' ? 'Meeting App' : 'Profile'} >
        {
          profile === 'false' && <Profile profileUpdated={() => { this.setState({ profile: 'true' }) }} />
        }
        {
          profile === 'true' && <Dashboard userData={userData} />
        }
      </Container>
    );
  }
}


export default Home;