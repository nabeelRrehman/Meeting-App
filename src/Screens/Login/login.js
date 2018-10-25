import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'
import History from '../../History/History';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Provider = new firebase.auth.FacebookAuthProvider()

class Login extends Component {
  constructor() {
    super()

    this.login = this.login.bind(this)
  }

  componentDidMount() {
    // firebase.auth().signOut()
    // setTimeout(()=>{
    //   const currentUsers = firebase.auth().app.services_.auth
    //     for(var key in currentUsers){
    //       const user = currentUsers[key].currentUser.uid
    //       user && this.props.login()
    //   }
    // },1000)
  }


  login() {

    firebase.auth().signInWithPopup(Provider).then((success) => {
      console.log('sucess signin')
      const user = success.user.uid
      const obj = {
        email: success.user.email,
        userUid: user,
      }
      localStorage.setItem("userUid", user)
      firebase.database().ref('users/' + user + '/details/').set(obj)
      History.push('/dashboard')
    })

  }


  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebase.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: (success) => { 
            this.login()
            // console.log('sucess',success)
        }
        
    }

}

  render() {
    return (
      // <div>
      //   <button onClick = {this.login}>
      //     Login With Facebook
      //   </button>

      // </div>
      <div className="App">
        <div className="main">
          <h1>Meeting App
</h1>

        </div>
        <br />
        <br />
        <br />

        <div className="form">
          Login here
                     <br />
          <br />

          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    );
  }
}

export default Login;
