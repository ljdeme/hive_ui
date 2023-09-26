// rosManager.js
import ROSLIB from 'roslib';

class ROSConnection {
  constructor() {
    this.ros = new ROSLIB.Ros();
    this.isConnected = false;

    this.connect = () => {
      this.ros.connect('ws://192.168.254.128:9090'); // Replace with your ROS master URI
      this.ros.on('connection', () => {
        this.isConnected = true;
      });
      this.ros.on('close', () => {
        this.isConnected = false;
      });
    };

    this.disconnect = () => {
      this.ros.close();
      this.isConnected = false;
    };
  }
}

const rosConnection = new ROSConnection();
export default rosConnection;
