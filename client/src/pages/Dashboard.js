
import React from "react";
import { useLocation } from 'react-router-dom';
import Navbar from "../components/Navbar";
import '../css/dashboard.css';
import FleetDashboard from "./FleetDashboard";

function Dashboard() {
  const location = useLocation();
  return ( location.state !== null && location.state !== undefined ) ? (
    <div className="dashboard">
      <FleetDashboard />
    </div>
  ):
  (
    <div className="dashboard">
      <Navbar />
      <h1 className='dashboard-header'>No Fleet Active</h1>
      <div className="dashboard-container">
      </div>
    </div>
  )
}

export default Dashboard;
