import React from 'react'

function NavMap({ ros }) {

    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
        divID : 'nav',
        width : 750,
        height : 800
    });
    
    // Setup the nav client.
    var nav = NAV2D.OccupancyGridClientNav({
        ros : ros,
        rootObject : viewer.scene,
        viewer : viewer,
        serverName : '/pr2_move_base'
    });


  return (
    <div id="nav"></div>
  )
}

export default NavMap