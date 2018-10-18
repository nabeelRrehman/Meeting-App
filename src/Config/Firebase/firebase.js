import * as firebase from 'firebase'


var config = {
  apiKey: "AIzaSyAGgl09NJj_LlLt5QYpbHDb0Iq6ttU8kHo",
  authDomain: "meetingapp-b027d.firebaseapp.com",
  databaseURL: "https://meetingapp-b027d.firebaseio.com",
  projectId: "meetingapp-b027d",
  storageBucket: "meetingapp-b027d.appspot.com",
  messagingSenderId: "517963031401"
};
firebase.initializeApp(config);



export default firebase;
