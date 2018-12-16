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
import swal from 'sweetalert2'


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

  componentWillReceiveProps(props) {
    console.log(props.userPro, 'us waly ka naam ')
    const userId = localStorage.getItem('userUid')
    if (props.UserRequest !== this.props.UserRequest) {
      // console.log(props.request,'request here aaaaaaaaaaaa')
      var timout = setTimeout(() => {
        props.UserRequest.map((items) => {
          console.log(items, 'keyssssssssss*************')
          var date = new Date(items.request.date + ' ' + items.request.time).getTime()
          var curr = new Date(Date.now()).getTime()

          if (items.request.request === 'Accepted') {

            if (items.request.userUid === userId) {
              if (curr > date || userId ) {    // yahan par userId ko mitana ha
                console.log('greater')
                firebase.database().ref('/postMeeting/' + items.request.userUid + '/' + items.key+'/user1').on('value', (snapShot) => {
                  console.log(snapShot.val())
                  if (snapShot.exists()) {
                    console.log('exists')
                  } else {
                    console.log('not exists')
                    swal({
                      title: 'Meeting!!!',
                      text: `Was the Meeting Successfull?`,
                      type: 'warning',
                      showCancelButton: true,
                      cancelButtonText: 'No',
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes'
                    }).then((result) => {
                      console.log(result)
                      if (result.value) {
                        const obj = {
                          user1: userId,
                          answer1: 'yes'
                        }
                        firebase.database().ref('/postMeeting/' + items.request.userUid + '/' + items.key).update(obj)
                          .then(() => {
                            swal({
                              position: 'center',
                              type: 'success',
                              title: 'Added',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          })
                      } else if (result.dismiss === 'cancel') {
                        const obj = {
                          user1: userId,
                          answer1: 'no'
                        }
                        firebase.database().ref('/postMeeting/' + items.request.userUid + '/' + items.key).update(obj)
                          .then(() => {
                            swal({
                              position: 'center',
                              type: 'success',
                              title: 'Added',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          })
                      }
                    })
                  }
                })
              }
            }
            else if (userId === items.request.user.userUid) {
              if (curr > date) {
                // console.log('greater')
                firebase.database().ref('/postMeeting/' + items.request.userUid + '/' + items.key+'/user2').on('value', (snapShot) => {
                  console.log(snapShot.val())
                  if (snapShot.exists()) {
                    // console.log('exists')
                  } else {
                    // console.log('not exists')
                    swal({
                      title: 'Meeting!!!',
                      text: `Was the Meeting Successfull?`,
                      type: 'warning',
                      showCancelButton: true,
                      cancelButtonText: 'No',
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes'
                    }).then((result) => {
                      // console.log(result)
                      if (result.value) {
                        const obj = {
                          user2: userId,
                          answer2: 'yes'
                        }
                        firebase.database().ref('/postMeeting/' + items.request.userUid + '/' + items.key).update(obj)
                          .then(() => {
                            swal({
                              position: 'center',
                              type: 'success',
                              title: 'Added',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          })
                      } else if (result.dismiss === 'cancel') {
                        const obj = {
                          user2: userId,
                          answer2: 'no'
                        }
                        firebase.database().ref('/postMeeting/' + items.request.userUid + '/' + items.key).update(obj)
                          .then(() => {
                            swal({
                              position: 'center',
                              type: 'success',
                              title: 'Added',
                              showConfirmButton: false,
                              timer: 1500
                            })
                          })
                      }
                    })
                  }
                })
              }
            }
          }
        }, 3000);
      })
    }
    //  console.log(< TimeAgo date = {`${items.date} ${items.time}`} />)
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
    userPro: state.authReducer.USER,
    UserRequest: state.authReducer.REQUEST
  })
}

function mapDispatchToProps(dispatch) {
  return ({

  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;