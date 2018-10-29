import React, { Component } from 'react';
// import firebase from '../../Config/Firebase/firebase'
// import History from '../../History/History';
import Image1 from '../../Assets/images/1.png'
import Image2 from '../../Assets/images/2.png'
import './profilePic.css'
import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDirections, faCalendarAlt, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faDirections, faCalendarAlt, faClock, faMapMarkerAlt)

class ProfilePic extends Component {
    constructor() {
        super() 

        this.state = {
            user1Image : null,
            date : null,
            time : null,
            timeDuration : null,
            direction : null,
            user2Image : null,
            name : null,
            location : null,

        }
    }
    static getDerivedStateFromProps(props) {

        if (props.user1Image) {
            return {
                user1Image: props.user1Image,
                date: props.date,
                time: props.time,
                timeDuration: props.timeDuration,
                direction: props.direction,
                user2Image: props.user2Image,
                name: props.name,
                location: props.location
            }
        }
    }

    render() {
        const { user1Image, date, time, timeDuration, direction, user2Image, name, location } = this.state
        return (
            <div className='profile-pic'>
                <div>
                    <h2>Requests</h2>
                </div>
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
                            <FontAwesomeIcon icon='clock' style={{ marginRight: '3px' }} />{time} PM
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
                            <Button color='default' variant={'contained'}>
                                <FontAwesomeIcon icon='directions' style={{ marginRight: '3px' }} />
                                Get Direction
                    </Button>
                        </div>
                        <div>
                            <Button color='secondary' variant={'contained'}>
                                Cancel
                    </Button>
                            <Button color='primary' variant={'contained'}>
                                Confirm
                    </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ProfilePic;