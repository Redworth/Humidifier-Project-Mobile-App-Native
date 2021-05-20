import * as firebase from 'firebase';

// Firebase config
const firebaseConf = {
    apiKey: "AIzaSyBhxIGpofg4IOEqZ7Lf52_cVHXYVjvNzIg",
    authDomain: "humidifier-project---redworth.firebaseapp.com"
};

export const firebaseConn = firebase.initializeApp(firebaseConf);