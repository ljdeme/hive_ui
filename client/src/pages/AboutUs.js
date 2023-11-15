
import '../css/aboutUs.css';
import React from "react";
import cameron from '../images/cameron.jpg';
import konstantin from '../images/konstantin.jpg';
import marc from '../images/marc.jpg';
import julia from '../images/julia.jpg';

function AboutUs() {
  return (
    <div className="aboutUs-page">
      <div className="aboutUs-layout">
        <div className='about'>
          <h1 className='about-header'>Who Are We?</h1>
          <p className='about-desc'>We are students from the University of Central Florida. For our capstone 
          project we wanted to create a modular, user-friendly, cost-effective robotic software and hardware system 
          that offers seamless control and quick deployment. As the culmination of our academic journey we combined 
          our knowledge in software and hardware engineering.</p>
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
            <p className='member-res'>Project Manager, ROS & Fullstack Developer</p>
          </div>
          <div className='member-info'>
            <a
              href="https://www.linkedin.com/in/konstantin-clonce-a5195a258/"
            >
              <img className='member-img' src={konstantin} alt="Konstantin Clonce" />
            </a>
            <h3 className='member-name'>Konstantin Clonce (CS)</h3>
            <p className='member-res'>Router Software & ROS Developer</p>
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
            <h3 className='member-name'>Cameron Nichols (CPE, CS, EE)</h3>
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