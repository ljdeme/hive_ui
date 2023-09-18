import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

function ROSConnection({ url, onConnect, onError, onClose }) {
  const [ros, setRos] = useState(null);

  useEffect(() => {
    const newRos = new ROSLIB.Ros({ encoding: 'ascii' });
    newRos.connect(url);

    newRos.on('connection', () => {
      console.log('Connected to ROS');
      setRos(newRos);
      if (onConnect) {
        onConnect(newRos);
      }
    });

    newRos.on('error', (error) => {
      console.error('Failed to connect to ROS: ', error);
      if (onError) {
        onError(error);
      }
    });

    newRos.on('close', () => {
      console.log('Disconnected from ROS');
      setRos(null);
      if (onClose) {
        onClose();
      }
    });

    return () => {
      if (newRos) {
        newRos.close();
      }
    };
  }, [url, onConnect, onError, onClose]);
  return null; // This component doesn't render anything visible
}

export default ROSConnection;
