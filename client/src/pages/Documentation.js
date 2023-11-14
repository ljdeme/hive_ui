import '../css/documentation.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Documentation() {
  return (
    
    <div className="documentation">
      <Navbar/>
      <div className='documentation-page'>
        <div className='documentation-container'>
          <h1>Getting Started</h1>
          <h2>How Create a Fleet:</h2>
            <ul>
              <li>*Note: You must use websocketsecure (wss) for fleet connections</li>
              <li>Select the add fleet button on fleets page</li>
              <li>Enter the needed fleet information</li>
            </ul>
            <h2>How to Control a Fleet:</h2>
            <h3>Auto-nav:</h3>
              <p></p>
            <h3>Map:</h3>
              <p>Send commands to a selected agent using the map display.</p>
              <ul>
                <li>Select an agent to control</li>
                <li>Send agent movement commands by clicking on the map display canvas</li>
              </ul>
            <h3>Manual:</h3>
              <p>Teleoperate a selected agent from the dashboard.</p>
              <ul>
                <li>Select an agent to control</li>
                <li>Use keyboard input to move the agent:</li>
                  <ul>
                    <li>W - Forward</li>
                    <li>S - Backward</li>
                    <li>A - Strafe Left</li>
                    <li>D - Strafe Right</li>
                    <li>Q - Strafe Left</li>
                    <li>E - Turn Right</li>
                    <li>Spacebar - Toggle Agent Attachment (default is locked)</li>
                  </ul>
                <li>Use the slider to change agent movement speed</li>
            </ul>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Documentation;