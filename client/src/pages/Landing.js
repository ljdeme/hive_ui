import '../css/landing.css';
import connect_img from '../images/connect-img.png';
import modular_img from '../images/modular-img.png';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default Landing;

function Landing() {
    return(
        <div className='landing-page'>
            <Navbar/>
            <div className='landing-layout'>
                <div className='top-flexbox'>
                    <div className='box-item-1'>
                            <h1>Take Control.</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                                Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                                nibh nibh, at maximus ante.</p>
                    </div>
                    <img className='landingImg-1' src={connect_img}  alt='modular'/>   
                </div>
                <div className='middle-flexbox'>
                    <img className='landingImg-2' src={modular_img} alt='modular'/>
                    <div className='box-item-2'>
                        <h1>Fits to your needs.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                            Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                            Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                            nibh nibh, at maximus ante.</p> 
                    </div>
                </div>
                <div className='bottom-flexbox'>
                    <a href='/register'>
                        <button className='landing-trynow'>Try Now</button>
                    </a>
                </div>
            </div>
            <Footer/>
        </div>
    )
}