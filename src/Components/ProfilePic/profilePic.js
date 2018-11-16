import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import History from '../../History/History';
// import Image1 from '../../Assets/images/1.png'
// import Image2 from '../../Assets/images/2.png'
import './profilePic.css'
import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import ReactAddToCalendar from 'react-add-to-calendar';
import swal from 'sweetalert2'
import Moment from 'react-moment';


library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt, faCalendarPlus)

class ProfilePic extends Component {
    constructor() {
        super()

        this.state = {
            event: {
                title: 'Sample Event',
                description: 'This is the sample event provided as an example only',
                location: 'Portland, OR',
                startTime: '2016-09-16T20:15:00-04:00',
                endTime: '2016-09-16T21:45:00-04:00'
            },
            users: [],
            accepted: []
        }
    }

    componentDidMount() {
        const { accepted } = this.state
        const userUid = localStorage.getItem('userUid')

        firebase.database().ref('/meeting/' + userUid + '/').on('child_added', (snapShot) => {
            // console.log(snapShot.val(), 'snapsoshujiu')
            if (snapShot.val().request === 'Accepted') {
                accepted.push(snapShot.key)
                this.setState({
                    accepted
                })
            }

        })

        firebase.database().ref('/meeting/' + userUid + '/').on('child_changed', (snapShot) => {
            // console.log(snapShot.val(), 'ye child hwa hah changed')
            if (snapShot.val().request === 'Accepted') {
                accepted.push(snapShot.key)
                this.setState({
                    accepted
                })
            }

        })
    }

    static getDerivedStateFromProps(props) {

        if (props.requests) {
            return { users: props.requests }
        }

    }

    getDirection(direction) {
        console.log(direction, 'direction')
        History.push({
            pathname: '/getDirection',
            state: {
                userData: direction.user1,
                meetingLocation: direction.place
            }
        })
    }

    confirm(direction) {
        console.log(direction, 'direcrionhere')
        swal({
            title: 'Are you sure?',
            text: `You want to accept request from ${direction.user1.fullname}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Accept!'
        }).then((result) => {
            if (result.value) {
                const obj = {
                    request: 'Accepted'
                }
                firebase.database().ref('/meeting/' + direction.userUid + '/' + direction.key).update(obj)
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Request Accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    cancelRequest(direction) {
        console.log(direction, 'cancel direction hre')
        swal({
            title: 'Are you sure?',
            text: `You want to cancel request from ${direction.user1.fullname}`,
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                const obj = {
                    request: 'Cancelled'
                }
                firebase.database().ref('/meeting/' + direction.userUid + '/' + direction.key).update(obj)
                swal({
                    position: 'center',
                    type: 'success',
                    title: 'Request Cancelled',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    addToCalendar(name, time, date) {
        var pm = time.indexOf('PM')
        var am = time.indexOf('AM')
        if (pm !== -1 || am !== -1) {
            const tm = time.slice(0, am - 1 || pm - 1)
            // console.log(time.slice(0,am-1 || pm-1))
            const obj = {
                title: 'Meeting',
                description: 'This is the sample event provided as an example only',
                location: name,
                startTime: <Moment parse="YYYY-MM-DD HH:mm">{date + 'T' + tm}</Moment>,
                endTime: <Moment parse="YYYY-MM-DD HH:mm">{date + 'T' + tm}</Moment>
            }
            this.setState({ event: obj })
        }
    }

    profilePic(user1Image, user2Image, name, date, time, location, timeDuration, direction, key) {
        const { event, icon, accepted } = this.state
        return (
            <div className='div1'>
                <div className='user-pics'>
                    <div>
                        <img src={user1Image} />
                    </div>
                    <div>
                        <img src={user2Image} />
                    </div>
                </div>
                <div className={'nameDiv2'}>
                    {name}
                </div>
                <div className={'meeting-details'}>
                    <div>
                        <FontAwesomeIcon icon='calendar-alt' style={{ marginRight: '3px' }} />{date}
                    </div>
                    <div>
                        <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} />{time}
                    </div>
                    <div>
                        <FontAwesomeIcon icon='map-marker-alt' style={{ marginRight: '3px' }} />{location}
                    </div>
                    <div>
                        {timeDuration}
                    </div>
                </div>
                <div className='footer-btn'>
                    <div>
                        <Button color='default' variant={'contained'} onClick={() => this.getDirection(direction)}>
                            <FontAwesomeIcon icon='directions' style={{ marginRight: '3px' }} />
                            Get Direction
                        </Button>
                    </div>
                    <div>
                        {
                            accepted.length > 0 &&
                                accepted.indexOf(key) !== -1 ?
                                <div className={'calendar'}>
                                    <div className={'fontawe'}>
                                        <FontAwesomeIcon style={{ marginRight: '3px' }} icon={'calendar-plus'} />
                                    </div>
                                    <div onClick={() => this.addToCalendar(location, time, date)}>
                                        <ReactAddToCalendar
                                            event={event}
                                            buttonLabel="Add to Calendar"
                                        />
                                    </div>
                                </div>
                                :
                                <div>
                                    <Button color='secondary' onClick={() => this.cancelRequest(direction)} variant={'contained'}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => this.confirm(direction)} color='primary' variant={'contained'}>
                                        Confirm
                                    </Button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { users } = this.state
        const userId = localStorage.getItem('userUid')

        console.log(users, 'users')
        return (
            <div className='profile-pic'>
                <div>
                    <h2>Requests</h2>
                </div>
                {
                    users.map((items) => {
                        // console.log(items,'items here')
                        const { fullname, images, timeDuration } = items.User1Profile
                        const { user, place, date, time } = items.request
                        const direction = {
                            user1: items.User1Profile,
                            place: items.request.place,
                            key: items.key,
                            userUid: user.userUid
                        }
                        return (
                            items.request.user.userUid === userId &&
                            this.profilePic(images[0], user.images[0], fullname, date, time, place.name, timeDuration[0], direction, items.key)
                        )
                    })
                }
            </div>
        );
    }
}


export default ProfilePic;