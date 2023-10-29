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

    const [velocities, setVelocities] = useState({
        linearX: 0,
        linearY: 0,
        angularZ: 0,
    });

    const [pressedKeys, setPressedKeys] = useState([]);
    
    const handleKeyUp = (event) => {
        event.stopPropagation();
        const updatedKeysPressed = { ...keysPressed };
        const updatedVelocities = { ...velocities };
        setPressedKeys(pressedKeys.filter(key => key !== event.key));

        if (event.keyCode === 87) // W
        {
            updatedKeysPressed.W = false;
            updatedVelocities.linearX = 0;
        }    
        else if (event.keyCode === 83) // S
        {
            updatedKeysPressed.S = false;
            updatedVelocities.linearX = 0;
        }
            
        if (event.keyCode === 65) // A
        {
           updatedKeysPressed.A = false;
           updatedVelocities.linearY = 0;
        }  
        else if (event.keyCode === 68) // D
        {
            updatedKeysPressed.D = false;
            updatedVelocities.linearY = 0;
        }
            
        if (event.keyCode === 81) // Q
        {
            updatedKeysPressed.Q = false;
            updatedVelocities.angularZ = 0;
        }
            
        else if (event.keyCode === 69) // E
        {
            updatedKeysPressed.E = false;
            updatedVelocities.angularZ = 0; 
        }
          
        sendVelocityCommand(updatedVelocities.linearX, updatedVelocities.linearY, updatedVelocities.angularZ);

        // Update the state with the new key presses
        setKeysPressed(updatedKeysPressed);
        setVelocities(updatedVelocities);
    };

    const handleKeyDown = (event) => {
        const updatedKeysPressed = { ...keysPressed };
        const updatedVelocities = { ...velocities };

        if (!pressedKeys.includes(event.key)) {
            setPressedKeys([...pressedKeys, event.key]);
        }

        if (event.keyCode === 87) // W
        {
            updatedKeysPressed.W = true;
            updatedVelocities.linearX = 1;
        }    
        else if (event.keyCode === 83) // S
        {
            updatedKeysPressed.S = true;
            updatedVelocities.linearX = -1;
        }

        if (event.keyCode === 65) // A
        {
           updatedKeysPressed.A = true;
           updatedVelocities.linearY = 1;
        }  
        else if (event.keyCode === 68) // D
        {
            updatedKeysPressed.D = true;
            updatedVelocities.linearY = -1;
        }
            
        if (event.keyCode === 81) // Q
        {
            updatedKeysPressed.Q = true;
            updatedVelocities.angularZ = -1;
        }
        else if (event.keyCode === 69) // E
        {
            updatedKeysPressed.E = true;
            updatedVelocities.angularZ = 1; 
        }

        if (updatedKeysPressed.W && updatedKeysPressed.S)
            updatedVelocities.linearX = 0;

        if (updatedKeysPressed.Q && updatedKeysPressed.E)
            updatedVelocities.angularZ = 0;
        
        if (updatedKeysPressed.D && updatedKeysPressed.A)
            updatedVelocities.linearY = 0;
        
        sendVelocityCommand(updatedVelocities.linearX, updatedVelocities.linearY, updatedVelocities.angularZ);

        // Update the state with the new key presses
        setKeysPressed(updatedKeysPressed);
        setVelocities(updatedVelocities);
    };

    // Event listener to handle key presses
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('keydown', handleKeyDown);
        

        // Clean up the event listeners
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
        // eslint-disable-next-line
    }, [keysPressed]);

    const keyboard = new ROSLIB.Topic({
        ros: props.ros, // Use the ROS connection from props
        name: `${props.agentName}/cmd_vel`,
        messageType: 'geometry_msgs/Twist',
    });

    const sendVelocityCommand = (linearX, linearY, angularZ) => {
        console.log(linearX+ ", " + linearY + ", " +  angularZ + ",");
        const twist = new ROSLIB.Message({
            linear: {
                x: linearX * props.speed,
                y: linearY * props.speed,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: angularZ * props.speed,
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
