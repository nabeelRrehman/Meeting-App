import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import History from '../../History/History';
import './meeting.css'
import Container from '../../Container/container';
import Axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import swal from 'sweetalert2'

class Meeting extends Component {
    constructor() {
        super()

        this.state = {
            recommended: [],
            search: [],
            searchQuery: '',
            setTime: false,
            date: '2018-05-24',
            time: '07:30'
        }
    }

    componentDidMount() {
        const { location, beverages } = this.props.location.state
        // console.log(this.props.location.state, 'user data')
        const CLIENT_ID = 'M1YXZINYRW1BCTJHKY02TNOIDCBHUS2Y053UOZC0QZKJQVSB'
        const CLIENT_SECRET = 'PYUDNO3MAEA0OXI3RAVCF4YEX0H0LYS1GP53ATFVMTFYD5CX'
        const LATITUDE = location.latitude
        const LONGITUDE = location.longitude
        const QUERY = beverages[0]


        Axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&ll=${LATITUDE},${LONGITUDE}&query=${QUERY}`)
            .then((res) => {
                const recommend = res.data.response.groups[0].items
                this.setState({ recommended: recommend })
            })

    }

    componentDidUpdate() {
        // console.log(this.state.recommended[0].venue, 'places')
    }

    search(query) {
        const { location } = this.props.location.state
        // console.log(this.props.location.state, 'user data')
        const CLIENT_ID = 'M1YXZINYRW1BCTJHKY02TNOIDCBHUS2Y053UOZC0QZKJQVSB'
        const CLIENT_SECRET = 'PYUDNO3MAEA0OXI3RAVCF4YEX0H0LYS1GP53ATFVMTFYD5CX'
        const LATITUDE = location.latitude
        const LONGITUDE = location.longitude
        const QUERY = query

        this.setState({ searchQuery: QUERY })
        Axios.get(`https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20180323&ll=${LATITUDE},${LONGITUDE}&query=${QUERY}`)
            .then((res) => {
                const recommend = res.data.response.groups[0].items
                this.setState({ search: recommend })
            })
    }

    setPlace(place) {
        console.log(place)
        const venue = place.venue
        const meetingPlace = {
            name: venue.name,
            location: {
                latitude: venue.location.lat,
                longitude: venue.location.lng
            },
            address: venue.location.address ? venue.location.address : 'not available'
        }
        console.log(meetingPlace, 'meeting place')
        console.log(this.props.location.state, 'user data')
        this.setState({ meetingPlace, setTime: true })
    }

    sendRequest() {
        const { meetingPlace, date, time } = this.state
        const user = localStorage.getItem('userUid')
        const userId = this.props.location.state.userUid
        const request = {
            user: this.props.location.state,
            place: meetingPlace,
            date: date,
            time: time,
            userUid: user,
            request: 'pending'
        }
        console.log(request)
        swal({
            title: 'Are you sure?',
            text: `You want to send request to ${this.props.location.state.fullname}`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                swal({
                    onOpen: () => {
                        swal.showLoading()
                    }
                })
                firebase.database().ref('/meeting/' + userId + '/').push(request)
                    .then(() => {
                        swal({
                            position: 'center',
                            type: 'success',
                            title: 'Request Sent',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        History.push('/dashboard')
                    })
            }
        })
    }

    render() {
        const { recommended, searchQuery, search, setTime, date, time } = this.state
        return (
            <Container name={'Meeting App'} >
                {
                    !setTime &&
                    <div>
                        <h1>Search Meeting Place</h1>
                        {
                            !searchQuery &&
                            <div>
                                <h4>Recommended Places</h4>
                                <div className='recommend-places'>

                                    {
                                        recommended.map((items, index) => {
                                            return (
                                                index <= 2 &&
                                                <div key={index} onClick={() => this.setPlace(items)}>
                                                    {items.venue.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <h3>OR</h3>
                            </div>
                        }
                        <div className={'search'}>
                            <div>
                                <TextField
                                    id="filled-with-placeholder"
                                    label="Search Here"
                                    placeholder="Search place here..."
                                    margin="normal"
                                    style={{ width: 300 }}
                                    variant="filled"
                                    defaultValue={searchQuery}
                                    onChange={(e) => this.search(e.target.value)}
                                />
                            </div>
                            <hr />
                        </div>
                        {
                            searchQuery &&
                            <div className={'search-place'}>
                                {
                                    search.map((items, index) => {
                                        return (
                                            <div key={index} onClick={() => this.setPlace(items)}>
                                                {items.venue.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                }
                {
                    setTime &&
                    <div>
                        <h1>Set Date and Time</h1>
                        <h4>Date</h4>
                        <TextField
                            id="date"
                            label="Select Date"
                            type="date"
                            style={{ width: 200 }}
                            defaultValue={date}
                            onChange={(e) => this.setState({ date: e.target.value })}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <h4>Time</h4>
                        <TextField
                            id="time"
                            label="Select Time"
                            type="time"
                            style={{ width: 200 }}
                            defaultValue={time}
                            onChange={(e) => console.log(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                        <h3>
                            <Button color='primary' onClick={() => this.sendRequest()} variant={'contained'}>Send</Button>
                        </h3>
                    </div>
                }
            </Container>
        );
    }
}

export default Meeting;