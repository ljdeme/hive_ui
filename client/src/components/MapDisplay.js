import React, { useEffect } from 'react';
import rosConnection from './ROSConnection';
import ROSLIB from 'roslib';

function MapDisplay() {
    useEffect(() => {
        
        const ROS2D = window.ROS2D;
        if (rosConnection.isConnected) {
        
            const viewer = new ROS2D.Viewer({
                divID: 'map',
                width: 600,
                height: 500,
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
        }
    }, []);

    // const map = new ROSLIB.Topic({
    //     ros: rosConnection.ros,
    //     name: "/agent1/map",
    //     messageType: "nav_msgs/OccupancyGrid"
    // });

    // // gets data from "agent1/map" topic.
    // map.subscribe(data=>{
    //     console.log(data);
    // });

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

    startSim.publish();

    function stopRosSim() {
        console.log('STOPPING SIM');
        stopSim.publish();
    }

    return (
        <div>
            <button 
                onClick={() => stopRosSim()}
            >Stop SIM
            </button>
            <div id="map"></div>
        </div>
    );
}

export default MapDisplay;
