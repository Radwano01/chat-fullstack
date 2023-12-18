import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ForgotEmail from '../components/auth/forgot/ForgotEmail'
import ForgotPassword from '../components/auth/forgot/ForgotPassword'
import ForgotUsername from '../components/auth/forgot/ForgotUsername'

const Auth = () => {
  return (
    <div>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot/email' element={<ForgotEmail/>}/>
            <Route path='/forgot/password' element={<ForgotPassword/>}/>
            <Route path='/forgot/username' element={<ForgotUsername/>}/>
        </Routes>
    </div>
  )
}

export default Auth