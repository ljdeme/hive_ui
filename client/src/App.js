import React  from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import InProgress from "./pages/InProgress";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route
            path="/"
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
            path="/contact-us"
            element={<ContactUs />} />
          <Route/>
      </Routes>
    </div>
  );
}

export default App;
