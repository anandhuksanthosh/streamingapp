import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import MoviePlayer from "./components/MoviePlayer";
import Settings from "./components/Settings";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import AddMovie from "./components/admin/AddMovie";
import ListMovies from "./components/admin/ListMovies";
import ChangePassword from "./components/admin/ChangePassword";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MoviePlayer />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminlanding" element={<Dashboard />}>
          <Route index element={<Users />} /> {/* Default child route */}
          <Route path="users" element={<Users />} />
          <Route path="addmovie" element={<AddMovie />} />
          <Route path="listmovies" element={<ListMovies />} />
          <Route path="changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
