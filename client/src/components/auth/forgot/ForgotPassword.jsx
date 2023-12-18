import React, { useState } from 'react'
import "../../../styles/forgotpassword.scss"
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import Loading from '../../Loading'

const FORGOT_PASSWORD_MUTATION = gql`

  mutation resetPassword($input: resetPasswordInput){
    resetPassword(input: $input){
      password
      email
      username
    }
  }

`

const ForgotPassword = () => {
  
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleForgotPassword = async(e)=>{
    e.preventDefault()
    try{
      const result = await handleSubmit({
        variables: {input: {password: password, email: email, username: username}}
      })
      if(result){
        navigate("/auth/login")
      }
    }catch(err){
      console.log("forgotpassword:", err)
    }
  }

  const [handleSubmit, {error, loading}] = useMutation(FORGOT_PASSWORD_MUTATION)

  return (
    <>
      <br />
      <div className="forgotpassword">
        {loading && <Loading/>}
        <form onSubmit={handleForgotPassword}>
          <div className="title">
            <h1>Forgot My Password</h1>
          </div>
          <input type="name" placeholder='Username' onChange={(e)=> setUsername(e.target.value)}/>
          <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder='new Password' onChange={(e)=> setPassword(e.target.value)}/>
          <button type="submit">ForgotPassword</button>
          {error && <h3>Your Email or Username is Wrong</h3>}
          <Link to={"/auth/login"}><h3>&larr; Back to Login</h3></Link>
        </form>
      </div>
      <br />
    </>
  )
}

export default ForgotPassword