import firebase from 'firebase/app'
import "firebase/auth"



const register = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log('e')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('f')
      });
}

const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log('e')
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('f')
    });
    console.log('g')
}

export default { register, login }