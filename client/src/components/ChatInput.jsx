import React, { useState } from 'react'
import "../styles/chatinput.scss"
import {AiOutlineSend} from "react-icons/ai"
import { gql, useMutation } from '@apollo/client'
import Loading from './Loading'

const SEND_MESSAGE = gql`

    mutation messages($input: messagesInput){
        messages(input: $input){
            sender_id
            receiver_id
            message_text
        }
    }

`

const ChatInput = () => {

    const [message, setMessage] = useState("")
    const sender = window.localStorage.getItem("username")
    const receiver = window.localStorage.getItem("receiver") 

    const handleMessage = async()=>{
        try{
            const result = await handleSubmit({
                variables: {input: {sender_id: sender, receiver_id: receiver, message_text: message}}
            })
            if(result){
                console.log("messages successfull", result)
            }
            window.location.reload()
        }catch(err){
            console.log("message error:", err)
        }
    }

    const [handleSubmit, {loading,data,error}] = useMutation(SEND_MESSAGE)
  return (
    <div className='chatinput'>
        {loading && <Loading/>}
        <form onSubmit={handleMessage}>
            <input type="text" placeholder='send message' onChange={(e)=> setMessage(e.target.value)}/>
            <button type='submit'><AiOutlineSend size={20}/></button>
        </form>
    </div>
  )
}

export default ChatInput