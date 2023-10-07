import '../css/dashboard.css';
import robot_img from '../images/robot.png';
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from "../components/Navbar";
import Joystick from "../components/Joystick";
import Map from "../components/MapDisplay";
import ROSLIB from 'roslib';

function Dashboard() {
  const location = useLocation();
  const [ros, setRos] = useState(null);
  const [agentListSource, setAgentListSource] = useState(Array.from({ length: 20 }));
  const [activeAgent, setActiveAgent] = useState(null); // State to track the active agent
  const [hasMore, setHasMore] = useState(true);
  const [rosIP, setRosIP] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Grab fleets if user is logged in
  useEffect(() => {
    // Check if a JWT token exists in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Verify the token on the server (optional)
        // If token is valid, set isLoggedIn to true
        setIsUserLoggedIn(true);
        console.log(location.state.fleet.ipaddress)
        setRosIP(location.state.fleet.ipaddress);
      }
  }, []);

  useEffect(() => {
    // This will log the updated activeAgent value whenever it changes.
    console.log(activeAgent);
  
  }, [activeAgent]);

  useEffect(() => {
    if (isUserLoggedIn)
    {
      // Initialize the ROS connection when the component mounts
      const ros = new ROSLIB.Ros({
        url: `ws://${rosIP}:9090`, // 192.168.254.128 FOR LOCAL
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
  }, [isUserLoggedIn]);

  if (!ros) {
    // Wait for the ROS connection to be established
    return <div>Loading...</div>;
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

  // Function to handle the "Control Agent" button click
  const handleControlAgentClick = (index) => {
    setActiveAgent(index); // Set the clicked agent as active
  }

  return (
    <div className="dashboard">
      <Navbar />
      <h1 className='dashboard-header'>[Fleet Name] Console</h1>
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
                      <div className="dashboard-agent-list-container" key={index}>
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
                          <button
                            className={activeAgent === index ? 'agent-active-button' : 'agent-inactive-button'}
                            onClick={() => handleControlAgentClick(index)}
                          >
                            Control Agent
                          </button>
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
              <p className='container-text'>Joystick</p>
              <div className='joystick-container'>
                <Joystick ros={ ros } agentName={`agent${activeAgent + 1}`} />
                {/* <Joystick agentName={`agent${activeAgent + 1}`} /> */}
              </div>
            </div>
          </div>
        </div>{/* dashboard-layout*/}
        
      </div>
      {/* <div className="dashboard-testing">
        <Map ros={ ros } />
      </div> */}
    </div>
  );
}

export default Dashboard;
