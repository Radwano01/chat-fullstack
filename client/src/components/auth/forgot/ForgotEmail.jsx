import React, { useState } from 'react'
import "../../../styles/forgotemail.scss"
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import Loading from '../../Loading'

const FORGOT_EMAIL_MUTATION = gql`

mutation resetEmail($input: resetEmailInput){
  resetEmail(input: $input){
    email,
    username,
    password
  }
} 

`

const ForgotEmail = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleForgotEmail = async(e)=>{
    e.preventDefault()
    try{
      const result = await handleSubmit({
        variables: {input: {email: email, username: username, password: password}}
      })
      if(result){
        navigate("/auth/login")
      }
    }catch(err){
      console.log("forgotemail:", err)
    }
  }

  const [handleSubmit, {error, loading}] = useMutation(FORGOT_EMAIL_MUTATION)
  return (
    <>
      <br />
      <div className="forgotemail">
          {loading && <Loading/>}
        <form onSubmit={handleForgotEmail}>
          <div className="title">
            <h1>Forgot My Email</h1>
          </div>
          <input type="name" placeholder='Username' onChange={(e)=> setUsername(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
          <input type="email" placeholder='new Email' onChange={(e)=> setEmail(e.target.value)}/>
          <button type="submit">Forgot Email</button>
          {error && <h3>Your Username or Password is Wrong</h3>}
          <Link to={"/auth/login"}><h3>&larr; Back to Login</h3></Link>
        </form>
      </div>
      <br />
    </>
  )
}

export default ForgotEmail