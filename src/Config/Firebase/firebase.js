import * as firebase from 'firebase'


var config = {
  apiKey: "AIzaSyDl5a5Qb2QCiEwNG9hn5eC8W3UKMjWmMRw",
  authDomain: "tictactoe-2d999.firebaseapp.com",
  databaseURL: "https://tictactoe-2d999.firebaseio.com",
  projectId: "tictactoe-2d999",
  storageBucket: "tictactoe-2d999.appspot.com",
  messagingSenderId: "634255985043"
};
firebase.initializeApp(config);


export default firebase;
