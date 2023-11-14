
import React from "react";
import { useLocation } from 'react-router-dom';
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
      <h1 className='dashboard-header-inactive'>No Fleet Active</h1>
    </div>
  )
}

export default Dashboard;
