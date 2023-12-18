import React, { useRef } from 'react'
import "../styles/navbar.scss"
import { Link, NavLink } from 'react-router-dom'
import LoggedOnlyRoute, { ChatOnlyRoute, LogoutOnlyRoute } from './LoggedOnlyRoute'
import {FaTimes , FaBars} from "react-icons/fa"

const Navbar = () => {

  const navRef = useRef()
  const showNavbar = ()=>{
    navRef.current.classList.toggle("responsive-nav")
  }

  return (
    <div className="navbar">
        <div className="left">
            <Link to="/">Chat</Link>
        </div>
        <div className="right">
            <ul ref={navRef}>
              <LogoutOnlyRoute>
                <NavLink to={"/profile"}>PROFILE</NavLink>
                <ChatOnlyRoute>
                  <NavLink to={"/message"}>MESSAGES</NavLink>
                  {/* <NavLink to={"/posts"}>POSTS</NavLink> */}
                </ChatOnlyRoute>
              </LogoutOnlyRoute>
              <LoggedOnlyRoute>
                <NavLink to={"/auth/login"}>LOGIN</NavLink>
                <NavLink to={"/auth/register"}>REGISTER</NavLink>
              </LoggedOnlyRoute>
              <button onClick={showNavbar} className='nav-btn nav-close-btn'>
                <FaTimes size={30} color='white'/>
              </button> 
            </ul>
            <button className='nav-btn bar' onClick={showNavbar}>
              <FaBars size={30} color='white'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar