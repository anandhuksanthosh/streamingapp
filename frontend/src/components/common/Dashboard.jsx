import React from 'react'
import { useSelector } from 'react-redux'
import AdminRoutes from './AdminRoutes'
import UserRoutes from './UserRoutes'

const Dashboard = () => {
    const loggedIn = useSelector(state=>state.user.userInfo.role)
    console.log(loggedIn)
  return loggedIn==="user"?<UserRoutes/>:<AdminRoutes/>
}

export default Dashboard