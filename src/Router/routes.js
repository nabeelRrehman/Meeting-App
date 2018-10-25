import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';

import history from '../History/History'
import firebase from 'firebase'
import Login from '../Screens/Login/login';
import home from '../Screens/HomePage/home';
import Meeting from '../Screens/Meeting/meeting';


class Routers extends Component {

    componentWillMount() {

    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/dashboard" component={home} />
                    <Route exact path='/meeting' component = {Meeting}/>
                </div>
            </Router>
        )
    }
}

export default Routers;
