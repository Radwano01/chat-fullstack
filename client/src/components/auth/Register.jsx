import React, { useState } from 'react'
import "../../styles/register.scss"
import { gql, useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../Loading'

const CREATE_USER_MUTATION = gql`
  mutation create($input: registerInput){
    create(input: $input){
      name,
      username,
      email,
      password
    }
  }

`

const Register = () => {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate()

  const [handleSubmit, {error, loading}] = useMutation(CREATE_USER_MUTATION)

  const handleRegisteration = async(e)=>{
    e.preventDefault()
    try{
      const result = await handleSubmit({
        variables: {input: {name: name, username: username, email: email, password: password}}
      })

      if(result){
        navigate("/auth/login")
      }
    }catch(err){
      console.log('Registration error:', err)
    }
  }

  return (
    <>
      <br />  
      <div className="register">
        {loading && <Loading/>}
        <form onSubmit={handleRegisteration}>
          <div className="title">
            <h1>Register</h1>
          </div>
          <input type="name" placeholder='Name' onChange={(e)=> setName(e.target.value)}/>
          <input type="name" placeholder='Username' onChange={(e)=> setUsername(e.target.value)}/>
          <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=> setPassword(e.target.value)}/>
          <button type="submit">Register</button>
          {error && <h2>Something went wrong</h2>}
          <Link to={"/auth/login"}><h3>&larr; You have an account?</h3></Link>
        </form>
      </div>
      <br />
    </>
  )
}

export default Register