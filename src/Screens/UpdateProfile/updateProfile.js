import React, { Component } from 'react';
import { connect } from 'react-redux'
import Profile from '../Profile/profile';
import Container from '../../Container/container';
import History from '../../History/History'

class UpdateProfile extends Component {


    profileUpdate() {
        History.push('/dashboard')
    }

    render() {
        return (
            <Container name={'Profile'}>
                <Profile profileUpdated = {this.profileUpdate}/>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return ({
        // user: state.authReducer.USER
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // CheckUser: () => {
        //     dispatch(OnAuth())
        // },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);


