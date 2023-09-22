import React, { useState, useEffect } from "react";
import ReactNipple from "react-nipple";
import DebugView from "react-nipple/lib/DebugView";
import ROSLIB from 'roslib';

function Joystick({ agentName }) {

    // Connect to ROS
    const [currentStatus, setStatus] = useState("Not connected");
    const [ros] = useState(new ROSLIB.Ros({ encoding: 'ascii' })); // Initialize with a new ROS instance

    useEffect(() => {
        if (currentStatus === 'Connected!' && !ros.isConnected) {
            ros.connect("ws://192.168.254.128:9090");
            ros.on("connection", () => {
                console.log("Connected to ROS");
                setStatus("Connected!");
            });

            ros.on("error", (error) => {
                console.error("Failed to connect to ROS: ", error);
                setStatus("Connection failed");
            });

            ros.on("close", () => {
                console.log("Disconnected from ROS");
                setStatus("Connection closed");
            });
        }
    }, [currentStatus, ros]);

    // ROS topics
    const joystick = new ROSLIB.Topic({
        ros: ros,
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
                        threshold: 0.1,
                    }}
                    style={{
                        width: 250,
                        height: 250,
                    }}
                    onMove={handleJoystickMove}
                />
                <DebugView data={data} />
            </div>
        </div>
    );
}

export default Joystick;
