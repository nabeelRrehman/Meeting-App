import React, { Component } from 'react';
import firebase from '../../Config/Firebase/firebase'

const Provider = new firebase.auth.FacebookAuthProvider()

class Login extends Component {
  constructor() {
    super()

    this.login = this.login.bind(this)
  }

  componentDidMount(){
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

    firebase.auth().signInWithPopup(Provider).then((success)=>{
      console.log('sucess signin')
      const user = success.user.uid
      const obj ={
        email : success.user.email,
        userUid : user,
      }
      localStorage.setItem("userUid",user)
      firebase.database().ref('users/'+user+'/details/').set(obj)
      this.props.login()
    })
    
  }

  render() {
    return (
      <div>
        <button onClick = {this.login}>
          Login With Facebook
        </button>
      </div>
    );
  }
}

export default Login;
