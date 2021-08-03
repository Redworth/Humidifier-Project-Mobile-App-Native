import { firebaseConn } from './config.js';
import { accessGlobalIsLoggedIn } from './loggedIn.js';
import React from 'react'

export async function signUpUser(username, email, password) {
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
    
    //const url = "https://iot-backend-dev-dev-rohit-karthik.cloud.okteto.net/create-user"
    const url = "http://10.0.0.158:8000/get-users"

    const data = {
        "username": username
    }

    const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        }
    )
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