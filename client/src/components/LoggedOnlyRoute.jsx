import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoggedOnlyRoute = ({children}) => {

    const navigate = useNavigate()

    const username = window.localStorage.getItem("username")
    
    const removeUsername = ()=>{
        try{
            window.localStorage.removeItem("username")
            window.localStorage.removeItem("receiver")
            window.location.reload()
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    if(!username){
        return children
    }else{
        return <button className="signout-button" onClick={removeUsername}>SignOut</button>
    }
}

export default LoggedOnlyRoute

const LogoutOnlyRoute = ({children})=>{

    const username = window.localStorage.getItem("username")

    if(!username){
        return null
    }else{
        return children
    }
}

const ChatOnlyRoute = ({children})=>{

    const receiver = window.localStorage.getItem("receiver")

    if(receiver){
        return children
    }else{
        return null
    }
}

export {LogoutOnlyRoute, ChatOnlyRoute}