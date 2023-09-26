import React, { useEffect } from 'react';
import rosConnection from './ROSConnection';

function MapDisplay() {
    useEffect(() => {

        const ROS2D = window.ROS2D;
        if (rosConnection.isConnected) {
            const viewer = new ROS2D.Viewer({
                divID: 'map',
                width: 600,
                height: 500,
            });
            const gridClient = new ROS2D.OccupancyGridClient({
                ros: rosConnection.ros, // Use the ROS connection from rosConnection
                rootObject: viewer.scene,
            });

            // Scale the canvas to fit the map
            gridClient.on('change', function () {
                viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
            });
        }
    }, []);

    return <div id="map"></div>;
}

export default MapDisplay;
