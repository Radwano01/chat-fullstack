import React, { useState } from 'react'
import "../../../styles/forgotusername.scss"
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import Loading from '../../Loading'

  const FORGOT_USERNAME_MUTATION = gql`

    mutation resetUsername($input: resetUsernameInput){
      resetUsername(input: $input){
        username,
        email,
        password
      }
    } 
  
  `

const ForgotUsername = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleForgotUsername = async(e)=>{
    e.preventDefault()
    try{
      const result = await handleSubmit({
        variables: {input: {username: username, email: email, password: password}}
      })
      if(result){
        navigate("/auth/login")
      }
    }catch(err){
      console.log("forgotusername:", err)
    }
  }

  const [handleSubmit, {error, loading}] = useMutation(FORGOT_USERNAME_MUTATION)

  return (
    <>
      <br />
      <div className="forgotusername">
          {loading && <Loading/>}
        <form onSubmit={handleForgotUsername}>
          <div className="title">
            <h1>Forgot My Username</h1>
          </div>
          <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
          <input type="name" placeholder='new Username' onChange={(e)=> setUsername(e.target.value)}/>
          <button type="submit">Forgot Username</button>
          {error && <h3>Your Username or Email is Wrong</h3>}
          <Link to={"/auth/login"}><h3>&larr; Back to Login</h3></Link>
        </form>
        <br />
      </div>
    </>
  )
}

export default ForgotUsername