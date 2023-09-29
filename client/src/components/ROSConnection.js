// rosManager.js
import ROSLIB from 'roslib';

class ROSConnection {
  constructor() {
    this.ros = new ROSLIB.Ros();
    this.isConnected = false;

    this.connect = () => {
      this.ros.connect('ws://192.168.254.128:9090');  //FOR LOCAL
      // this.ros.connect('ws://144.126.249.86:9090');  // On DigitalOcean
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
