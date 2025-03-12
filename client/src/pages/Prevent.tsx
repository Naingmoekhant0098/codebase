import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
const isLogin = localStorage.getItem('access_token');
function Prevent() {
    console.log(isLogin)
  return isLogin ? <Outlet/> : <Navigate to={'/login'}/>
}

export default Prevent