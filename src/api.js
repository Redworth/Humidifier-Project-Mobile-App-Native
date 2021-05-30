import { firebaseConn } from './config.js';

export async function signUpUser(name, email, password) {
    // register new user
    await firebaseConn.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            function (error) {
                console.log(error.message)
            }
        )
        
    firebaseConn.auth().currentUser.updateProfile({
            displayName: name,
    })
}

export async function loginUser(email, password) {

    await firebaseConn.auth().signInWithEmailAndPassword(email, password)
        .catch(
            function (error) {
                console.log(error.message)
            }
        )
}