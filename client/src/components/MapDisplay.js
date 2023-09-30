import React, { useState, useEffect } from "react";
import ROSLIB from 'roslib';

function MapDisplay({ ros }) {
    // State
    // eslint-disable-next-line
    const [currentStatus, setCurrentStatus] = useState("Disconnected");

    // Functions
    const setStatus = (status) => {
        setCurrentStatus(status);
    };

    useEffect(() => {
        console.log('useEffect is running');
        const ROS2D = window.ROS2D;

        // Create the main viewer.
        const viewer = new ROS2D.Viewer({
            divID : 'map',
            width : 800,
            height : 500,
        });

        // Setup the map client.
        const gridClient = new ROS2D.OccupancyGridClient({
            ros : ros,
            topic: '/agent1/map',
            rootObject : viewer.scene,
            // Use this property in case of continuous updates
            continuous: true
        });

        // Scale the canvas to fit the map
        gridClient.on('change', function() {
            viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
            viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
        });
    }, []);

    // ===================== Start and End Sim =====================
    const startSim = new ROSLIB.Topic({
        ros: ros, // Use the ROS connection passed as a prop
        name: '/start_sim',
        messageType: 'std_msgs/Empty'
    });

    const stopSim = new ROSLIB.Topic({
        ros: ros, // Use the ROS connection passed as a prop
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
