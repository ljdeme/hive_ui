import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import '../css/KeyboardControl.css';

function KeyboardControl(props) {
    const [velocities, setVelocities] = useState({
        linearX: 0,
        linearY: 0,
        angularZ: 0,
      });
    
      const movementSpeed = 1; // Set your desired movement speed here
    
      const [moving, setMoving] = useState({ 
        W: 0,
        A: 0,
        S: 0,
        D: 0,
        Q: 0,
        E: 0,
        SPACE: 0,
      });
      const [resetCommandSent, setResetCommandSent] = useState(false);

      useEffect(() => {
        const handleKeyDown = (e) => {
          switch (e.keyCode) {
            case 87: // W
              setMoving((prevState) => ({ ...prevState, W: 1 }));
              break;
            case 83: // S
              setMoving((prevState) => ({ ...prevState, S: -1 }));
              break;
            case 65: // A
              setMoving((prevState) => ({ ...prevState, A: 1 }));
              break;
            case 68: // D
              setMoving((prevState) => ({ ...prevState, D: -1 }));
              break;
            case 81: // Q
              setMoving((prevState) => ({ ...prevState, Q: 1 }));
              break;
            case 69: // E
              setMoving((prevState) => ({ ...prevState, E: -1 }));
              break;
            case 32: // Space
              setMoving((prevState) => ({ ...prevState, SPACE: prevState.SPACE === 1 ? 1 : 0 }));
            break;
            default:
              break;
          }
        };
    
        const handleKeyUp = (e) => {
          switch (e.keyCode) {
            case 87: // W
              setMoving((prevState) => ({ ...prevState, W: 0 }));
              break;
            case 83: // S
              setMoving((prevState) => ({ ...prevState, S: 0 }));
              break;
            case 65: // A
              setMoving((prevState) => ({ ...prevState, A: 0 }));
              break;
            case 68: // D
              setMoving((prevState) => ({ ...prevState, D: 0 }));
              break;
            case 81: // Q
              setMoving((prevState) => ({ ...prevState, Q: 0 }));
              break;
            case 69: // E
              setMoving((prevState) => ({ ...prevState, E: 0 }));
              break;
            default:
              break;
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
          document.removeEventListener("keyup", handleKeyUp);
        };
      }, [movementSpeed]);
    
    useEffect(() => {
        const moveAgent = () => {
            const newX = moving.W + moving.S;
            const newY = moving.A + moving.D;
            const newZ = moving.Q + moving.E;
            
            if (newX !== 0 || newY !== 0 || newZ !== 0) {
                // Send the movement command
                sendVelocityCommand(newX, newY, newZ, moving.SPACE);

                // Reset the state variable to indicate the reset command hasn't been sent
                setResetCommandSent(false);
            } else if (!resetCommandSent) {
                // Send the reset command only if no keys are pressed and it hasn't been sent already
                sendVelocityCommand(newX, newY, newZ, moving.SPACE);

                // Set the state variable to indicate that the reset command has been sent
                setResetCommandSent(true);
            }

            setVelocities({ linearX: newX, linearY: newY, angularZ: newZ });
        };
        
        const interval = setInterval(moveAgent, 16);
    
        return () => clearInterval(interval);
      // eslint-disable-next-line
    }, [moving, velocities]);

    const keyboard = new ROSLIB.Topic({
        ros: props.ros, // Use the ROS connection from props
        name: `${props.agentName}/cmd_vel`,
        messageType: 'geometry_msgs/Twist',
    });

    const cmdInterpreter =  new ROSLIB.Topic({
      ros: props.ros, // Use the ROS connection from props
      name: '/command_interpreter',
      messageType: 'hive_states/Decider'
    });

    const sendVelocityCommand = (linearX, linearY, angularZ, attachmentToggle) => {
        const scaleSpeed = (props.speed / 100.0)
        console.log(linearX * scaleSpeed+ ", " + linearY * scaleSpeed + ", " +  angularZ * scaleSpeed+ ",");
        
        const twist = new ROSLIB.Message({
            linear: {
                x: linearX * scaleSpeed,
                y: linearY * scaleSpeed,
                z: 0,
            },
            angular: {
                x: 0,
                y: 0,
                z: angularZ * scaleSpeed, 
            },
        });

        const command = new ROSLIB.Message({
          id: props.selectedAgentIndex,
          command: 2,
          autoType: 0,
          x: 0,
          y: 0,
          z: attachmentToggle,
          orientation: 0,
        });

        cmdInterpreter.publish(command);
        keyboard.publish(twist);
    };

    return (
        <div className="teleop-layout">
            <div className="keyboard-layout">
                {(!moving.SPACE) ? (<div className='velocities'>Attachment: Locked</div>) : (<div className='velocities'>Attachment: Unocked</div>)}
                
                <div className="keyboard-layout-top">
                    <div className={`key-box ${moving.Q ? 'glow' : ''}`} id="Q">Q</div>
                    <div className={`key-box ${moving.W ? 'glow' : ''}`} id="W">W</div>
                    <div className={`key-box ${moving.E ? 'glow' : ''}`} id="E">E</div>
                </div>
                <div className="keyboard-layout-bottom">
                    <div className={`key-box ${moving.A ? 'glow' : ''}`} id="A">A</div>
                    <div className={`key-box ${moving.S ? 'glow' : ''}`} id="S">S</div>
                    <div className={`key-box ${moving.D ? 'glow' : ''}`} id="D">D</div>
                    <div className={`key-box ${!moving.SPACE ? 'glow' : ''}`} id="A">SPACE</div>
                </div>

            </div> 
        </div>
    );
}

export default KeyboardControl;
