import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import '../css/KeyboardControl.css';

function KeyboardControl(props) {
    const [keysPressed, setKeysPressed] = useState({
        W: false,
        A: false,
        S: false,
        D: false,
        Q: false,
        E: false,
    });
    var [linearX, setLinearX] = useState(0);
    var [linearY, setLinearY] = useState(0);
    var [angularZ, setAngularZ] = useState(0);

    // Event listener to handle key presses
    useEffect(() => {

        const handleKeyDown = (event) => {
            console.log(props.speed/100)
            // Create a copy of the current keysPressed state
            const updatedKeysPressed = { ...keysPressed };
            let updatedLinearX = linearX;
            let updatedLinearY = linearY;
            let updatedAngularZ = angularZ;
            // eslint-disable-next-line
            switch (event.keyCode) {
                case 65:
                    console.log("turning left");
                    updatedKeysPressed.A = true;
                    // eslint-disable-next-line
                    angularZ = 1 * (props.speed / 100);
                    console.log("turning left at " + angularZ);
                    break;
                case 87:
                    // eslint-disable-next-line
                    updatedKeysPressed.W = true;
                    // eslint-disable-next-line
                    linearX = 0.5 * (props.speed/100);
                    console.log("Going Straight at " + linearX);
                    break;
                case 68:
                    updatedKeysPressed.D = true;
                    angularZ = -1 * (props.speed/100);
                    console.log("turning right at " + angularZ);
                    break;
                case 83:
                    updatedKeysPressed.S = true;
                    linearX = -0.5 * (props.speed/100);
                    console.log("Going reverse at " + linearX);
                    break;
                case 69:
                    updatedKeysPressed.E = true;
                    // eslint-disable-next-line
                    linearY = -0.5 * (props.speed/100);
                    console.log("Strafing right at " + linearY);
                    break;
                case 81:
                    updatedKeysPressed.Q = true;
                    linearY = 0.5 * (props.speed/100);
                    console.log("Strafing left at " + linearY);
                    break;
                case 16:
                    updatedKeysPressed.SHIFT = true;
                    break;
            }

            // Update the state with the new key presses
            setKeysPressed(updatedKeysPressed);
            setLinearX(updatedLinearX);
            setLinearY(updatedLinearY);
            setAngularZ(updatedAngularZ);

            sendVelocityCommand(linearX,linearY,angularZ);
        };

        const handleKeyUp = (event) => {
            // Create a copy of the current keysPressed state
            const updatedKeysPressed = { ...keysPressed };
            let updatedLinearX = linearX;
            let updatedLinearY = linearY;
            let updatedAngularZ = angularZ;
            // eslint-disable-next-line
            switch (event.keyCode) {
                case 65:
                    updatedKeysPressed.A = false;
                    angularZ = 0;
                    break;
                case 87:
                    updatedKeysPressed.W = false;
                    linearX = 0;
                    break;
                case 68:
                    updatedKeysPressed.D = false;
                    angularZ = 0;
                    break;
                case 83:
                    updatedKeysPressed.S = false;
                    linearX = 0;
                    break;
                case 69:
                    updatedKeysPressed.E = false;
                    linearY = 0;
                    break;
                case 81:
                    updatedKeysPressed.Q = false;
                    linearY = 0;
                    break;
                case 16:
                    updatedKeysPressed.SHIFT = false;
                    break;
            }

            // Update the state with the new key releases
            setKeysPressed(updatedKeysPressed);
            setLinearX(updatedLinearX);
            setLinearY(updatedLinearY);
            setAngularZ(updatedAngularZ);

            sendVelocityCommand(linearX,linearY,angularZ);
        };

       
           

       

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Clean up the event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
        // eslint-disable-next-line
    }, [keysPressed, linearX, linearY, angularZ]);

    const keyboard = new ROSLIB.Topic({
        ros: props.ros, // Use the ROS connection from props
        name: `${props.agentName}/cmd_vel`,
        messageType: 'geometry_msgs/Twist',
    });

    const sendVelocityCommand = (linearX,linearY,angularZ) => {
        console.log("IN sendVelocityCommand")
        const twist = new ROSLIB.Message({
            linear: {
                x: linearX,
                y: linearY,
                z: angularZ,
            },
            angular: {
                x: angularZ,
                y: 0,
                z: 0,
            },
        });

        keyboard.publish(twist);
    };

    return (
        <div className="teleop-layout">
            <div className="keyboard-layout">
                <div className="keyboard-layout-top ">
                    <div className={`key-box ${keysPressed.Q ? 'glow' : ''}`} id="Q">Q</div>
                    <div className={`key-box ${keysPressed.W ? 'glow' : ''}`} id="W">W</div>
                    <div className={`key-box ${keysPressed.E ? 'glow' : ''}`} id="E">E</div>
                </div>
                <div className="keyboard-layout-bottom ">
                    <div className={`key-box ${keysPressed.A ? 'glow' : ''}`} id="A">A</div>
                    <div className={`key-box ${keysPressed.S ? 'glow' : ''}`} id="S">S</div>
                    <div className={`key-box ${keysPressed.D ? 'glow' : ''}`} id="D">D</div>
                </div>
            </div>
        </div>
    );
}

export default KeyboardControl;
