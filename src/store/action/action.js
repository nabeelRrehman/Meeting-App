
import actionTypes from '../constant/constant'
import firebase from 'firebase'
import History from '../../History/History';
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
// import swal from 'sweetalert2'


export function OnAuth() {
    return dispatch => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log(user,'user here')
                firebase.database().ref('/users/'+user.uid+'/profile').once('value',(snapShot)=>{
                    // console.log(snapShot.val(),'snaps')
                    dispatch({ type: actionTypes.USER, payload: snapShot.val() })
                })
                // History.push('/dashboard') 
                // ...
            } else {
                // User is signed out.
                // ...
                // History.push('/')

            }
        });
    }
}


export function RequestMeeting(user) {
    return dispatch => {
        const arr = []
        // console.log(user ,'usermil rha ha')
        firebase.database().ref('/meeting/').on('child_added',(snapShot)=>{
            console.log(snapShot.val(),'meetings hai yaahan par')
            for(var key in snapShot.val()){
                arr.push(snapShot.val()[key])
                dispatch({ type: actionTypes.REQUEST, payload: arr })
            }
          
            
        })
    }
}

