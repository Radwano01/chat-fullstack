import React from 'react'
import "../styles/messageslider.scss"

const MessageSlider = () => {
  return (
    <div className='messageslider'>
        <h1>Messages</h1><br /><br />
        <div className="user">
            <div className="card">
                <div className="left">
                    <h3>img</h3>
                </div>
                <div className="right">
                    <h3>name</h3>
                    <h3>username</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MessageSlider