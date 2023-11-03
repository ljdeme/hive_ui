import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ToggleSwitch from "../components/ToggleSwitch";
import InfiniteScroll from 'react-infinite-scroll-component';
import Popup from "../components/Popup";
import "../css/myFleets.css";
import FleetForm from "../components/FleetForm";  
import "../css/addFleet.css";
import edit from '../images/edit.png';
import deleteBin from '../images/delete.png';

function MyFleets() {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);

  // Loading Agents
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
      // Verify the token on the server
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
            setFleetListChanged(false);
          });
        } else {
          return response.json().then((data) => {
            if (newPage === 1) {
              console.log("in newPage === 1")
              setFleetListSource(data); // Reset the list if it's the first page
            } else {
              setFleetListSource([...fleetListSource, ...data]); // Append data to the existing list
            }
            setPage(newPage + 1);
          });
        }
      });
  };

  useEffect(() => {
    if (isUserLoggedIn || fleetListChanged)
    {
      getUserFleets(page);
      setFleetListChanged(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, fleetListChanged]);

  // ========================================= ADD, EDIT, DELETE FLEET =========================================
  const initialValues = {
    fleetID:"",
    fleetName: "",
    fleetIP: "",
    workspaceX: "",
    workspaceY: "",
  };

  const [fleetFormValues, setFleetFormValues] = useState(initialValues);
  const [fleetFormErrors, setFleetFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // Fleet Additions and Modifications
  const [showFleetForm, setShowFleetForm] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isEditingFleet, setIsEditingFleet] = useState(false);
  const [showAddFleet, setShowAddFleet] = useState(false);
  const [showEditFleet, setShowEditFleet] = useState(false);
  const [fleetToDelete, setFleetToDelete] = useState('');

  const handleFleetFormChange = (e) => {
    const { name, value } = e.target;
    setFleetFormValues({ ...fleetFormValues, [name]: value });
  };

  const handleFleetFormSubmit = (e) => {
    e.preventDefault();
    setFleetFormErrors(validate(fleetFormValues));
    setIsSubmit(true);
    if (Object.keys(fleetFormErrors).length === 0) {
      setShowFleetForm(false);
      if (showAddFleet) 
      {
        handleAddFleet(fleetFormValues);
      } 
      else if (showEditFleet) 
      {
        handleEditFleet(fleetFormValues);
      }
      console.log(fleetFormValues);
      resetFleetForm();
    }
  };

  const handleFleetFormClose = (e) => {
    e.preventDefault();
    console.log(fleetFormValues);
    if (showAddFleet) 
    {
      setShowAddFleet(false);
    } 

    if (showEditFleet) 
    {
      setShowEditFleet(false);
    }

    setShowFleetForm(false);
    resetFleetForm();
  };


  useEffect(() => {
    if (Object.keys(fleetFormErrors).length === 0 && isSubmit) {
      setShowFleetForm(false);
      if (showAddFleet) {
        handleAddFleet(fleetFormValues);
      } else if (showEditFleet) {
        handleEditFleet(fleetFormValues);
        
      }
      console.log(fleetFormValues);
    }

    // eslint-disable-next-line
  }, [fleetFormErrors, fleetFormValues, isSubmit]);

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

  const resetFleetForm = () => {
    setFleetFormValues(initialValues);
    setFleetFormErrors({});
    setIsSubmit(false);
  };

  const editFleet = (fleet) => {
    setIsEditingFleet(true);
    setFleetFormValues({
      fleetID: fleet._id,
      fleetName: fleet.name,
      fleetIP: fleet.ipaddress,
    });
    setShowFleetForm(true);
    setShowEditFleet(true);
  };

  

  const handleDeleteConfirmation = () => {
    if (fleetToDelete) {
      console.log("Deleting: " + fleetToDelete)
      handleDeleteFleet(fleetToDelete);
      setFleetToDelete(null);
      setShowDeleteAlert(false);
    }
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
    setShowAddFleet(false);
  };

  const handleEditFleet = (values) => {
    console.log(values._id + ", " + values.fleetName + ", " + values.fleetIP);
    fetch('/api/fleets', {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fleetid: values.fleetID,
        name_new: values.fleetName,
        ipaddress_new: values.fleetIP,
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

  const handleDeleteFleet = (item) => {
    console.log(item.fleetID + ", " + item.name);
    fetch('/api/fleets', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item._id,
        name: item.name,
      }),
    })
      .then((data) => {
        console.log(data);
        // Update the fleet list when a fleet is deleted
        getUserFleets(1); // Fetch the first page of fleets
        setFleetToDelete(null); // Reset the deletion state
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
          <button className="add-fleet" 
            onClick={() => {
              setIsEditingFleet(false);
              setShowFleetForm(true);
              setShowAddFleet(true);
            } 
          }>
           + Add Fleet
          </button>
          <Popup trigger={showFleetForm}>
            <div className="popup-page">
              <p className="form-title">
                {isEditingFleet ? 'Edit Fleet' : 'Add a Fleet'}
              </p>
              <FleetForm
                initialValues={fleetFormValues}
                formErrors={fleetFormErrors}
                handleChange={handleFleetFormChange}
                handleSubmit={handleFleetFormSubmit}
                handleClose={handleFleetFormClose}
                buttonText={isEditingFleet ? 'Save Changes' : 'Add Fleet'}
              />
            </div>
          </Popup>
        </div>
        <div className='myFleets-container'>
          <div className='myFleets-layout'>
            {fleetListSource.length > 0 ? (
              <InfiniteScroll
                className="fleet-list"
                dataLength={fleetListSource.length}
                next={()=>getUserFleets(page)}
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
                      <div className="fleet-list-item">
                        <img className='fleetModImg' src={edit} alt='settings gear img' onClick={() => {
                            editFleet(item)
                          }}
                        />
                        <Popup trigger={showFleetForm}>
                          <div className="popup-page">
                            <p className="form-title">
                              {isEditingFleet ? 'Edit Fleet' : 'Add a Fleet'}
                            </p>
                            <FleetForm
                              initialValues={fleetFormValues}
                              formErrors={fleetFormErrors}
                              handleChange={handleFleetFormChange}
                              handleSubmit={handleFleetFormSubmit}
                              handleClose={handleFleetFormClose}
                              buttonText={isEditingFleet ? 'Save Changes' : 'Add Fleet'}
                            />
                          </div>
                        </Popup>
                      </div>
                      <div className="fleet-list-item">
                        <img className='fleetModImg' src={deleteBin} alt='settings gear img' onClick={() => {
                            console.log(item)
                            setFleetToDelete(item);
                            setShowDeleteAlert(true);
                          }}
                        />
                        <Popup trigger={showDeleteAlert}>
                          <div className="popup-page">
                            <h1 className="form-title">
                              Delete Fleet
                            </h1>
                            <h3>Are you sure you want to delete "{fleetToDelete && fleetToDelete.name}" ?</h3>
                            <div className='addFleet-btns'>
                              <button className='close-btn' onClick={() => setShowDeleteAlert(false)}>Cancel</button>
                              <button className='save-btn' onClick={handleDeleteConfirmation}>Confirm</button>
                            </div>
                          </div>
                        </Popup>
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