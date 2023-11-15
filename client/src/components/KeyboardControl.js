import React, { useState, useEffect } from 'react';
import ROSLIB from 'roslib';
import '../css/KeyboardControl.css';

function KeyboardControl(props) {
    const [velocities, setVelocities] = useState({
        linearX: 0,
        linearY: 0,
        angularZ: 0,
      });
    
      const movementSpeed = 1;
    
      const [moving, setMoving] = useState({ 
        W: 0,
        A: 0,
        S: 0,
        D: 0,
        Q: 0,
        E: 0,
        SHIFT: 0,
      });

      const [resetCommandSent, setResetCommandSent] = useState(false);
      const [shiftPressed, setShiftPressed] = useState(false);

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
            case 16: // SHIFT
              if (!shiftPressed) {
                setShiftPressed(true);
                setMoving((prevState) => ({ ...prevState, SHIFT: prevState.SHIFT === 0 ? 1 : 0 }));
              }
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
            case 16: // SHIFT
              setShiftPressed(false);
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
      }, [movementSpeed, shiftPressed]);
    
    useEffect(() => {
        const moveAgent = () => {
            const newX = moving.W + moving.S;
            const newY = moving.A + moving.D;
            const newZ = moving.Q + moving.E;
            const newToggleAttachment = moving.SHIFT;

            if (newX !== 0 || newY !== 0 || newZ !== 0 || shiftPressed) {
                // Send the movement command
                // console.log("IN MOVE AGENT: " + newX + ", " + newY + ", " +  newZ + ": " + newToggleAttachment);
                sendVelocityCommand(newX, newY, newZ, moving.SHIFT);

                // Reset the state variable to indicate the reset command hasn't been sent
                setResetCommandSent(false);
            } else if (!resetCommandSent) {
              sendVelocityCommand(newX, newY, newZ, newToggleAttachment);
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
      name: `/joystick`,
      messageType: 'geometry_msgs/Twist',
  });

  const cmdInterpreter =  new ROSLIB.Topic({
    ros: props.ros, // Use the ROS connection from props
    name: '/decider',
    messageType: 'hive_states/Decider'
  });

  const sendVelocityCommand = (linearX, linearY, angularZ, attachmentToggle) => {
      const scaleSpeed = (props.speed / 100.0)
      // console.log(linearX * scaleSpeed + ", " + linearY * scaleSpeed + ", " +  angularZ * scaleSpeed+ ", " + ": " + attachmentToggle);
      
      const twist = new ROSLIB.Message({
          linear: {
              x: linearX * scaleSpeed,
              y: linearY * scaleSpeed,
              z: attachmentToggle,
          },
          angular: {
              x: 0,
              y: 0,
              z: angularZ * scaleSpeed, 
          },
      });

      const command = new ROSLIB.Message({
        id: props.selectedAgentIndex,
        command: 1,
        autoType: 0,
        x: 0,
        y: 0,
        orientation: 0,
      });

      cmdInterpreter.publish(command);
      keyboard.publish(twist);
  };

    return (
        <div className="teleop-layout">
          {(!moving.SHIFT) ? (<div className='velocities'>Attachment: Locked</div>) : (<div className='velocities'>Attachment: Unocked</div>)}
            <div className="keyboard-layout">
              <div className="keyboard-layout-top">
                  <div className='key-box-space'></div>
                  <div className={`key-box ${moving.Q ? 'glow' : ''}`} id="Q">Q</div>
                  <div className={`key-box ${moving.W ? 'glow' : ''}`} id="W">W</div>
                  <div className={`key-box ${moving.E ? 'glow' : ''}`} id="E">E</div>
              </div>
              <div className="keyboard-layout-bottom">
                  <div className='shift-container'>
                    <div className={`key-box ${!moving.SHIFT ? 'glow' : ''}`} id="SHIFT">SHIFT</div>
                  </div>
                  <div className={`key-box ${moving.A ? 'glow' : ''}`} id="A">A</div>
                  <div className={`key-box ${moving.S ? 'glow' : ''}`} id="S">S</div>
                  <div className={`key-box ${moving.D ? 'glow' : ''}`} id="D">D</div>
              </div>
              <div className='velocities'>
                <div className='dir'>X: {velocities.linearX * (props.speed / 100.0)}</div>
                <div className='dir'>Y: {velocities.linearY * (props.speed / 100.0)}</div>
                <div className='dir'>Z: {velocities.angularZ * (props.speed / 100.0)}</div>
              </div>
            </div> 
        </div>
    );
}

export default KeyboardControl;
