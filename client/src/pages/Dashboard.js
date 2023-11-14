
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

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ros, setRos] = useState(null);

  const [selectedAgentIndex, setSelectedAgentIndex] = useState(-1);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);

  const [rosIP, setRosIP] = useState();
  
  // eslint-disable-next-line
  const [agentListSource, setAgentListSource] = useState(Array.from({ length: location.state?.fleet.numagents}));
  const [topics, setTopics] = useState([]);

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

        const rosNumAgents = new ROSLIB.Topic({
          ros: ros,
          name: 'numAgents',
          messageTypeType:'std_msgs/Int32'
        });
        
        const setNumAgents = (numAgents) => {
          console.log("Setting num agents: " + numAgents);
          const sendNum = new ROSLIB.Message({
              data: numAgents || 1
          });
      
          rosNumAgents.publish(sendNum);
        }
        setNumAgents(location.state?.fleet.numagents);
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
        const rosNumAgents = new ROSLIB.Topic({
          ros: ros,
          name: 'numAgents',
          messageTypeType:'std_msgs/Int32'
        });
        
        const setNumAgents = (numAgents) => {
          console.log("Setting num agents: " + numAgents);
          const sendNum = new ROSLIB.Message({
              data: numAgents
          });
          rosNumAgents.publish(sendNum);
        }
        console.log('numAgents to 0')
        setNumAgents(0);
        ros.close();
      };
    }
  // eslint-disable-next-line 
  }, [isUserLoggedIn]);

  if (!ros && (location.state !== null && location.state !== undefined)) {
    // Wait for the ROS connection to be established
    return <div>Loading...</div>;
  }

  // Request list of topics
  const topicsClient = new ROSLIB.Service({
    ros,
    name: '/rosapi/topics',
    serviceType: 'rosapi/Topics'
  });
  const request = new ROSLIB.ServiceRequest();
  topicsClient.callService(request, (result) => {
    setTopics(result.topics);
  });

  
  const cmdInterpreter =  new ROSLIB.Topic({
    ros: ros, // Use the ROS connection from props
    name: '/command_interpreter',
    messageType: 'hive_states/Decider'
  });

  // XYZ not being read when controlled manually 
  const sendCmd = () => {
    if (selectedAgentIndex != null){
      const command = new ROSLIB.Message({
        id: selectedAgentIndex,
        command: 2,
        autoType: 0,
        x: 0,
        y: 0,
        orientation: 0,
      });
      cmdInterpreter.publish(command);
    }
    else{
      console.error("No Agent Selected in teleop");
    }
  }

  const handleControlAgentClick = (index) => {
    console.log("In handleControl")
    if (index === selectedAgentIndex) {
      setSelectedAgentIndex(-1);
      sendCmd();
      
    } else {
      setSelectedAgentIndex(index);
      sendCmd();
    }
  }

  const handleEchoTopicClick = (index) => {
    console.log("In handleControl")
    if (index === selectedTopicIndex) {
      setSelectedTopicIndex(null);
      console.log('Unselected: ' + topics[index]);
      // ECHO
      
    } else {
      setSelectedTopicIndex(index);
      console.log('Selected: ' + topics[index]);
      // ECHO
    }
  }

  return ( location.state !== null && location.state !== undefined ) ? (
    <div className="dashboard">
      <Navbar />
      <h1 className='dashboard-header'>{(location.state?.fleet.name).toUpperCase()} CONSOLE ({location.state?.fleet.issim})</h1>
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
              <Map ros={ ros } numagents={location.state.fleet?.numagents} colors={location.state?.colors} isSim={location.state?.fleet.issim} selectedAgent={selectedAgentIndex + 1} />
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
