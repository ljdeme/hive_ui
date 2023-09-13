import React, { useState } from 'react'
import roslib from 'roslib'

function SendMessage() {
    const [currentStatus, setStatus] = useState("Not connected")
    const ros = new roslib.Ros({encoding: 'ascii'})
   

    function connect() {
        if (currentStatus === 'Connected!') {
            console.log("Already Connected\n");
            ros.connect("ws://192.168.254.128:9090");
        }
        
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
    
    // agent names may vary.
    
    const map = new roslib.Topic({
            ros: ros,
            name: "/agent1/map",
            messageType: "nav_msgs/OccupancyGrid"
    });
    
    const joystic = new roslib.Topic({
            ros: ros,
            name: "agent1/joystick",
            messageType: "geometry_msgs/Twist"
    });
    
    // gets data from "agent1/map" topic.
    map.subscribe(data=>{
            console.log(data);
    });
        
    // publishes data to "agent1/joystick" topic.
    joystic.publish(new roslib.Message({
            linear:{
                x: 0,
                y: 1,
                z: -1
            }
    }));
    
  return (
  <div>
    <div>
      {currentStatus}
    </div>
    <button onClick={() => connect()}>Connect</button>
  </div>
  )
}

export default SendMessage