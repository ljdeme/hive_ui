import '../css/landing.css';
import connect_img from '../images/connect-img.png';
import modular_img from '../images/modular-img.png';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default Landing;

function Landing() {
    return(
        <div className='landing-page'>
            <div className='landing-layout'>
                <div className='top-flexbox'>
                    <div className='box-item-1'>
                            <h1>Take Control.</h1>
                            <p>Take control with our state-of-the-art robotic hardware and software solution, 
                                which is built for maximum cost-effectiveness, adaptability, and user-friendliness. 
                                Our solution is designed to satisfy a variety of purposes and offers quick deployment and
                                smooth control so you are always in control.
                            </p>
                    </div>
                    <img className='landingImg-1' src={connect_img}  alt='modular'/>   
                </div>
                <div className='middle-flexbox'>
                    <img className='landingImg-2' src={modular_img} alt='modular'/>
                    <div className='box-item-2'>
                        <h1>Tailored to Your Demands.</h1>
                        <p>Customized to Meet Your Needs: Thanks to its modular 
                            architecture, you may modify the system to meet your exact specifications, giving you a flexible 
                            solution that can be adjusted to meet the particular needs of your business. 
                        </p> 
                    </div>
                </div>
                <div className='bottom-flexbox'>
                    <a href='/register'>
                        <button className='landing-trynow'>Try Now</button>
                    </a>
                </div>
            </div>
        </div>
    )
}