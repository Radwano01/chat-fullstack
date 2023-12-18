import React, { useEffect, useState } from 'react'
import "../styles/users.scss"
import { gql, useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import {BsFillChatDotsFill} from "react-icons/bs"
import useraccount from "../assets/useraccount.png"

const GET_USERS = gql`
    query users{
        Users{
            name
            username
        }
    }

`

const Users = () => {

    const [users, setUsers] = useState(null)
    const {data, loading, error} = useQuery(GET_USERS)
    const fetchedData = data?.Users
    const navigate = useNavigate() 
    const usernameStorage = window.localStorage.getItem("username")
    
    useEffect(()=>{
        if(fetchedData){
            const filteredData = fetchedData?.filter((item)=> item.username !== usernameStorage) 
            setUsers(filteredData)
        }
    },[fetchedData, data])

    const receiverStorage = window.localStorage.getItem("receiver")
    const handleChat = (username)=>{
        if(receiverStorage){
            window.localStorage.setItem("receiver", username)
            navigate("/message")
            
        }else if(!usernameStorage){
            alert("You have to login before chating")
            navigate("/auth/login")
        }else{
            window.localStorage.setItem("receiver", username)
            navigate("/message")
            window.location.reload()
        }

    }

  return (
    <>
        {loading && <Loading/>}
        <br />
        {users !== null ?
            <>
                <div className="users">
                    <div className="search">
                        <input type="text" placeholder='search'/>
                    </div>
                    <div className="user">
                        {users?.map((user)=>{
                            return(
                                <div className="card" onClick={()=> handleChat(user.username)}>
                                    <div className="left">
                                        <img src={useraccount} alt="" />
                                    </div>
                                    <div className="center">
                                        <h2>{user.name}</h2>
                                        <h2>{user.username}</h2>
                                    </div>
                                    <div className="right">
                                        <button onClick={()=> handleChat(user.username)}><BsFillChatDotsFill size={25}/></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
            :
            <>
                {error && <h2>No Users exist</h2>}
            </>
        }
        <br />
    </>
  )
}

export default Users