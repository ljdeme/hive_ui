import React, { useState } from "react";
import ReactNipple from "react-nipple";
import ROSLIB from 'roslib';

function Joystick(props) {
    const joystick = new ROSLIB.Topic({
        ros: props.ros, // Use the ROS connection from props
        name: `${props.agentName}/joystick`,
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
    const handleJoystickMove = (evt, data) => {
        console.log("Moving: " + props.agentName);
        setData(data);
        if (props.agentName !== "null")
        {
            // Calculate linear and angular velocities based on joystick input
            const maxLinear = 1.0; // m/s
            const maxAngular = 1.0; // rad/s
            const maxDistance = 100.0; // pixels

            const angleRadian = parseFloat(data.angle.radian);
            const distance = parseFloat(data.distance);

            const linearSpeed = (Math.sin(angleRadian) * maxLinear * distance) / maxDistance;
            const angularSpeed = (Math.cos(angleRadian) * maxAngular * distance) / maxDistance;

            sendVelocityCommand(linearSpeed, angularSpeed);
        }
        else{
            console.error("No Agent Selected in joystick!")
        }

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
