import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../admin/AdminDashboard'
import CreateMovies from '../admin/CreateMovies'
import ListMovies from '../admin/ListMovies'
import EditMovie from '../admin/EditMovie'
import ListMoviesByViews from '../admin/ListMoviesByViews'
import ListUsers from '../admin/ListUsers'
import UserWatchHistory from '../admin/UserWatchHistory'
import ResetPassword from '../admin/ResetPassword'

const AdminRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminDashboard/>}>
            <Route path='create-movies' element={<CreateMovies/>}/>
            <Route path='listmovies' element={<ListMovies/>}/>
            <Route path='edit-movie/:id' element={<EditMovie/>}/>
            <Route path='by-view-count' element={<ListMoviesByViews/>}/>
            <Route path='users' element={<ListUsers/>}/>
            <Route path='watchhistory/:id' element={<UserWatchHistory/>}/>
            <Route path='reset-password' element={<ResetPassword/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoutes