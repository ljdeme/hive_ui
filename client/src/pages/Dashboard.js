import '../css/dashboard.css';
import robot_img from '../images/robot.png';
import React, { useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import SendMessage from "./SendMessage";


function Dashboard() {
  
  const [agentListSource, setAgentListSource] = useState(Array.from({length:20}));
  // const [topicListSource, setTopicListSource] = useState(Array.from({length:20}));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreAgents=()=>{
    // *TEMP (mimics API call)
    if (agentListSource.length < 100){
      setTimeout(()=>{
        setAgentListSource(agentListSource.concat(Array.from({length:20})))
      },500);
    }else{
      setHasMore(false);
    }
  }

  return (
    
    <div className="dashboard">
      
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
                    {agentListSource.map((item,index)=>{
                      return(
                        <div className="dashboard-agent-list-container">
                          <div className="dashboard-agent-list-item">
                            <img className="agent-icon" src={robot_img} alt='agent icon'></img>
                          </div>
                          <div className="dashboard-agent-list-item">
                            <div className='dashboard-agent-list-item-info-container'>
                              <div className='dashboard-agent-list-item-info-item'>
                                <p className='agent-title'>Agent {index+1}</p>
                              </div>
                              {/* <div className='dashboard-agent-list-item-info-item'>
                                <p className='agent-location'>Location: Back Warehouse</p>
                              </div> */}
                            </div>
                          </div>
                          <div className="dashboard-agent-list-item">
                            <h1 className='agent-status'>Status: Busy</h1>
                          </div>
                        </div>
                        )
                    })}
                  </InfiniteScroll>
                </div>
            </div>
            <div className="dashboard-map">
                <p>Map</p>
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
            <div className="dashboard-extra">
              <p>EXTRA</p>
            </div>

          </div> 

        </div>{/* dashboard-layout*/}
      </div>
      <SendMessage/>
    </div>
  );
}
// Run npm install roslib

export default Dashboard;