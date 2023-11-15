import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from "../components/Navbar";
import ROSLIB from 'roslib';
import robot_img from '../images/robot.png';
// import Joystick from "../components/Joystick";
import Map from "../components/MapDisplay";
import SliderComponent from "../components/SliderComponent";
import '../css/dashboard.css';
import KeyboardControl from "../components/KeyboardControl";
import Popup from "../components/Popup";
import logo from '../images/hex.png';

function FleetDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);

  const [selectedAgentIndex, setSelectedAgentIndex] = useState(-1);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
  const [rosIP, setRosIP] = useState();
  
  // eslint-disable-next-line
  const [agentListSource, setAgentListSource] = useState(Array.from({ length: location.state?.fleet.numagents}));
  const [topics, setTopics] = useState([]);
  const [topicTypes, setTopicTypes] = useState([]);
  const [rosTopicData, setRosTopicData] = useState([]);
  

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [speed, setSpeed] = useState(50);

  // ROS Connection Alert
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
        setLoading(false);
      });

      ros.on('error', (error) => {
        console.error('Error connecting to ROS:', error);
        setError('Failed to connect to ROS. Please try again.');
        setLoading(false);
      });

      ros.on('close', () => {
        console.log('Disconnected from ROS');
        setError('Disconnected from ROS. Please try again.');
        setLoading(false);
      });

      setRos(ros);

      // Clean up the ROS connection on unmount
      return () => {
        const rosNumAgents = new ROSLIB.Param({
          ros,
          name: 'numAgents'
        });

        console.log('numAgents to 0')
        rosNumAgents.set(0);
        // agentStatusListener.unsubscribe();
        ros.close();
      };
    }
  // eslint-disable-next-line 
  }, [isUserLoggedIn]);

  if (!ros && (location.state !== null && location.state !== undefined)) {
    // Wait for the ROS connection to be established
    return <div>Loading...</div>;
  }

  const rosNumAgents = new ROSLIB.Param({
    ros: ros,
    name: 'numAgents'
  });
  rosNumAgents.set(location.state?.fleet.numagents || 1);

  // Request list of topics
  const topicsClient = new ROSLIB.Service({
    ros,
    name: '/rosapi/topics',
    serviceType: 'rosapi/Topics'
  });
  const request = new ROSLIB.ServiceRequest();
  topicsClient.callService(request, (result) => {
    setTopics(result.topics);
    setTopicTypes(result.types);
  });
  


  const handleControlAgentClick = (index) => {
    console.log("In handleControl")
    if (index === selectedAgentIndex) {
      setSelectedAgentIndex(null);
    } else {
      setSelectedAgentIndex(index);
    }
  }

  const handleEchoTopicClick = (index) => {
    console.log("In handleControl")
    if (index === selectedTopicIndex) {
      setSelectedTopicIndex(null);
      console.log('Unselected: ' + topics[index]);

      const prevTopicListener = new ROSLIB.Topic({
        ros,
        name: `${topics[selectedTopicIndex]}`,
        messageType: `${topicTypes[selectedTopicIndex]}`,
      });
  
      prevTopicListener.unsubscribe();
    } else {
      const prevTopicListener = new ROSLIB.Topic({
        ros,
        name: `${topics[selectedTopicIndex]}`,
        messageType: `${topicTypes[selectedTopicIndex]}`,
      });
  
      prevTopicListener.unsubscribe();
    }
      setSelectedTopicIndex(index);
      console.log('Selected: ' + topics[index]);
      
      const newTopicListener = new ROSLIB.Topic({
        ros,
        name: `${topics[selectedTopicIndex]}`,
        messageType: `${topicTypes[selectedTopicIndex]}`,
      });
    
      newTopicListener.subscribe(
        function (message) {
          console.log(`Listening to ${topics[selectedTopicIndex]}`);
          console.log('Received message:', message);
          setRosTopicData((prevData) => [...prevData, message.data]);
        },
        function (error) {
          console.error('Error subscribing to topic:', error);
        }
      );
  }

  const handleClearData = () => {
    setRosTopicData([]);
    console.log('Clear Data');
  };

  return (
    <div className="dashboard">
      <h1 className='dashboard-header'>{(location.state?.fleet.name).toUpperCase()} CONSOLE</h1>
      <div className="dashboard-container">
        <div className="dashboard-layout">
        <div className="connection-alert">
           <Popup trigger={loading}>
           <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Connecting...
            </p>
            <button className="cancel" onClick={() => {
                navigate("/myFleets");
              }}>Cancel </button>
          </Popup>
          <Popup trigger={error !== null}>
            <div className="error-popup">
              <p>{error}</p>
              <div className="loading-options">
                <button className="cancel" onClick={() => {
                  navigate("/myFleets");
                }}>Cancel </button>
                <button className="try-again" onClick={() => {
                  setLoading(true);
                  setError(null);
                }}>Try Again</button>
              </div>
            </div>
          </Popup>
          </div>
          <div className="dashboard-top-flexbox">
            <div className="dashboard-agent">
              <p>Agent</p>
              <div className="dashboard-agent-scroll">
                <InfiniteScroll
                className="dashboard-agent-list"
                dataLength={agentListSource.length}
                loader={<p>Loading...</p>}
                endMessage={<p>All Agents Displayed.</p>}
                height={500}
                >
                  {agentListSource.map((item, agentIndex) => {
                    return (
                      <div key={agentIndex} className={selectedAgentIndex === agentIndex ? 'dashboard-agent-active-container' : 'dashboard-agent-inactive-container'}>
                        <div className="dashboard-agent-list-item">
                        <img className="agent-icon" src={robot_img} alt='agent icon' style={{ backgroundColor: location.state.colors[agentIndex]}}></img>
                        </div>
                        <div className="dashboard-agent-list-item">
                          <div className='dashboard-agent-list-item-info-container'>
                            <div className='dashboard-agent-list-item-info-item'>
                              <span className='agent-title'>Agent {agentIndex + 1} <br></br></span>
                            </div>
                          </div>
                        </div>
                        <div className="dashboard-agent-list-item">
                        <label className={selectedAgentIndex === agentIndex ? 'active-toggle' : 'inactive-toggle'}>
                          <input
                            type="checkbox"
                            id={`checkbox-${agentIndex}`} // Add an ID for the label to reference
                            checked={selectedAgentIndex === agentIndex}
                            onChange={() => handleControlAgentClick(agentIndex)}
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
              <Map ros={ ros } numagents={location.state.fleet?.numagents} colors={location.state?.colors} isSim={location.state?.fleet.issim} selectedAgent={selectedAgentIndex == null? -1 : selectedAgentIndex + 1} />
              {/* <Test/> */}
            </div>
          </div>

          <div className="dashboard-bottom-flexbox">
            <div className="dashboard-topics">
              <p>Topics</p>
              <InfiniteScroll className="dashboard-topic-list"
                dataLength={topics.length}
                loader={<p>Loading...</p>}
                endMessage={<p>All Topics Displayed.</p>}
                height={250}>
                {topics.map((item,topicIndex)=>{
                  return(
                    <div key={topicIndex} className={selectedTopicIndex === topicIndex ? 'dashboard-topic-active-container' : 'dashboard-topic-inactive-container'}>
                    <div className="dashboard-agent-list-item">
                      {item}
                    </div>
                    <div className="dashboard-topic-list-item">
                    <label className={selectedTopicIndex === topicIndex ? 'active-toggle' : 'inactive-toggle'}>
                      <input
                        type="checkbox"
                        id={`checkbox-${topicIndex}`} // Add an ID for the label to reference
                        checked={selectedTopicIndex === topicIndex}
                        onChange={() => handleEchoTopicClick(topicIndex)}
                      /><span>Echo Topic</span>
                    </label>
                    </div>
                  </div>
                    )
                })}
              </InfiniteScroll>
            </div>
            <div className="dashboard-messages">
              <div className="messages-header">
                <p>Messages</p>
                <button className='clear' onClick={handleClearData}>Clear Data</button>
              </div>
              <InfiniteScroll className="dashboard-topic-list"
                dataLength={rosTopicData.length}
                loader={<p>Loading...</p>}
                endMessage={<p>All Messages Displayed.</p>}
                height={250}>
                {rosTopicData.map((message, index) => (
                  <p key={index}>{message}</p>
                ))}
              </InfiniteScroll>
            </div>
            <div className="dashboard-joystick">
              <p className='container-text'>Teleoperation</p>
              <div className='teleop-container'>
                <SliderComponent setSpeed={setSpeed} />
                <KeyboardControl ros={ ros } agentID={selectedAgentIndex + 1} agentName={selectedAgentIndex === null ? 'null' : `agent${selectedAgentIndex + 1}`} speed={speed} />
                {/* <Joystick ros={ ros } agentName={selectedAgentIndex === null ? 'null' : `agent${selectedAgentIndex + 1}`} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FleetDashboard;