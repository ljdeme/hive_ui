import logo from '../images/hex.png';
import git from '../images/github.png';
import '../App.css';
function InProgress() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> H I V E </h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <span>Welcome to Hive: The Grounded Swarm <br></br></span>
          <span>Loading Components...</span>
        </p>
        <a
          className="git-link"
          href="https://github.com/marc4813/HIVE.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={git} alt="logo" />
        </a>
      </header>
    </div>
  );
}

export default InProgress;