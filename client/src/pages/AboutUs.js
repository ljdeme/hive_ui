
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
<div className="aboutus-page">
      <Navbar/>
      <header className="App-header">
        <h1> IN ABOUT US </h1>
      </header>
    </div>
  );
}

export default MyFleets;