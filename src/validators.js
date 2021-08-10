import axios from 'axios'
import { accessGlobalValidUsername } from './validUsername'

export function validEmail(email) {
    const re = /\S+@\S+\.\S+/
    if (re.test(email) == false) {
        return "Invalid email."
    }
    else return "Ok"
}

export function validPassword(password) {
    if (password.length < 8) {
        return "Password must be at least 8 characters."
    }
    else return "Ok"
}

export function validName(name) {
    if (name.length == 0) {
        return "Enter a username."
    }
    else return "Ok"
}

export function availName(username) {
    const data = {
        "username": username
    }

    //console.log(data)
    //const url = "https://iot-backend-dev-dev-rohit-karthik.cloud.okteto.net/create-user"

    const url = "http://10.0.0.158:8000/get-users"

    requestPost(function (response) {
        //console.log(response)
        return response
    })

    function requestPost(callbackFunc) {
        axios({
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            url: url,
            body: JSON.stringify(data)
        }
        ).then(
            function (resdata) {
                const checkData = {
                    "Result": "Success"
                }
                console.log(resdata.data)
                if (resdata == JSON.stringify(checkData)) {
                    callbackFunc("Username already exists.")
                    accessGlobalValidUsername().setFalse()
                }
                else {
                    callbackFunc("Ok")
                    accessGlobalValidUsername().setTrue()
                }
            }
        )
    }

}