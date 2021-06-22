import { firebaseConn } from './config.js';
import { accessGlobalIsLoggedIn } from './loggedIn.js';
import React from 'react'

export async function signUpUser(name, email, password) {
    // register new user
    await firebaseConn.auth().createUserWithEmailAndPassword(email, password)
        .then(
            accessGlobalIsLoggedIn().setTrue()
        )
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
        .then(
            accessGlobalIsLoggedIn().setTrue()
        )
        .catch(
            function (error) {
                console.log(error.message)
            }
        )
}