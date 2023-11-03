
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from "../components/Navbar";
import ROSLIB from 'roslib';
import robot_img from '../images/robot.png';
// import Joystick from "../components/Joystick";
import Map from "../components/MapDisplay";
import SliderComponent from "../components/SliderComponent";
import '../css/dashboard.css';
import KeyboardControl from "../components/KeyboardControl";

function Dashboard() {
  const location = useLocation();
  const [ros, setRos] = useState(null);
  const [agentListSource, setAgentListSource] = useState(Array.from({ length: 20 }));
  const [selectedAgentIndex, setSelectedAgentIndex] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [rosIP, setRosIP] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [speed, setSpeed] = useState(50);

  // Grab fleets if user is logged in
  useEffect(() => {
    // Check if a JWT token exists in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Verify the token on the server (optional)
        // If token is valid, set isLoggedIn to true
        setIsUserLoggedIn(true);
        console.log(location.state)
        console.log(location.state?.fleet.ipaddress)
        setRosIP(location.state?.fleet.ipaddress);
      }
      // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    // This will log the updated activeAgent value whenever it changes.
    console.log(selectedAgentIndex);
  }, [selectedAgentIndex]);
 
  useEffect(() => {
    if (isUserLoggedIn && rosIP !== undefined)
    {
      // Initialize the ROS connection when the component mounts
      const ros = new ROSLIB.Ros({
        url: `wss://${rosIP}:9090`, // 192.168.254.128 FOR LOCAL
        // url: 'ws://144.126.249.86:9090', // On DigitalOcean
      });

      ros.on('connection', () => {
        console.log('Connected to ROS');
      });

      ros.on('error', (error) => {
        console.error('Error connecting to ROS:', error);
      });

      ros.on('close', () => {
        console.log('Disconnected from ROS');
      });

      setRos(ros);

      // Clean up the ROS connection on unmount
      return () => {
        ros.close();
      };
    }
  // eslint-disable-next-line 
  }, [isUserLoggedIn]);

  if (!ros && (location.state !== null && location.state !== undefined)) {
    // Wait for the ROS connection to be established
    return <div>Loading...</div>;
  }

  const cmdInterpreter =  new ROSLIB.Service({
    ros: ros, // Use the ROS connection from props
    name: '/command_interpreter',
    messageType: 'hive_states/Decider'
  });

  // XYZ not being read when controlled manually 
  const sendCmd = () => {
    if (selectedAgentIndex != null){
      const command = new ROSLIB.ServiceRequest({
        autoType: 2,
        id: selectedAgentIndex,
        command: 2,
        x: 0,
        y: 0,
        z: 0,
      });
      cmdInterpreter.callService(command);
    }
    else{
      console.error("No Agent Selected in teleop");
    }
  }
 

  const fetchMoreAgents = () => {
    if (agentListSource.length < 100) {
      setTimeout(() => {
        setAgentListSource(agentListSource.concat(Array.from({ length: 20 })))
      }, 500);
    } else {
      setHasMore(false);
    }
  }

  const handleControlAgentClick = (index) => {
    console.log("In handleControl")
    if (index === selectedAgentIndex) {
      setSelectedAgentIndex(null);
      sendCmd();
      
    } else {
      setSelectedAgentIndex(index);
      sendCmd();
    }
  }

  return ( location.state !== null && location.state !== undefined ) ? (
    <div className="dashboard">
      <Navbar />
      <h1 className='dashboard-header'>{(location.state?.fleet.name).toUpperCase()} CONSOLE</h1>
      <div className="dashboard-container">
        <div className="dashboard-layout">
          <div className="dashboard-top-flexbox">
            <div className="dashboard-agent">
              <p>Agent</p>
              <div className="dashboard-agent-scroll">
                <InfiniteScroll
                className="dashboard-agent-list"
                dataLength={agentListSource.length}
                next={fetchMoreAgents}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>All Agents Displayed.</p>}
                height={500}
                >
                  {agentListSource.map((item, index) => {
                    return (
                      <div key={index} className={selectedAgentIndex === index ? 'dashboard-agent-active-container' : 'dashboard-agent-inactive-container'}>
                        <div className="dashboard-agent-list-item">
                          <img className="agent-icon" src={robot_img} alt='agent icon'></img>
                        </div>
                        <div className="dashboard-agent-list-item">
                          <div className='dashboard-agent-list-item-info-container'>
                            <div className='dashboard-agent-list-item-info-item'>
                              <span className='agent-title'>Agent {index + 1} <br></br></span>
                              <p className='agent-location'>Location: Back Warehouse</p>
                            </div>
                          </div>
                        </div>
                        <div className="dashboard-agent-list-item">
                          <h1 className='agent-status'>Status: Busy</h1>
                        </div>
                        <div className="dashboard-agent-list-item">
                        <label className={selectedAgentIndex === index ? 'agent-active-toggle' : 'agent-inactive-toggle'}>
                          <input
                            type="checkbox"
                            id={`checkbox-${index}`} // Add an ID for the label to reference
                            checked={selectedAgentIndex === index}
                            onChange={() => handleControlAgentClick(index)}
                          /><span>Control Agent</span>
                        </label>
                        </div>
                      </div>
                    )
                  })}
                </InfiniteScroll>
              </div>
            </div>
            <div className="dashboard-map">
              <p className='container-text'>Map</p>
              <Map ros={ ros } />
              {/* <Test/> */}
            </div>
          </div>

          <div className="dashboard-bottom-flexbox">
            <div className="dashboard-topics">
              <p>Topics</p>
              {/* <InfiniteScroll className="dashboard-agent-list" dataLength={agentListSource.length}>
                {agentListSource.map((item,index)=>{
                  return(
                    <div className="dashboard-agent-list-item">
                      This is a div #{index+1} inside InfiniteScroll
                    </div>
                    )
                })}
              </InfiniteScroll> */}
            </div>
            <div className="dashboard-messages">
              <p>Messages</p>
            </div>
            <div className="dashboard-joystick">
              <p className='container-text'>Teleoperation</p>
              <div className='teleop-container'>
                <SliderComponent setSpeed={setSpeed} />
                <KeyboardControl ros={ ros } agentName={selectedAgentIndex === null ? 'null' : `agent${selectedAgentIndex + 1}`} speed={speed} />
                {/* <Joystick ros={ ros } agentName={selectedAgentIndex === null ? 'null' : `agent${selectedAgentIndex + 1}`} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ):
  (
    <div className="dashboard">
      <Navbar />
      <h1 className='dashboard-header'>No Fleet Active</h1>
      <div className="dashboard-container">
      </div>
    </div>
  )
}

export default Dashboard;
