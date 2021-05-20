export function validEmail(email){
    const re = /\S+@\S+\.\S+/
    if (re.test(email) == false){
        return "Invalid email."
    }
    else return "Ok"
}

export function validPassword(password){
    if (password.length < 8){
        return "Password must be at least 8 characters."
    }
    else return "Ok"
}

export function validName(name){
    if (name.length == 0){
        return "Enter a name."
    }
    else return "Ok"
}