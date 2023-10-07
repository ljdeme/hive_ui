
import '../css/myFleets.css';
import React, { useState, useEffect} from "react";
import { useLocation, useNavigate} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from "../components/Navbar";
import ToggleSwitch from "../components/ToggleSwitch";
import AddFleetModal from "../components/addFleet";

function MyFleets() {
  const location = useLocation();
  const navigate = useNavigate();

  const [fleetListSource, setFleetListSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);


  // Grab fleets if user is logged in
  useEffect(() => {
    // Check if a JWT token exists in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Verify the token on the server (optional)
        // If token is valid, set isLoggedIn to true
        setIsUserLoggedIn(true);
        setUserID(location.state.id);
      }
  }, []);

  useEffect(() => {
      if (isUserLoggedIn) {
        getUserFleets(userID);
      }
  }, [isUserLoggedIn]);
  
  const handleSwitchToggle = (item) => {
    // Navigate to the dashboard route when the switch is toggled on
    navigate("/dashboard", {state:{fleet:item}});
  };

  const getUserFleets=()=>{
    fetch(`/api/fleets?userid=${userID}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log(response);
      if (!response.ok){
        return response.json().then((data) => {
          console.error(data.error); // Log the error message
        });
      }
      else{
        return response.json().then((data) => {
          console.log(data);
          setFleetListSource(data);
        });
      }
    });
  }


  return (
    <div className='myFleets-page'>
      <Navbar/>
      <div className='myFleets-content'>
        <div className='fleets-header'>
          <h1>Fleets</h1>
          <button className='add-fleet'>+ Add Fleet</button>
        </div>
        <div className='myFleets-container'>
          <div className='myFleets-layout'>      
            
            {fleetListSource.length > 0 ? (
                fleetListSource.map((item, index) => {
                  return (
                    <div className="fleet-scroll">
                      <div className="fleet-list-container" key={item._id}>
                        <div className="fleet-list-item">
                          <h2 className='fleet-title'>{item.name}</h2>
                        </div>
                        <div className="fleet-list-item">
                          <div className="spacer"></div>
                        </div>
                        <div className="fleet-list-item">
                          <ToggleSwitch onToggle={() => handleSwitchToggle(item)}/>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <h1 className='no-fleets'>No Fleets To Display</h1>
              )}
              
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyFleets;