
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
import Testing from "./pages/testing";

function App() {
  return (
    <div>
      <script>activePage.js</script>
      <Routes>
          <Route
            path="/"
            element={<Landing />} />
          <Route/>
          <Route
            path="/inprogress"
            element={<InProgress />} />
          <Route/>
          <Route
            path="/home"
            element={<Home />} />
          <Route/>
          <Route
            path="/login"
            element={<Login />} />
          <Route/>
          <Route
            path="/register"
            element={<Register />} />
          <Route/>
          <Route
            path="/about-us"
            element={<AboutUs />} />
          <Route/>
          <Route
            path="/documentation"
            element={<Documentation />} />
          <Route/>
          {/* LOGGED IN USER LINKS */}
          <Route
            path="/myFleets"
            element={<MyFleets />} />
          <Route/>
          <Route
            path="/dashboard"
            element={<Dashboard />} />
          <Route/>
          <Route
            path="/documentation"
            element={<Documentation />} />
          <Route/>
          <Route
            path="/profile"
            element={<Profile />} />
          <Route/>
          <Route
            path="/testing"
            element={<Testing />} />
          <Route/>
      </Routes>
    </div>
  );
}

export default App;