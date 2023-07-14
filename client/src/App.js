import React  from 'react';
import { Textfit } from 'react-textfit';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import InProgress from "./pages/InProgress";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
          <Route
            path="/"
            element={<Landing />} />
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
            path="/about-us"
            element={<AboutUs />} />
          <Route/>
          <Route
            path="/contact-us"
            element={<ContactUs />} />
          <Route/>
      </Routes>
    </>
  );
}

export default App;
