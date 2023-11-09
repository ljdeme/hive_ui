
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import InProgress from "./pages/InProgress";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import MyFleets from "./pages/MyFleets";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";
import Profile from "./pages/Profile";
// import Testing from "./pages/Testing";

function App() {

  return (
    <div>
      <script>activePage.js</script>
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/inprogress" element={<InProgress />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* LOGGED IN USER LINKS */}
          <Route path="/myFleets" element={<MyFleets />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/profile" element={<Profile />} /> 
          
          {/* <Route path="/testing" element={<Testing />} /> */}
      </Routes>
    </div>
  );
}

export default App;