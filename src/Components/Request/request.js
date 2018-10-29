import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import History from '../../History/History';
import Container from '../../Container/container';
import ProfilePic from '../../Components/ProfilePic/profilePic';
// import MeetingRequest from '../../Components/MeetingRequest/meetingRequest';


class Request extends Component {
    constructor() {
        super()

        this.state = {
            requests: []
        }
    }
    componentDidMount() {
        console.log(this.props.location.state)
        const { request } = this.props.location.state
        // const userId = localStorage.getItem('userUid')
        // console.log(request,'requests')
        this.setState({ requests: request })

    }

    render() {
        const { requests } = this.state
        const userId = localStorage.getItem('userUid')
        return (
            <Container name={'Meeting App'} >
                {
                    requests.map((items) => {
                        const { fullname, images, location, timeDuration } = items.User1Profile
                        const { user, place, date, time } = items.request
                        const direction = {
                            userDirection: location,
                            location: place.location
                        }
                        console.log(items, 'items')
                        return (
                            items.request.user.userUid === userId &&
                            <ProfilePic user1Image={images[0]} date={date} time={time} timeDuration={timeDuration[0]} direction={direction} user2Image={user.images[0]} name={fullname} location={place.name} />
                        )
                    })
                }
            </Container>
        );
    }
}


export default Request;