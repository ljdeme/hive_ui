import React, {  useEffect } from "react";
import ROSLIB from 'roslib';
import { Stage, Graphics } from "@createjs/easeljs";
import '../css/dashboard.css';

function MapDisplay({ ros, agents, tfnamespaces}) {
    // Functions
    useEffect(() => {
        console.log('useEffect is running');
        const ROS2D = window.ROS2D;

        // Create the main viewer.
        const viewer = new ROS2D.Viewer({
            divID : 'map',
            width : 945,
            height : 470,
        });

        // Setup the map client.
        const gridClient = new ROS2D.OccupancyGridClient({
            ros : ros,
            topic: '/agent1/map',
            rootObject : viewer.scene,
            // Use this property in case of continuous updates
            continuous: true
        });

        var rootObject = viewer.scene

        // Scale the canvas to fit the map
        gridClient.on('change', function() {
            viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
            viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
        });

        // get a handle to the stage
        var stage;
        if (rootObject instanceof Stage) {
            stage = rootObject;
        } else {
            stage = rootObject.stage;
        }

        var robotMarker = new ROS2D.NavigationArrow({
            size : 25,
            strokeSize : 1,
            strokeColor : Graphics.getRGB(255, 128, 0, 0.66),
            fillColor : Graphics.getRGB(255,0,0,1),
            pulse : true,
        });


        robotMarker.visible = true;

        rootObject.addChild(robotMarker);        
        var initScaleSet = false;

        var updateRobotPosition = function(pose, orientation, marker) {
            // update the robots position on the map
            marker.x = pose.x;
            marker.y = -pose.y;
            if (!initScaleSet) {
              robotMarker.scaleX = 1.0 / stage.scaleX;
              robotMarker.scaleY = 1.0 / stage.scaleY;
              initScaleSet = true;
            }
            // change the angle
            marker.rotation =  0;
            //rootObject.rosQuaternionToGlobalTheta(orientation);
            // Set visible
            marker.visible = true;
            console.log(marker)
          };
          var tfClient = new ROSLIB.TFClient({
            ros : ros,
            fixedFrame : 'map',
            angularThres : 0.01,
            transThres : 0.01
          });
        tfClient.subscribe('agent1/base_link', function(tf) {
            updateRobotPosition(tf.translation, tf.rotation, robotMarker);
        });

    }, [ros]);

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
            <div id="map"></div>
            <div className="sim-buttons">
                <button className='startSim-btn' onClick={startRosSim}>START SIM</button>
                <button className='stopSim-btn' onClick={stopRosSim}>STOP SIM</button> 
            </div>
            
        </div>
    );
}

export default MapDisplay;
