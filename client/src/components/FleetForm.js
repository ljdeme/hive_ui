import React from 'react';

function FleetForm({ initialValues, formErrors, handleChange, handleSubmit, handleClose, buttonText }) {
  return (
<div>
        <div className="form-page">
        <form className='form-container'>
            <div className='form-container-half'>
            <label className="form-header">Fleet Information:</label>
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
            <div className='Workspace-area'>
                <label className="form-header">Estimated 2D Workspace Area:</label>
                <label>X:
                <input
                    type="text"
                    name="workspaceX"
                    placeholder="X"
                    value={initialValues.workspaceX}
                    onChange={handleChange}
                />
                <p className="error">{formErrors.workspaceX}</p>
                </label>
                <label>Y:
                <input
                    type="text"
                    name="workspaceY"
                    placeholder="Y"
                    value={initialValues.workspaceY}
                    onChange={handleChange}
                />
                <p className="error">{formErrors.workspaceY}</p>
                </label>
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