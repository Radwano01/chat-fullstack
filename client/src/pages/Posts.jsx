import React from 'react'
import { ChatOnlyRoute } from '../components/LoggedOnlyRoute'
import PostsInput from '../components/PostsInput'

const Posts = () => {
  return (
    <ChatOnlyRoute>
        <div className='posts'>
            <div className="input">
                <PostsInput/>
            </div>
        </div>
    </ChatOnlyRoute>
    
  )
}

export default Posts