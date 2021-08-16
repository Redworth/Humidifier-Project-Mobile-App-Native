import { firebaseConn } from './config.js';

export async function signUpUser(email, password) {
    // register new user
    try {
        await firebaseConn.auth().createUserWithEmailAndPassword(email, password)
        return "Ok"
    }
    catch (err){
        if (err.message == "The password is invalid or the user does not have a password."){
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
    catch (err){
        if (err.message == "The password is invalid or the user does not have a password."){
            return "Incorrect password."
        }
        else {
            return err.message
        }
    }
}