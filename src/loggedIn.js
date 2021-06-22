import { createState, useState } from "@hookstate/core"

const globalIsLoggedIn = createState(false)

export function useGlobalIsLoggedIn(){
    const state = useState(globalIsLoggedIn)

    return ({
        get isLoggedInVal(){
            return state.value
        },
        setTrue(){
            state.set(true)
        },
        setFalse(){
            state.set(false)
        }
    })
}

export function accessGlobalIsLoggedIn(){
    return ({
        get isLoggedInVal(){
            return state.value
        },
        setTrue(){
            globalIsLoggedIn.set(true)
        },
        setFalse(){
            globalIsLoggedIn.set(false)
        }
    })
}