
import '../App.css';
import Navbar from "../components/Navbar";
import Map from "../components/MapDisplay";
import React, { useState, useEffect } from "react";
import ROSLIB from 'roslib';

function Home() {
  const [ros, setRos] = useState(null);

  useEffect(() => {
    // Initialize the ROS connection when the component mounts
    const ros = new ROSLIB.Ros({
      // url: 'ws://192.168.254.128:9090', // FOR LOCAL
      url: 'ws://144.126.249.86:9090', // On DigitalOcean
    });

    ros.on('connection', () => {
      console.log('Connected to ROS');
    });

    ros.on('error', (error) => {
      console.error('Error connecting to ROS:', error);
    });

    ros.on('close', () => {
      console.log('Disconnected from ROS');
    });

    setRos(ros);

    // Clean up the ROS connection on unmount
    return () => {
      ros.close();
    };
  }, []);

  if (!ros) {
    // Wait for the ROS connection to be established
    return <div>Loading...</div>;
  }
  return (
    
    <div className="App">

      <Navbar/>
      <Map ros={ ros } />
    </div>
  );
}

export default Home;