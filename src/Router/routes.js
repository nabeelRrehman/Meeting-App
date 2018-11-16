import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import history from '../History/History'
import Login from '../Screens/Login/login';
import home from '../Screens/HomePage/home';
import Meeting from '../Screens/Meeting/meeting';
import Directions from '../Screens/Direction/direction';
import Request from '../Components/Request/request';
import { connect } from 'react-redux'
import { OnAuth } from '../store/action/action'
import UpdateProfile from '../Screens/UpdateProfile/updateProfile';
import { RequestMeeting } from '../store/action/action'


class Routers extends Component {

    componentWillMount() {
        const user = localStorage.getItem('userUid')
        this.props.CheckUser()
        this.props.getMeetingRequest(user)
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={home} />
                    <Route exact path='/meeting' component={Meeting} />
                    <Route exact path='/getDirection' component={Directions} />
                    <Route exact path='/requests' component={Request} />
                    <Route exact path='/profile' component={UpdateProfile} />
                </div>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.authReducer.USER
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        CheckUser: () => {
            dispatch(OnAuth())
        },
        getMeetingRequest: (user) => {
            dispatch(RequestMeeting(user))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers);


// export default Routers;
