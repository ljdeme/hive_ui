import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ToggleSwitch from "../components/ToggleSwitch";
import InfiniteScroll from 'react-infinite-scroll-component';
import Popup from "../components/Popup";
import "../css/myFleets.css";
import "../css/addFleet.css";

function MyFleets() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  const [showAddFleet, setShowAddFleet] = useState(false);
  const [fleetListSource, setFleetListSource] = useState([]);
  const [fleetListChanged, setFleetListChanged] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Grab fleets if user is logged in
  useEffect(() => {
    // Check if a JWT token exists in localStorage
    const token = localStorage.getItem('token');
    const userID = sessionStorage.getItem('UID');
    if (token) {
      // Verify the token on the server (optional)
      // If token is valid, set isLoggedIn to true
      setIsUserLoggedIn(true);
      setUserID(userID);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitchToggle = (item) => {
    // Navigate to the dashboard route when the switch is toggled on
    navigate("/dashboard", { state: { fleet: item } });
  };

  
  const getUserFleets = (newPage) => {
    console.log("Getting page " + newPage);
    fetch(`/api/fleets?userid=${userID}&page=${newPage}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            console.error(data.error);
            setHasMore(false);
          });
        } else {
          return response.json().then((data) => {
            if (newPage === 1) {
              setFleetListSource(data); // Reset the list if it's the first page
            } else {
              setFleetListSource([...fleetListSource, ...data]); // Append data to the existing list
            }
            setPage(newPage);
          });
        }
      });
  };

  useEffect(() => {
    if (isUserLoggedIn || fleetListChanged)
    {
      getUserFleets(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, fleetListChanged]);

  // ========================================= ADD FLEET =========================================
  const initialValues = {
    fleetName: "",
    fleetIP: "",
    workspaceX: "",
    workspaceY: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0) {
      setShowAddFleet(false);
      handleAddFleet(formValues);
      resetForm(); // Reset the form values
      console.log(formValues);
    }
  };
  
  const handleClose = (e) => {
    e.preventDefault();
    console.log(formValues);
    setShowAddFleet(false);
    resetForm(); // Reset the form values
    console.log(formValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setShowAddFleet(false);
      handleAddFleet(formValues);
      console.log(formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, formValues, isSubmit]);

  // Input Validation
  const validate = (values) => {
    const errors = {};
    if (values.fleetName === "") {
      errors.fleetName = "*Fleet Name is blank";
    }
    if (values.fleetIP === "") {
      errors.fleetIP = "*Fleet IP is blank";
    }
    if (values.workspaceX === "") {
      errors.workspaceX = "*X area is blank";
    }
    if (values.workspaceY === "") {
      errors.workspaceY = "*Y area is blank";
    }
    return errors;
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setFormErrors({});
    setIsSubmit(false);
  };

  const handleAddFleet = (values) => {
    console.log(userID + ", " + values.fleetName + ", " + values.fleetIP);
    fetch('/api/fleets', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: userID,
        name: values.fleetName,
        ipaddress: values.fleetIP,
      }),
    })
      .then((data) => {
        console.log(data);
        // Update the fleet list when a new fleet is added
        getUserFleets(1); // Fetch the first page of fleets
        setFleetListChanged(true);
      })
      .catch((error) => console.error(error));
    setIsSubmit(false);
  };

  return (
    <div className='myFleets-page'>
      <Navbar />
      <div className='myFleets-content'>
        <div className='fleets-header'>
          <h1>Fleets</h1>
          <button className='add-fleet' onClick={() => setShowAddFleet(true)}>+ Add Fleet</button>
          <Popup trigger={showAddFleet}>
            <div className="popup-page">
              <p className="form-title">Add a Fleet</p>
              <div className="form-page">
                <form className='form-container'>
                  <div className='form-container-half'>
                    <label className="form-header">Fleet Information:</label>
                    <label>Fleet Name:
                      <input
                        type="text"
                        name="fleetName"
                        placeholder="Name"
                        value={formValues.fleetName}
                        onChange={handleChange}
                      />
                      <p className="error">{formErrors.fleetName}</p>
                    </label>
                    <label>Fleet IP:
                      <input
                        type="text"
                        name="fleetIP"
                        placeholder="IP Address (ex. x.x.x.x)"
                        value={formValues.fleetIP}
                        onChange={handleChange}
                      />
                      <p className="error">{formErrors.fleetIP}</p>
                    </label>
                  </div>
                  <div className='form-container-half'>
                    <div className='Workspace-area'>
                      <label className="form-header">Estimated 2D Workspace Area:</label>
                      <label>X:
                        <input
                          type="text"
                          name="workspaceX"
                          placeholder="X"
                          value={formValues.workspaceX}
                          onChange={handleChange}
                        />
                        <p className="error">{formErrors.workspaceX}</p>
                      </label>
                      <label>Y:
                        <input
                          type="text"
                          name="workspaceY"
                          placeholder="Y"
                          value={formValues.workspaceY}
                          onChange={handleChange}
                        />
                        <p className="error">{formErrors.workspaceY}</p>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='addFleet-btns'>
              <button className='close-btn' onClick={handleClose}>Close</button>
              <button className='save-btn' onClick={handleSubmit}>Save</button>
            </div>
          </Popup>
        </div>
        <div className='myFleets-container'>
          <div className='myFleets-layout'>
            {fleetListSource.length > 0 ? (
              <InfiniteScroll
                className="fleet-list"
                dataLength={fleetListSource.length}
                next={()=>getUserFleets(page + 1)}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>All Agents Displayed.</p>}
                height={800}
              >
               {fleetListSource.map((item, index) => (
                <div className="fleet-list-container" key={item._id}>
                      <div className="fleet-list-item">
                        <h2 className='fleet-title'>{item.name}</h2>
                      </div>
                      <div className="fleet-list-item">
                        <div className="spacer"></div>
                      </div>
                      <div className="fleet-list-item">
                        <ToggleSwitch onToggle={() => handleSwitchToggle(item)} />
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
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