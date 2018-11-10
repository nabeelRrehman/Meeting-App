
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


