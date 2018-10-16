import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import { Checkbox, Button } from '@material-ui/core';
import './profile.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"



const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown && <Marker draggable={true} position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
            onDragEnd={position => {
                props.setLatlng(position.latLng.lat(), position.latLng.lng())
            }} />}
    </GoogleMap>
))

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    menu: {
        width: 400,
    },
});



class Profile extends Component {
    constructor() {
        super()

        this.state = {
            page: 3,
            data: ['Juice', 'Coffee', 'Cocktail'],
            timeDuration: ['20 min', '60 min', '120 min'],
            beverages: [],
            checkTimeDuration: [],
            coords: null

        }
        this.setLatlng = this.setLatlng.bind(this)
    }


    handleCheck(x) {
        const { beverages } = this.state
        if (beverages.indexOf(x) !== -1) {
            beverages.splice(beverages.indexOf(x), 1)
            this.setState({ beverages }, () => {
                console.log(this.state.beverages)
            })
        } else {
            beverages.push(x);
            this.setState({ beverages }, () => {
                console.log(this.state.beverages)
            })
        }
    }

    componentDidMount() {
        this.setposition()

    }

    handleCheckTime(x) {
        const { checkTimeDuration } = this.state
        if (checkTimeDuration.indexOf(x) !== -1) {
            checkTimeDuration.splice(checkTimeDuration.indexOf(x), 1)
            this.setState({ checkTimeDuration }, () => {
                console.log(this.state.checkTimeDuration)
            })
        } else {
            checkTimeDuration.push(x)
            this.setState({ checkTimeDuration }, () => {
                console.log(this.state.checkTimeDuration)
            })
        }
    }

    next() {
        const user = localStorage.getItem('userUid')
        const { beverages, checkTimeDuration } = this.state
        if (!beverages.length || !checkTimeDuration.length) {
            console.log('please select')
        } else {
            const obj = {
                beverages: beverages,
                timeDuration: checkTimeDuration
            }
            firebase.database().ref('/users/' + user + '/profile/').update(obj)
                .then(() => {
                    console.log('profile added')
                    this.setState({ page: 3 })
                })
        }
    }

    nextPage2() {
        const user = localStorage.getItem('userUid')
        const { name, number } = this.state
        const obj = {
            name: name,
            number: number
        }
        name && number ?
            firebase.database().ref('/users/' + user + '/profile/').update(obj)
                .then(() => {
                    console.log('submit')
                    this.setState({ page: 2 })
                }) :
            console.log('please enter')

    }

    nextPage3() {
        const user = localStorage.getItem('userUid')
        const { coords } = this.state
        const obj = {
            location: {
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        }
        firebase.database().ref('/users/' + user + '/profile/').update(obj)
            .then(() => {
                console.log('submitted')
            })
    }

    setposition() {
        const { coords } = this.state
        navigator.geolocation.getCurrentPosition(position => {

            console.log(position)
            this.setState({ coords: position.coords }, () => console.log('state ha ye', this.state.coords))
        })
    }

    setLatlng(latitude, longitude) {
        this.setState({ coords: { latitude, longitude } })
    }


    render() {
        const { classes } = this.props

        const { data, timeDuration, page, name, number, coords } = this.state
        return (
            <div>
                {
                    page === 1 &&
                    <div>
                        <h3>Nick Name</h3>
                        <TextField
                            id="filled-with-placeholder"
                            label="Nick Name"
                            placeholder="Your Nick Name"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            value={name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                        <h3>Phone Number</h3>
                        <TextField
                            id="filled-with-placeholder"
                            label="Phone No"
                            type='number'
                            placeholder="Your Phone Number"
                            className={classes.textField}
                            margin="normal"
                            variant="filled"
                            value={number}
                            onChange={(e) => this.setState({ number: e.target.value })}
                        />
                        <div>
                            <Button color='primary' onClick={() => this.nextPage2()} variant={'contained'} className={classes.button}>Next</Button>
                        </div>
                    </div>
                }
                {
                    page === 2 &&
                    <div>
                        <h1>Choose Beverages</h1>
                        {
                            data.map(x => {
                                return (
                                    <div className='checkbox'>
                                        <Checkbox label={x} key={x.toString()} onChange={() => this.handleCheck(x)} />
                                        <p>{x}</p>
                                    </div>
                                )
                            })
                        }
                        <h1>Duration Of Meeting</h1>
                        {
                            timeDuration.map(items => {
                                return (
                                    <div className='checkbox'>
                                        <Checkbox label={items} key={items.toString()} onChange={() => this.handleCheckTime(items)} />
                                        <p>{items}</p>
                                    </div>
                                )
                            })
                        }
                        <Button color='primary' onClick={() => this.next()} variant={'contained'} className={classes.button}>Next</Button>
                    </div>
                }
                {
                    page === 3 &&
                    <div>
                        <h2>Set Your Location</h2>
                        {
                            coords &&
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                coords={coords}
                                setLatlng={this.setLatlng}
                            />
                        }
                        <Button color='primary' onClick={() => this.nextPage3()} variant={'contained'} className={classes.button}>Done</Button>
                    </div>
                }
            </div>
        );
    }
}


Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);  
