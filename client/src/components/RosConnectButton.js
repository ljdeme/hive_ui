import React, { Component } from 'react';
import ROSLIB from 'roslib';

class RosConnectButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
    };
    this.ros = null;
  }

  connectToRos = () => {
    if (!this.state.isConnected) {
      // Replace with your ROS server's IP and port
      const ros = new ROSLIB.Ros({
        url: 'ws://192.168.254.128:9090',
      });

      ros.on('connection', () => {
        console.log('Connected to ROS');
        this.setState({ isConnected: true });
      });

      ros.on('error', (error) => {
        console.error('Error connecting to ROS:', error);
      });

      ros.on('close', () => {
        console.log('Disconnected from ROS');
        this.setState({ isConnected: false });
      });

      this.ros = ros;
    } else {
      this.ros.close();
      this.setState({ isConnected: false });
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.connectToRos}>
          {this.state.isConnected ? 'Disconnect from ROS' : 'Connect to ROS'}
        </button>
      </div>
    );
  }
}

export default RosConnectButton;