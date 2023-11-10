import React, {  useEffect } from "react";
import ROSLIB from 'roslib';
import { Stage, Graphics, Shape, Ticker } from "@createjs/easeljs";
import '../css/dashboard.css';

function MapDisplay({ ros, numagents, colors, isSim}) {

    const createjs = window.createjs;
    const ROS2D = window.ROS2D;

    MapDisplay.NavigationArrow = function(options){
        var that = this;
        options = options || {};
        var size = options.size || 10;
        var strokeSize = options.strokeSize || 3;
        var strokeColor = options.strokeColor || createjs.Graphics.getRGB(0, 0, 0);
        var fillColor = options.fillColor || createjs.Graphics.getRGB(255, 0, 0);
        var pulse = options.pulse;

        // draw the arrow
        var graphics = new createjs.Graphics();
        // line width
        graphics.setStrokeStyle(strokeSize);
        graphics.moveTo(-size / 2.0, -size / 2.0);
        graphics.beginStroke(strokeColor);
        graphics.beginFill(fillColor);
        graphics.lineTo(size, 0);
        graphics.lineTo(-size / 2.0, size / 2.0);
        graphics.lineTo(-size / 2.0, -size / 2.0);
        graphics.endFill();
        graphics.endStroke();

        // create the shape
        createjs.Shape.call(this, graphics);

        // check if we are pulsing
        if (pulse) {
        // have the model "pulse"
        var growCount = 0;
        var growing = true;
        createjs.Ticker.addEventListener('tick', function() {
            if (growing) {
            that.scaleX *= 1.035;
            that.scaleY *= 1.035;
            growing = (++growCount < 10);
            } else {
            that.scaleX /= 1.035;
            that.scaleY /= 1.035;
            growing = (--growCount < 0);
            }
        });
        }

    };
    MapDisplay.NavigationArrow.prototype.__proto__ = createjs.Shape.prototype;

    // Functions
    useEffect(() => {
        console.log('useEffect is running');

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
        console.log(colors[0])
        var robotMarker = new MapDisplay.NavigationArrow({
            size : 25,
            strokeSize : 1,
            strokeColor : Graphics.getRGB(0, 0, 0, 0.66),
            fillColor : colors[0],
            pulse : true,
        });


        robotMarker.visible = false;

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
            console.log("Recieved TF")
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

    if (isSim){
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
    else
    {
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

}

export default MapDisplay;
