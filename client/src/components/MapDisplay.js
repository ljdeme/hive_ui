import React, { useState, useEffect } from "react";
import rosConnection from './ROSConnection';
import ROSLIB from 'roslib';

function MapDisplay() {

    // State
    // eslint-disable-next-line
    const [currentStatus, setCurrentStatus] = useState("Disconnected");

    // Functions
    const setStatus = (status) => {
        setCurrentStatus(status);
    };

    useEffect(() => {
        const ROS2D = window.ROS2D;
            // Connect to ROS when the component mounts
            rosConnection.connect();

            rosConnection.ros.on("connection", () => {
                console.log("Connected to ROS");
                setStatus("Connected");
            });

            rosConnection.ros.on("error", (error) => {
                console.error("Error connecting to ROS:", error);
                setStatus("Error");
            });

            rosConnection.ros.on("close", () => {
                console.log("Disconnected from ROS");
                setStatus("Disconnected");
            });

        
            const viewer = new ROS2D.Viewer({
                divID: 'map',
            width : 800,
            height : 500,
            });

            const gridClient = new ROS2D.OccupancyGridClient({
                ros: rosConnection.ros, // Use the ROS connection from rosConnection
                topic: '/agent1/map',
                rootObject: viewer.scene,
                // Use this property in case of continuous updates
                continuous: true
            });

            // Scale the canvas to fit the map
            gridClient.on('change', function () {
                viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
            });
            
           
    }, []);
    // ===================== Start and End Sim =====================
    const startSim = new ROSLIB.Topic({
        ros: rosConnection.ros, // Use the ROS connection from rosConnection
        name: '/start_sim',
        messageType: 'std_msgs/Empty'
    });

    const stopSim = new ROSLIB.Topic({
        ros: rosConnection.ros, // Use the ROS connection from rosConnection
        name: '/stop_sim',
        messageType: 'std_msgs/Empty'
    });

    const startRosSim = () => {
        console.log('STARTING SIM');
        startSim.publish();
    }

    const stopRosSim = () =>{
        console.log('STOPPING SIM');
        stopSim.publish();
    }

    return (
        <div>
            <button onClick={startRosSim}>START SIM</button>
            <button onClick={stopRosSim}>STOP SIM</button>
            <div id="map"></div>
        </div>
    );
}

export default MapDisplay;
