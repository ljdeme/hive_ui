// TEMP Joystick Control

import React, { useState } from "react";
import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
import ROSLIB from 'roslib'

function Joystick() {

    // Connect to ROS
    const [currentStatus, setStatus] = useState("Not connected")
    const ros = new ROSLIB.Ros({encoding: 'ascii'})
   
    function connect() {
        console.log("Button Pressed");
        console.log(currentStatus);
        
        if (currentStatus === 'Connected!') {
            console.log("Already Connected\n");
        }
        else {
            ros.connect("ws://192.168.254.128:9090");
            ros.on("connection", ()=>{
                console.log("connected to ros\n");
                setStatus("Connected!")
            });
            
            ros.on("error", (error)=>{
                console.log("failed to connect to ros\n");
                setStatus(error)
            })
            
            ros.on("close", ()=>{
                console.log("disconnected from ros\n");
                setStatus("Connection closed")
            }); 
        }
    }
    
    // =============== ROS topics ===============
    const txt_listener = new ROSLIB.Topic({
        ros : ros,
        name : '/txt_msg',
        messageType : 'std_msgs/String'
    });

    txt_listener.subscribe (function(m) {
        document.getElementById("msg").innerHTML = m.data;
    });

    // agent names may vary.
    const map = new ROSLIB.Topic({
        ros: ros,
        name: "/agent1/map",
        messageType: "nav_msgs/OccupancyGrid"
    });

    // gets data from "agent1/map" topic.
    map.subscribe(data=>{
        console.log(data);
    });

    // =============== state ===============
    const [data, setData] = useState();

    const [state, setState] = useState({
        axes: [0, 0, 0, 0, 0, 0],
        buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    });


    // =============== functions ===============
    const handleJoystickStart = (evt, data) => {
        console.log("Movement start");
        setData(data);
    };

    const handleJoystickEnd = (evt, data) => {
        console.log("Movement end");
        setData(data);
        setState({
            axes: [0, 0, 0, 0, 0, 0]
        });
        // Publish data to "/agent1/joystick" topic.
        var joystick = new ROSLIB.Topic({
            ros: ros,
            name: '/agent1/joystick',
            messageType: 'geometry_msgs/Twist'
        });
    
        var twist = new ROSLIB.Message({
            linear: {
              x: 0,
              y: 0,
              z: 0
            },
            angular: {
              x: 0,
              y: 0,
              z: 0
            }
        });
        console.log(twist);
        joystick.publish(twist);
    };

    const handleJoystickMove = (evt, data) => {
        console.log("Moving");
        setData(data);
        // Calculate linear and angular velocities based on joystick input
        const maxLinear = 5.0; // m/s
        const maxAngular = 2.0; // rad/s
        const maxDistance = 75.0; // pixels

        const linearSpeed = (Math.sin(data.angle.radian) * maxLinear * data.distance) / maxDistance;
        const angularSpeed = (Math.cos(data.angle.radian) * maxAngular * data.distance) / maxDistance;
        console.log("Linear Speed: " + linearSpeed );
        console.log("Angular Speed: " + angularSpeed);

        // Publish data to "/agent1/joystick" topic.
        var joystick = new ROSLIB.Topic({
            ros: ros,
            name: '/agent1/joystick',
            messageType: 'geometry_msgs/Twist'
        });
    
        var twist = new ROSLIB.Message({
            linear: {
            x: linearSpeed,
            y: 0,
            z: 0
            },
            angular: {
            x: 0,
            y: 0,
            z: angularSpeed
            }
        });
        console.log(twist);
        joystick.publish(twist);
    };

    return (
        <div>
            <div>
                {currentStatus}
            </div>
            <button onClick={()=> {connect()}}>Connect</button>
            <div className="joystick-wrapper mt-5">
                <ReactNipple
                    className="joystick is-relative"
                    options={{
                        mode: "static",
                        color: "hsl(219, 84%, 56%)",
                        position: { top: "50%", left: "50%" },
                        size: 150,
                        treshold: 0.1,
                    }}
                    style={{
                        width: 250,
                        height: 250,
                    }}
                    onStart={handleJoystickStart}
                    onEnd={handleJoystickEnd}
                    onMove={handleJoystickMove}
                />
                <DebugView data={data} />
            </div>
        </div>
    );
}

export default Joystick;