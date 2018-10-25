import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import './dashboard.css'
import PropTypes from 'prop-types';
import { Checkbox, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import UserCards from '../../Components/Card/card';
import Cards, { Card } from 'react-swipe-deck'
import geolib from 'geolib'
import swal from 'sweetalert2'
import History from '../../History/History';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});


class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            user: [],
            arr: [],
            profileKey: [],
            allUsers: [],
            usersProfile: []
        }
    }
    componentDidMount() {
        const uid = localStorage.getItem('userUid')
        // console.log(this.props.userData,'userdata')
        // firebase.database().ref()
        const { user, profile } = this.state
        console.log(this.props.userData)
        this.setState({ userData: this.props.userData }, () => {
            firebase.database().ref('/users/').on('child_added', (snapshot) => {
                const beverages = snapshot.val().profile.beverages
                const duration = snapshot.val().profile.timeDuration
                const profile = snapshot.val().profile
                this.state.userData.beverages.map(items => {
                    if (beverages.indexOf(items) !== -1) {
                        // console.log(snapshot.key, 'profile bever')
                        // console.log(beverages)
                        user.push(snapshot.key)
                        this.setState({ user })
                    }
                    this.state.userData.duration.map(item => {
                        if (duration.indexOf(item) !== -1) {
                            // console.log(duration)
                            user.push(snapshot.key)
                            // console.log(profile, 'profile dura')
                            this.setState({ user }, () => {
                                const array = []
                                this.state.user.map(item => {
                                    if (array.indexOf(item) === -1 && item !== uid) {
                                        array.push(item)
                                        this.setState({ array }, () => {
                                            // console.log(this.state.array,'this.state.array')
                                            // console.log(profile.location, 'uprofile')
                                            const result = geolib.isPointInCircle(
                                                this.props.userData.location,
                                                { latitude: profile.location.latitude, longitude: profile.location.longitude },
                                                100000      ///isko 5 km krna ha value 5000
                                            );
                                            if (result) {
                                                if (snapshot.key !== uid) {
                                                    // console.log(snapshot.key, 'keys')
                                                    const { profileKey, allUsers, usersProfile } = this.state

                                                    if (profileKey.indexOf(snapshot.key) === -1) {
                                                        firebase.database().ref('/users/' + snapshot.key + '/profile').once('value', (snapShot) => {
                                                            // console.log(snapShot.val(), 'val()')
                                                            allUsers.push(snapShot.val())
                                                            this.setState({ allUsers }, () => {
                                                                // console.log(this.state.allUsers,'all users here')
                                                                const userPro = Object.values(this.state.allUsers.reduce((acc, cur) => Object.assign(acc, { [cur.number]: cur }), {}))
                                                                this.setState({ usersProfile: userPro })
                                                            })
                                                        })
                                                    }
                                                }
                                            }
                                        })
                                    } else {
                                    }

                                })
                                // console.log(this.state.user, 'user here')
                            })
                        }
                    })
                })
            })
        })
    }

    accept(profile) {
        console.log(profile,'profile')
        swal({
            title: 'Are you sure?',
            text: `You want to meet with ${profile.fullname && profile.fullname}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
              History.push({
                  pathname: '/meeting',
                  state : profile
              })
            }
          })
    }

    render() {
        const { data, showUser, usersProfile, profileKey } = this.state
        // console.log(usersProfile, '********user************')
        // console.log(arr, '********user************')
        return (
            <div className={'no-meeting'}>
                {
                    !showUser &&
                    <div>
                        <h1>Meeting</h1>
                        <div className={'no-meet'}>
                            You haven’t done any meeting yet!
                        </div>
                        <Button color='primary' onClick={() => this.setState({ showUser: true })} variant={'contained'}>Set a meeting!</Button>
                    </div>
                }

                {
                    showUser &&
                    <Cards size={[700, 700]} onEnd={() => console.log('end')} className='master-root'>
                        {usersProfile.map(items =>
                            <Card
                                onSwipeLeft={() => console.log('left')}
                                onSwipeRight={() => this.accept(items)}>
                                {/* <h2>{item}</h2> */}
                                <UserCards name={items.fullname} nickname={items.name} image1 ={items.images[0]} image2 ={items.images[1]} image3 ={items.images[2]}/>
                            </Card>
                        )}
                    </Cards>
                }

            </div>
        );
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);


// export default Dashboard;