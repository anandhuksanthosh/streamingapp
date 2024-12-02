import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import UserLandingPage from '../user/UserLandingPage'
import AllMovies from '../user/AllMovies'
import WatchMovie from '../user/WatchMovie'
import WatchHistory from '../user/WatchHistory'
import ResetPassword from '../admin/ResetPassword'

const UserRoutes = () => {
    const navigate = useNavigate()
    useEffect(()=>navigate("allmovies"),[])
  return (
    <Routes>
        <Route path='/' element={<UserLandingPage/>}>
            <Route path="allmovies" element={<AllMovies/>}/>
            <Route path="watch-movie/:id" element={<WatchMovie/>}/>
            <Route path='watch-history' element={<WatchHistory/>}/>
            <Route path='reset-password' element={<ResetPassword/>}/>
        </Route>
    </Routes>
  )
}

export default UserRoutes