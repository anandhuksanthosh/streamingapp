import { useState } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/common/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
