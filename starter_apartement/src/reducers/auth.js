import { json } from "react-router-dom"
import {AUTH, LOGOUT} from "./constants/actionType"

export const auth =(state = {authData:null}, action) =>{
    switch(action.type){
        case AUTH:
            localStorage.setItem("profile", json.stringify({...action?.data}))
            return {...state, authData:action?.data}
        case LOGOUT:
            return
        default:
            return state
    }
}