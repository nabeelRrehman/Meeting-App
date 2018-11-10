import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import './home.css'
import History from '../../History/History';
import Container from '../../Container/container';
import Profile from '../Profile/profile'
import Dashboard from '../Dashboard/dashboard';
// import ProfilePic from '../../Components/ProfilePic/profilePic';
import MeetingRequest from '../../Components/MeetingRequest/meetingRequest';
import FabIcon from '../../Components/FabIcon/fabIcon';
import { connect } from 'react-redux'


class Home extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    mobileOpen: false,
    request: '',
    users: []
  };


  componentWillMount() {
    const { profile } = this.state
    const user = localStorage.getItem("userUid")
    firebase.database().ref('/users/' + user + '/profile/').on('value', (snapShot) => {
      // console.log(snapShot.val().location,'profile')
      if (snapShot.val()) {
        if (snapShot.val().location) {
          // console.log(snapShot.val().beverages)
          const obj = {
            location: snapShot.val().location,
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
  }

  componentDidMount() {
    let { users } = this.state
    const user = localStorage.getItem('userUid')

    firebase.database().ref('/meeting/').once('value', (snapShot) => {
      for (var key in snapShot.val()) {
        firebase.database().ref('/meeting/' + key + '/').on('child_added', (snaps) => {
          // console.log(snaps.key)
          const userUid = snaps.val().userUid

          if (userUid === user) {
            const obj = {
              request: snaps.val().request,
              date: snaps.val().date,
              time: snaps.val().time,
              location: snaps.val().place.name,
              image: snaps.val().user.images[0],
              name: snaps.val().user.fullname,
              key: snaps.key
            }
            console.log(obj, 'userdata')
            // console.log(snaps.val(), 'userdata')
            // console.log(key, 'key')
            // console.log(user, 'user')
            users.push(obj)
            this.setState({ getRequest: true, request: true, users, })
          }
        })
        firebase.database().ref('/meeting/' + key + '/').on('child_changed', (change) => {
          console.log(change.key, 'child chenged')
          users.map((items, index) => {
            if (items.key === change.key) {
              // console.log(items.key, 'item key')
              // console.log(change.key, 'change key')
              const obj = {
                request: change.val().request,
                date: change.val().date,
                time: change.val().time,
                location: change.val().place.name,
                image: change.val().user.images[0],
                name: change.val().user.fullname,
                key: change.key
              }
              users.splice(index, 1, obj)
              this.setState({ users })
            }
          })
        })
      }
    })

  }

  static getDerivedStateFromProps(props) {
    if (props.user) {
      console.log(props.user, 'userprofile')
    }
  }

  showUser() {
    this.setState({ showUser: true, profile: 'true', request: false, getRequest: false })
  }

  render() {
    const { profile, userData, request, requestUser, getRequest, users, showUser } = this.state
    return (
      <Container name={profile === 'true' ? 'Meeting App' : 'Profile'} >
        {
          profile === 'false' && !request && <Profile profileUpdated={() => { this.setState({ profile: 'true' }) }} />
        }
        {
          profile === 'true' && !request && <Dashboard userData={userData} show={showUser} />
        }
        {
          getRequest && <MeetingRequest users={users} />
        }
        {
          profile === 'true' && getRequest && <FabIcon users={() => this.showUser()} />
        }
      </Container>
    );
  }

}

function mapStateToProps(state) {
  return ({
    user: state.authReducer.USER
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    // CheckUser: () => {
    //     dispatch(OnAuth())
    // },
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;