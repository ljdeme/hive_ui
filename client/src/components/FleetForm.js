import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function FleetForm({ initialValues, formErrors, handleChange, handleSubmit, handleClose, buttonText }) {
  return (
<div>
        <div className="form-page">
        <form className='form-container'>
            <div className='form-container-half'>
            <label>Fleet Name:
                <input
                type="text"
                name="fleetName"
                placeholder="Name"
                value={initialValues.fleetName}
                onChange={handleChange}
                />
                <p className="error">{formErrors.fleetName}</p>
            </label>
            <label>Fleet IP:
                <input
                type="text"
                name="fleetIP"
                placeholder="IP Address (ex. x.x.x.x)"
                value={initialValues.fleetIP}
                onChange={handleChange}
                />
                <p className="error">{formErrors.fleetIP}</p>
            </label>
            </div>
            <div className='form-container-half'>
            <div className='additional-info'>
                <label className='numAgents'>Number of Agents:
                <input
                    type="text"
                    name="numAgents"
                    placeholder="1-10 (Limit 10)"
                    value={initialValues.numAgents}
                    onChange={handleChange}
                />
                <p className="error">{formErrors.numAgents}</p>
                </label>
                <label>
                <input
                    className='isSimBox'
                    type="checkbox"
                    name="isSim"
                    checked={initialValues.isSim}
                    onChange={(e) => handleChange({ target: { name: 'isSim', value: e.target.checked } })}
                />
                 Is Simulation:</label>
            </div>
            </div>
        </form>
        </div>
        <div className='addFleet-btns'>
            <button className='close-btn' onClick={handleClose}>Close</button>
            <button className='save-btn' onClick={handleSubmit}>Save</button>
        </div>
    </div>
  );
}

export default FleetForm;