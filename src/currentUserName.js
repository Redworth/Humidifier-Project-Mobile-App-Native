import { createState, useState } from "@hookstate/core"

const globalUsername = createState("")

export function useGlobalUsername(){
    const state = useState(globalUsername)

    return ({
        get username(){
            return state.value
        },
        setUsername(param){
            state.set(param)
        },
        setEmpty(){
            state.set("")
        }
    })
}

export function accessGlobalUsername(){
    return ({
        get username(){
            return state.value
        },
        setUsername(param){
            globalUsername.set(param)
        },
        setEmpty(){
            globalUsername.set("")
        }
    })
}