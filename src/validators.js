import axios from 'axios'

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

export async function availName(username) {
    const data = {
        "username": username
    }
    //const url = "https://iot-backend-dev-dev-rohit-karthik.cloud.okteto.net/create-user"

    const url = "http://gitpod-machine.eastus.cloudapp.azure.com:8000/get-users"


    const response = await axios.post(url, data)

    const checkData = {
        "Result": "Success"
    }
    
    if (JSON.stringify(response.data) == JSON.stringify(checkData)) {
        return "Username already exists."
    }
    else {
        return "Ok"
    }
}