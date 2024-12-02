import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = () => {
    const loggedIn = useSelector(state=>state.user.userInfo.isLoggedIn)
  return loggedIn?<Outlet/>:<Navigate to={"/"}/>
}

export default PrivateRoute