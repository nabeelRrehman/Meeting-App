import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import History from '../../History/History';
import Container from '../../Container/container';
import ProfilePic from '../../Components/ProfilePic/profilePic';
import { connect } from 'react-redux'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';


class Request extends Component {
    constructor() {
        super()

        this.state = {
            requests: []
        }
    }
    componentDidMount() {
        // console.log(this.props.location.state)
        const { request } = this.props.location.state
        this.setState({ requests: request }, () => {
            // console.log(this.state.requests,'user request')
        })

    }


    render() {
        const { requests } = this.state
        return (
            <Container name={'Meeting App'} >
                {
                    <ProfilePic requests={requests} />
                }

            </Container>
        );
    }
}

function mapStateToProps(state) {
    return ({
        UserRequest: state.authReducer.REQUEST
    })
}

function mapDispatchToProps(dispatch) {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);


// export default Request;