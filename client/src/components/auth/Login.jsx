import React, { useState } from 'react'
import  "../../styles/login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import Loading from '../Loading'

const LOGIN_USER_MUTAUTION = gql`

  mutation login($input: loginInput){
    login(input: $input){
      username
      password
    }
  }

`

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async(e)=>{
    e.preventDefault()
    try{
      const result = await handleSubmit({
        variables: {input: {username: username, password: password}}
      })
      if(result.data){
        window.localStorage.setItem("username", username)
        navigate("/")
        window.location.reload()
      }
    }catch(err){
      console.log("login error", err)
    }
  }

  const [handleSubmit, {error, loading}] = useMutation(LOGIN_USER_MUTAUTION)

  return (
    <>
      <br />
      <div className="login">
        {loading && <Loading/>}
        <form onSubmit={handleLogin}>
          <div className="title">
            <h1>Login</h1>
          </div>
          <input type="name" placeholder='Username' onChange={(e)=> setUsername(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
          <button type="submit">Login</button>
          {error && <h3>Your Username or Password are Wrong</h3>}
          <Link to={"/auth/register"}>
            <h3>You don't have an account?</h3>
          </Link>
          <Link to={"/auth/forgot/password"}>
            <h3>Forgot your password?</h3>
          </Link>
          <Link to={"/auth/forgot/username"}>
            <h3>Forgot your username?</h3>
          </Link>
          <Link to={"/auth/forgot/email"}>
            <h3>Forgot your email?</h3>
          </Link>
        </form>
      </div>
      <br />
    </>
  )
}

export default Login