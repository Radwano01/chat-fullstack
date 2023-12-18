import React, { useEffect, useState } from 'react'
import "../styles/profile.scss"
import userImage from "../assets/useraccount.png"
import { gql, useLazyQuery } from '@apollo/client'
import Loading from '../components/Loading'
import ChangeImage from '../components/ChangeImage'


const get_Single_User = gql`

  query getUser($username: String){
    getSingleUser(username: $username){
      username
      name
      email
      image
    }
  }

`
const Profile = () => {  

  const [user, setUser] = useState(null)
  const username = window.localStorage.getItem("username")


  const [getUserData, { loading, error, data }] = useLazyQuery(get_Single_User, {
    variables: { username:username },
  });

  useEffect(() => {
    getUserData();
    if(data){
      setUser(data.getSingleUser)
    }
  }, [data]);

  const sliceEmail = (email)=>{
    const sliced =  email.slice(0, -13)
    const stars = "*".repeat(10)
    return sliced + stars
  }

  return (
    <div className="profile">
      {loading && <Loading/>}
      {user ? 
        <>
          <div className="left">
            <img src={userImage} alt={user.image}/>
          </div>
          <div className="right">
            <h2>name: {user.name}</h2>
            <h2>username: {user.username}</h2>
            <h2>email: {sliceEmail(user.email)}</h2>
            <h2>password: *****</h2>
            {/* <ChangeImage/> */}
            {error && <h2>User not found</h2>}
          </div>
        </>
        :
        <>
          <div className="">
            {loading && <Loading/>}
            <h2>You didn't logged in please Click here to &rarr;<a href="/auth/login" style={{color:"#217074"}}>LOGIN</a></h2>
          </div>
        </>
      }
    </div>
  )
}

export default Profile