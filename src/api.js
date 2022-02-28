import axios from 'axios';
import { firebaseConn } from './config.js';

export async function signUpUser(email, password, username) {
    // register new user
    try {
        await firebaseConn.auth().createUserWithEmailAndPassword(email, password)

        const data = {
            "new_username": username
        }
        //const url = "https://iot-backend-dev-dev-rohit-karthik.cloud.okteto.net/create-user"

        const url = "http://gitpod-machine.eastus.cloudapp.azure.com:8000/create-user"

        const response = await axios.post(url, data)

        const checkData = {
            "Result": "Success"
        }

        console.log(response.data)
        if (JSON.stringify(response.data) != JSON.stringify(checkData)) {
            return "Username already exists."
        }
        else {
            return "Ok"
        }
    }
    catch (err) {
        if (err.message == "The password is invalid or the user does not have a password.") {
            return "Incorrect password."
        }
        else {
            return err.message
        }
    }
}

export async function loginUser(email, password) {
    // login users
    try {
        await firebaseConn.auth().signInWithEmailAndPassword(email, password)
        return "Ok"
    }
    catch (err) {
        if (err.message == "The password is invalid or the user does not have a password.") {
            return "Incorrect password."
        }
        else {
            return err.message
        }
    }
}

export async function logoutUser() {
    await firebaseConn.auth().signOut()
    return "Ok"
}