import '../css/dashboard.css';
import robot_img from '../images/robot.png';
import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from "../components/Navbar";
import Joystick from "../components/Joystick";
import Map from "../components/MapDisplay";

function Dashboard() {
  const [agentListSource, setAgentListSource] = useState(Array.from({ length: 20 }));
  const [activeAgent, setActiveAgent] = useState(null); // State to track the active agent
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // This will log the updated activeAgent value whenever it changes.
    console.log(activeAgent);
  }, [activeAgent]);

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
              <p>Map</p>
              {/* <Map/> */}
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
                <Joystick agentName={`agent${activeAgent + 1}`} />
              </div>
            </div>
          </div>
        </div>{/* dashboard-layout*/}
        
      </div>
      <div className="dashboard-testing">
            <Map/>
      </div>
    </div>
  );
}

// Run npm install roslib

export default Dashboard;
