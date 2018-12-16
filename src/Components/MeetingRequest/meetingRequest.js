import React, { Component } from 'react';
// import firebase from '../../Config/Firebase/firebase'
// import History from '../../History/History';
import Image1 from '../../Assets/images/1.png'
// import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import './meetingRequest.css'
library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt)

class MeetingRequest extends Component {
    constructor() {
        super()

        this.state = {
            users: null
        }
    }
    static getDerivedStateFromProps(props) {
        if (props.users) {
            console.log(props.users, 'props')
            // const obj = {
            //     name: props.name,
            //     request: props.request,
            //     time: props.time,
            //     date: props.date,
            //     location: props.location,
            //     image: props.image
            // }
            return { users: props.users }
        }

    }

    profilePic(request, image, date, time, name, location) {
        return (
            <div className='div2'>
                <div className={'status'}>
                    {
                        request === 'Pending' &&
                        <div>
                            {request}...
                        </div>
                    }
                    {
                        request === 'Accepted' &&
                        <div style={{color:'green'}}>
                            {request}...
                        </div>
                    }
                    {
                        request === 'Cancelled' &&
                        <div style={{color:'red'}}>
                            {request}...
                        </div>
                    }
                    {
                        request === 'Complicated' &&
                        <div style={{color:'yellow'}}>
                            {request}...
                        </div>
                    }
                    {
                        request === 'Done' &&
                        <div style={{color:'blue'}}>
                            {request}...
                        </div>
                    }
                </div>
                <div className='user-pics2'>
                    <div>
                        <img src={image} />
                    </div>
                </div>
                <div className={'nameDiv3'}>
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
                    <div></div>
                </div>
            </div>
        )
    }

    render() {
        const { users } = this.state
        // console.log(users, 'uuuuuuuuuuu')
        return (
            <div className='profile-pic2'>
                <div>
                    <h2>Meetings</h2>
                </div>
                {
                    users &&
                    users.map((items) => {
                        return (
                            this.profilePic(items.request, items.image, items.date, items.time, items.name, items.location)
                        )
                    })
                }
            </div>
        );
    }
}


export default MeetingRequest;