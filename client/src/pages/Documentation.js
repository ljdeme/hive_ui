import '../css/documentation.css';
import select_agent from "../images/select_agent.png";
import teleop from "../images/teleoperation.png";
import addFleet from "../images/addfleet.png";
import fleetInfo from "../images/fleetinfo.png";
function Documentation() {
  return (
    <div className="documentation">
      <div className='documentation-page'>
        <div className='documentation-container'>
          <h1>Getting Started</h1>
          <h2>How Create a Fleet:</h2>
            <ul>
              <li>NOTE: You must use websocketsecure (wss) for fleet connections</li>
              <li>Select the add fleet button on fleets page</li>
              <img src={addFleet} alt='addFleet button' height={'200px'}/>

              <li>Enter the requested fleet information</li>
              <img src={fleetInfo} alt='Fleet Info' height={'300px'}/>
            </ul>
            <h2>How to Control a Fleet:</h2>
            <h3>Auto-nav:</h3>
              <p>Send commands to a selected agent using the map display.</p>
              <ul>
                <li>Select an agent to control</li>
                <img src={select_agent} alt='select agents' height={'300px'}/>
                <li>Send agent movement commands by clicking on the map display canvas</li>
              </ul>
            <h3>Manual:</h3>
              <p>Teleoperate a selected agent from the dashboard.</p>
              <ul>
                <li>Select an agent to control</li>
                <img src={select_agent} alt='select agents' height={'300px'}/>
                <li>Use keyboard input to move the agent:</li>
                  <ul>
                    <li>W - Forward</li>
                    <li>S - Backward</li>
                    <li>A - Strafe Left</li>
                    <li>D - Strafe Right</li>
                    <li>Q - Strafe Left</li>
                    <li>E - Turn Right</li>
                    <li>Left Shift - Toggle Agent Attachment (default is locked)</li>
                  </ul>
                <li>Use the slider to change agent movement speed</li>
                <img src={teleop} alt='teleoperation control' height={'300px'}/>
            </ul>
        </div>
      </div>
    </div>
  );
}

export default Documentation;