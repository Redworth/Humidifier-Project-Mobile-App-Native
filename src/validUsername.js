import { createState, useState } from "@hookstate/core"

const globalValidUsername = createState(false)

export function useGlobalValidUsername(){
    const state = useState(globalValidUsername)

    return ({
        get isValid(){
            return state.value
        },
        setTrue(){
            globalValidUsername.set(true)
        },
        setFalse(){
            globalValidUsername.set(false)
        }
    })
}

export function accessGlobalValidUsername(){
    return ({
        get isValid(){
            return state.value
        },
        setTrue(){
            globalValidUsername.set("Ok")
        },
        setFalse(){
            globalValidUsername.set("Username already exists.")
        }
    })
}