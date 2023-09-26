import React, { useState, useEffect } from "react";
import ReactNipple from "react-nipple";
import ROSLIB from 'roslib';
import rosConnection from './ROSConnection';

function Joystick({ agentName }) {
    // State
    // eslint-disable-next-line
    const [currentStatus, setCurrentStatus] = useState("Disconnected");

    // Functions
    const setStatus = (status) => {
        setCurrentStatus(status);
    };

    useEffect(() => {
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

        // Clean up the ROS connection on unmount
        return () => {
            rosConnection.disconnect();
        };
    }, []);

    const joystick = new ROSLIB.Topic({
        ros: rosConnection.ros, // Use the ROS connection from rosConnection
        name: `${agentName}/joystick`,
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
    // eslint-disable-next-line
    const [data, setData] = useState(null);

    // Functions
    const handleJoystickMove = (_, data) => {
        console.log("Moving");
        setData(data);

        // Calculate linear and angular velocities based on joystick input
        const maxLinear = 5.0; // m/s
        const maxAngular = 2.0; // rad/s
        const maxDistance = 75.0; // pixels

        const angleRadian = parseFloat(data.angle.radian);
        const distance = parseFloat(data.distance);

        const linearSpeed = (Math.sin(angleRadian) * maxLinear * distance) / maxDistance;
        const angularSpeed = (Math.cos(angleRadian) * maxAngular * distance) / maxDistance;

        sendVelocityCommand(linearSpeed, angularSpeed);
    };

    return (
        <div>
            <div className="joystick-wrapper mt-5">
                <ReactNipple
                    className="joystick is-relative"
                    options={{
                        mode: "static",
                        color: "black",
                        position: { top: '50%', left: '50%' },
                        threshold: 0.1,
                    }}
                    style={{
                        width: 200,
                        height: 200,
                        position: 'relative',
                        backgroundColor: 'rgba(255, 249, 228, 0.842)',
                        borderRadius: 1120
                    }}
                    onMove={handleJoystickMove}
                />
            </div>
        </div>
    );
}

export default Joystick;
