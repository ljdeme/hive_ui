
import '../css/aboutUs.css';
import React from "react";
import Navbar from "../components/Navbar";
import cameron from '../images/cameron.jpg';
import konstantin from '../images/konstantin.jpg';
import marc from '../images/marc.jpg';
import julia from '../images/julia.jpg';

function AboutUs() {
  return (
    <div className="aboutUs-page">
      <Navbar/>
      <div className="aboutUs-layout">
        <div className='about'>
          <h1 className='about-header'>Who Are We?</h1>
          <p className='about-desc'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
              Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
              Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
              nibh nibh, at maximus ante.</p>
          </div>
        <h1 className='meet-team'>Meet our team!</h1>
        <div className='team-layout'>
          <div className='member-info'>
            <a
              href="https://www.linkedin.com/in/marcsimmonds/"
            >
              <img className='member-img' src={marc} alt="Marcus Simmonds" />
            </a>
            <h3 className='member-name'>Marcus Simmonds (CS)</h3>
            <p className='member-res'>Program Manager, ROS & Backend Developer</p>
          </div>
          <div className='member-info'>
            <a
              href="https://www.linkedin.com/in/konstantin-clonce-a5195a258/"
            >
              <img className='member-img' src={konstantin} alt="Konstantin Clonce" />
            </a>
            <h3 className='member-name'>Konstantin Clonce (CS)</h3>
            <p className='member-res'>Embeded Software & ROS Developer</p>
          </div>
          <div className='member-info'>
            <a
              href="https://www.linkedin.com/in/loubien-d/"
            >
              <img className='member-img' src={julia} alt="Loubien Demetita" />
            </a>
            <h3 className='member-name'>Loubien Demetita (CS)</h3>
            <p className='member-res'>UI/UX Designer & Frontend Developer</p>
          </div>
          <div className='member-info'>
            <a
              href="https://www.linkedin.com/in/cameron00nichols/"
            >
              <img className='member-img' src={cameron} alt="Cameron Nichols" />
            </a>
            <h3 className='member-name'>Cameron Nichols (CS, CPE, EE)</h3>
            <p className='member-res'>Agent Developer & Hardware Team Lead</p>
          </div>
        </div>
        <div className='hardware-team-info'>
            <h1 className='meet-team'>Hardware Team:</h1>
            <h3 className='member-name'>John McClain (ME), Isaac Finley (EE), Benjamin Palladino (EE), Cooper Fitzgerald (EE)</h3>
          </div>
      </div>  
    </div>
  );
}

export default AboutUs;