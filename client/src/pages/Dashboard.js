import '../css/dashboard.css';

function Dashboard() {
  return (
    
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-layout">

          <div className="dashboard-top-flexbox">
            <div className="dashboard-agent-list-item">
                <p>Agent</p>
            </div>
            <div className="dashboard-map-item">
                <p>Map</p>
            </div>
          </div>

          <div className="dashboard-bottom-flexbox">
            <div className="dashboard-topics-item">
              <p>Topics</p>
            </div>
            <div className="dashboard-messages-item">
              <p>Messages</p>
            </div>
            <div className="dashboard-extra-item">
              <p>EXTRA</p>
            </div>

          </div> 

        </div>{/* dashboard-layout*/}
      </div>
    </div>
  );
}

export default Dashboard;