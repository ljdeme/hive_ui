// TEMP Joystick Control

import React, { useState, useEffect } from "react";
import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
import ROSLIB from 'roslib';

function Joystick() {

    // Connect to ROS
    const [currentStatus, setStatus] = useState("Not connected");
    const [ros, setRos] = useState(null);

    useEffect(() => {
        if (currentStatus === 'Connected!' && ros === null) {
            const newRos = new ROSLIB.Ros({ encoding: 'ascii' });
            newRos.connect("ws://192.168.254.128:9090");
            newRos.on("connection", () => {
                console.log("Connected to ROS");
                setStatus("Connected!");
                setRos(newRos);
            });

            newRos.on("error", (error) => {
                console.error("Failed to connect to ROS: ", error);
                setStatus("Connection failed");
            });

            newRos.on("close", () => {
                console.log("Disconnected from ROS");
                setStatus("Connection closed");
            });
        }
    }, [currentStatus, ros]);

    // ROS topics
    const joystick = new ROSLIB.Topic({
        ros: ros,
        name: '/agent1/joystick',
        messageType: 'geometry_msgs/Twist'
    });

    const sendVelocityCommand = (linearX, angularZ) => {
        const twist = new ROSLIB.Message({
            linear: {
                x: linearX,
                y: 0,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: angularZ,
            },
        });

        joystick.publish(twist);
    }

    // State
    const [data, setData] = useState();

    // Functions
    const handleJoystickStart = (evt, data) => {
        console.log("Movement start");
        setData(data);
    };

    const handleJoystickEnd = (evt, data) => {
        console.log("Movement end");
        setData(data);
        sendVelocityCommand(0, 0);
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

        sendVelocityCommand(linearSpeed, angularSpeed);
    };

    return (
        <div>
            <div>
                {currentStatus}
            </div>
            <button onClick={() => { setStatus('Connected!') }}>Connect</button>
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
