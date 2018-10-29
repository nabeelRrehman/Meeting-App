/* eslint-disable no-undef */
// global google
import React, { Component } from 'react';
// import firebase from './Config/firebase'
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"
import Container from '../../Container/container';
import './direction.css'
import { Button } from '@material-ui/core';
import History from '../../History/History'
// import { useDecimal } from 'geolib';

class Directions extends Component {
    constructor() {
        super()

        this.state = {
            coords: {}
        };

        this.getDirections = this.getDirections.bind(this);
    }

    componentDidMount() {
        // global google

        const { userData, meetingLocation } = this.props.location.state
        console.log(userData, 'state here')
        console.log(meetingLocation, 'state here')
        // this.getDirections(userData.location, meetingLocation.location)

        this.setState({ userLocation: userData.location, meetingPlace: meetingLocation.location })
    }

    getDirections(user, place) {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(user.latitude, user.longitude),
            destination: new google.maps.LatLng(place.latitude, place.longitude),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                alert("Sorry! Can't calculate directions!")
            }
        });
    }

    next() {
        const { userData, meetingLocation } = this.props.location.state
        History.push({
            pathname: '/meeting',
            state: {
                userData: userData,
                meetingLocation: meetingLocation
            }
        })
    }

    back() {
        const { userData } = this.props.location.state
        History.push({
            pathname: '/meeting',
            state: {
                userData: userData,
            }
        })
    }

    render() {
        const { coords, directions, userLocation, meetingPlace } = this.state;

        return (
            <Container name={'Meeting App'}>
                {/* <button onClick={this.login}>Login with facebook shareef!</button> */}
                <div className='direction'>
                    Directions
                </div>
                <MyMapComponent
                    isMarkerShown
                    coords={coords}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `60%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    directions={directions}
                    userLocation={userLocation}
                    meetingPlace={meetingPlace}
                />

                {/* <button onClick={this.getDirections}><h1>Get Directions</h1></button> */}
                <div className='direction-btn'>
                    <Button color='primary' variant={'contained'} onClick={() => this.back()} >Back</Button>
                    <Button color='primary' variant={'contained'} onClick={() => this.getDirections(userLocation, meetingPlace)} >Get Direction</Button>
                    <Button color='primary' variant={'contained'} onClick={() => this.next()} >Next</Button>
                </div>

            </Container>
        )
    }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.userLocation.latitude, lng: props.userLocation.longitude }}
    >

        <Marker position={{ lat: props.userLocation.latitude, lng: props.userLocation.longitude }} />
        <Marker position={{ lat: props.meetingPlace.latitude, lng: props.meetingPlace.longitude }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))

export default Directions;