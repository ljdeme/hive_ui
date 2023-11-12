import React, {  useEffect, useState } from "react";
import ROSLIB from 'roslib';
import { Stage, Graphics, Shape, Ticker } from "@createjs/easeljs";
import '../css/dashboard.css';

function MapDisplay({ ros, numagents, colors, isSim, selectedAgent}) {

    const [stoppedSim, setSimstate] = useState(false);
    const createjs = window.createjs;
    const ROS2D = window.ROS2D;

    var position = null;
    var posx = null;
    var posy = null;
    var goalx = null;
    var goaly = null;
    var autoType = 0;
    var thetaRadians = 0;
    var thetaDegrees = 0;
    var orientationMarker = null;
    var mouseDown = false;
    var xDelta = 0;
    var yDelta = 0;
    var agentBusy = false;

    var navCallback = function(value){
        agentBusy = value;
    };

    // Decider
    var decider = new ROSLIB.Topic({
        ros : ros,
        name : '/decider',
        messageType : 'hive_states/Decider'
    });

    // Decider message 
    var cmd = new ROSLIB.Message({
        id : 0,
        command : 0, 
        autoType : 0,
        x : 0.0, 
        y: 0.0,
        orientation: 0.0 
    });
    
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
    var mouseEventHandler = function(event, mouseState, stage, selectedAgent, rootObject) {

        if (selectedAgent == null)
        {
            console.log("No agent selected on map.");
            selectedAgent = 1;
        };

        var namespace = "/agent" + selectedAgent + "/goalSet";
        
        var isBusy = new ROSLIB.Param({
            ros : ros,
            name : namespace
        });

        isBusy.get(function(value) {
            navCallback(value)
        });

        console.log(agentBusy);

        if (mouseState === 'down'){
           // get position when mouse button is pressed down
            position = stage.globalToRos(event.stageX, event.stageY);
            posx = position.x;
            posy = position.y;
            mouseDown = true;
            console.log(position);
        }

        // else if (mouseState === 'move'){
        //   // remove obsolete orientation marker
        //   if(orientationMarker != null)
        //   {
        //     rootObject.removeChild(orientationMarker);
        //   }

        //   if ( mouseDown === true) {
        //     // if mouse button is held down:
        //     // - get current mouse position
        //     // - calulate direction between stored <position> and current position
        //     // - place orientation marker
        //     var currentPos = stage.globalToRos(event.stageX, event.stageY);
  
        //     orientationMarker = new MapDisplay.NavigationArrow({
        //         size : 0.5,
        //         strokeSize : 0.05,
        //         strokeColor : Graphics.getRGB(0, 0, 0, 0.66),
        //         fillColor : colors[(selectedAgent-1)],
        //         pulse : true,
        //       });
        //     }
  
        //     console.log(currentPos);

            // xDelta =  currentPos.x - posx;
            // yDelta =  currentPos.y - posy;
  
            // thetaRadians  = Math.atan2(xDelta,yDelta);
  
            // thetaDegrees = thetaRadians * (180.0 / Math.PI);
  
            // if (thetaDegrees >= 0 && thetaDegrees <= 180) {
            //   thetaDegrees += 270;
            // } else {
            //   thetaDegrees -= 90;
            // }
  
            // orientationMarker.x =  posx;
            // orientationMarker.y = -posy;
            // orientationMarker.rotation = thetaDegrees;
            // rootObject.addChild(orientationMarker);
          //}

        else if (mouseDown) { // mouseState === 'up'
           // if mouse button is released
           // - get current mouse position (goalPos)
           // - calulate direction between stored <position> and goal position
           // - set pose with orientation
           // - send goal
            mouseDown = false;

            if(agentBusy)
            {
                console.log("Navigation command already sent. Please wait.");
                return;
            }

            if(orientationMarker != null)
            {
                rootObject.removeChild(orientationMarker);
            }

            orientationMarker = new MapDisplay.NavigationArrow({
                size : 0.5,
                strokeSize : 0.05,
                strokeColor : Graphics.getRGB(0, 0, 0, 0.66),
                fillColor : colors[(selectedAgent-1)],
                pulse : true,
              });
  
            var goalPos = stage.globalToRos(event.stageX, event.stageY);
  
            goalx = goalPos.x;
            goaly = goalPos.y;
  
            xDelta =  goalx - posx;
            yDelta =  goaly - posy;
  
            thetaRadians  = Math.atan2(xDelta,yDelta);
  
            if (thetaRadians >= 0 && thetaRadians <= Math.PI) {
              thetaRadians += (3 * Math.PI / 2);
            } else {
              thetaRadians -= (Math.PI/2);
            }
            
            cmd.id = selectedAgent;
            cmd.command = 3;
            cmd.x = posx;
            cmd.y = posy;
            cmd.orientation = 0;
            // send the goal
            decider.publish(cmd);

            orientationMarker.x =  posx;
            orientationMarker.y = -posy;
            rootObject.addChild(orientationMarker);

            cmd.id = 0;
            
        }
    };

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


        var markers = [];
        for(let i = 0; i<numagents; i++){

            var robotMarker = new MapDisplay.NavigationArrow({
                size : 0.5,
                strokeSize : 0.05,
                strokeColor : Graphics.getRGB(0, 0, 0, 0.66),
                fillColor : colors[i],
                pulse : false,
            });
            robotMarker.visible = false;
            rootObject.addChild(robotMarker);
            markers.push(robotMarker);
        }


        var initScaleSet = false;

        var updateRobotPosition = function(pose, orientation, marker) {
            // update the robots position on the map
            marker.x = pose.x;
            marker.y = -pose.y;
            var q0 = orientation.w;
            var q1 = orientation.x;
            var q2 = orientation.y;
            var q3 = orientation.z;

            // Canvas rotation is clock wise and in degrees
            var rotation = -Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180.0 / Math.PI;

            marker.rotation =  rotation;
            // Set visible
            marker.visible = true;
            console.log("Recieved TF")
          };

        var clients = [];
        for(let i = 0; i<numagents; i++){

            let id = i+1;
            let namespace = 'agent' + (id)

            var tfClient = new ROSLIB.TFClient({
            ros : ros,
            fixedFrame : 'map',
            angularThres : 0.01,
            transThres : 0.01
            });
            tfClient.subscribe(namespace + '/base_link', function(tf) {
                updateRobotPosition(tf.translation, tf.rotation, robotMarker);
            });
            clients.push(tfClient);
        }

        rootObject.addEventListener('stagemousedown', function(event) {
            mouseEventHandler(event, 'down', stage, selectedAgent, rootObject);
        });

        rootObject.addEventListener('stagemousemove', function(event) {
            mouseEventHandler(event, 'move', stage, selectedAgent, rootObject);
        });

        rootObject.addEventListener('stagemouseup', function(event) {
            mouseEventHandler(event, 'up', stage, selectedAgent, rootObject);
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

    // ===================== Start and End Sim =====================
    const startStack = new ROSLIB.Topic({
        ros: ros, // Use the ROS connection passed as a prop
        name: '/start_stack',
        messageType: 'std_msgs/Empty'
    });

    const stopStack = new ROSLIB.Topic({
        ros: ros, // Use the ROS connection passed as a prop
        name: '/stop_stack',
        messageType: 'std_msgs/Empty'
    });

    const startRosSim = () => {
        console.log('STARTING SIM');
        startSim.publish();
        setSimstate(true);
    }

    const stopRosSim = () =>{
        console.log('STOPPING SIM');
        stopSim.publish();
        setSimstate(false);
    }

    const startRosStack = () => {
        console.log('STARTING STACK');
        startStack.publish();
        setSimstate(true);
    }

    const stopRosStack = () =>{
        console.log('STOPPING STACK');
        stopStack.publish();
        setSimstate(false);
    }

    if (isSim){
        return (
            <div>
                <div id="map"></div>
                <div className="sim-buttons">
                    <button className='start-btn' onClick={startRosSim}>START</button>
                    <button className='stop-btn' onClick={stopRosSim}>STOP</button> 
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
                <button className='start-btn' onClick={startRosStack}>START</button>
                <button className='stop-btn' onClick={stopRosStack}>STOP</button> 
            </div>
            
        </div>
         );
    }

}

export default MapDisplay;
