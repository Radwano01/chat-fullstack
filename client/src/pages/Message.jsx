import React from 'react'
//import MessageSlider from '../components/MessageSlider'
import "../styles/message.scss"
import Messages from '../components/Messages'
import { ChatOnlyRoute } from '../components/LoggedOnlyRoute'

const Message = () => {
  return (
    <ChatOnlyRoute>   
      <div className='message'>
        {/* <div className="messageSlider">
          <MessageSlider/>
        </div> */}
        <div className="messages">
          <Messages/>
        </div>
      </div>
    </ChatOnlyRoute>
  )
}

export default Message