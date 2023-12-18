import React from 'react'
import "../styles/postsinput.scss"

const PostsInput = () => {
  return (
    <div className='posts-input'>
        <form >     
            <input type="text" />
            <input type="file" />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default PostsInput