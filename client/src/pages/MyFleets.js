
import '../css/myFleets.css';
import React, { useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from "../components/Navbar";

function MyFleets() {
  const [fleetListSource, setFleetListSource] = useState(Array.from({length:20}));
  // const [topicListSource, setTopicListSource] = useState(Array.from({length:20}));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreFleets=()=>{
    // *TEMP (mimics API call)
    if (fleetListSource.length < 100){
      setTimeout(()=>{
        setFleetListSource(fleetListSource.concat(Array.from({length:20})))
      },500);
    }else{
      setHasMore(false);
    }
  }

  return (
    <div className='myFleets'>
      <Navbar/>
      <h1 className='fleets-header'>Fleets</h1>
      <div className='myFleets-container'>
        <div className='myFleets-layout'>
          <div className="fleet-scroll">
            <InfiniteScroll 
              className="fleet-list"
              dataLength={fleetListSource.length}
              next={fetchMoreFleets}
              hasMore={hasMore}
              loader={<p>Loading...</p>}
              endMessage={<p>All Agents Displayed.</p>}
              height={800}
            >
              {fleetListSource.map((item,index)=>{
                return(
                  <div className="fleet-list-container">
                    <div className="fleet-list-item">
                      <p className='fleet-title'>Fleet {index+1}</p>
                    </div>
                    <div className="fleet-list-item">
                      <div className="spacer"></div>
                    </div>
                    <div className="fleet-list-item">
                      <p>[Toggle Switch]</p>
                    </div>
                  </div>
                  )
              })}
            </InfiniteScroll>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MyFleets;