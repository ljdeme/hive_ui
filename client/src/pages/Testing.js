import React from 'react';
import '../css/testing.css';
import test_img from '../images/test_img.jpg';


const Testing = () => {
  const boundingBoxes = [
    { id: 1, top: 50, left: 42, width: 50, height: 65 },
    { id: 2, top: 210, left: 180, width: 80, height: 60 },
    { id: 3, top:400, left: 175, width: 120, height: 50 },
  ];

  const handleBBClick = (boxID) => {
    console.log(`Clicked bounding box with ID ${boxID}`);
  };

  return (
      <div className="image-container">
        <img src={test_img} alt="test" width='900' height='470' />
        {boundingBoxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              left: `${box.left}px`,
              top: `${box.top}px`,
              width: `${box.width}px`,
              height: `${box.height}px`,
            }}
          onClick={() => handleBBClick(box.id)}  
          ></div>
        ))}
    </div>
  );
}

export default Testing;
