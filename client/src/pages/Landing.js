import '../css/landing.css';
import connect_img from '../images/connect-img.png';
import modular_img from '../images/modular-img.png';


export default Landing;

function Landing() {
    return(
        <div className='landing-page'>
            <div class='landing-layout'>
                <div className='top-flexbox'>
                    <div className='box-item-1'>
                        <div className='landingText-1'>
                            <div className= 'headerText' >
                                <h1>Take Control.</h1>
                            </div>
                        </div>
                        <div className= 'bodyText' >
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                                Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                                nibh nibh, at maximus ante.</p>
                        </div>
                    </div>
                    <div className='box-item-2'>
                        <img className='landingImg-1' src={connect_img}  alt='modular'/>
                    </div>
                </div>
                <div className='bottom-flexbox'>
                    <div className='box-item-3'>
                        <img className='landingImg-2' src={modular_img} alt='modular'/>
                    </div>
                    <div className='box-item-4'> 
                        <div className='landingText-2'>
                            <div className= 'headerText' >
                                <h1>Fits to your needs.</h1>
                            </div>
                            <div className= 'bodyText-2' >
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                                    Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                                    Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                                    nibh nibh, at maximus ante.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <a href='/register'>
                <button class='landing-trynow'>Try Now</button>
                </a>
            </div>
        </div>
    )
}


  {/* <div className='box-item'>
                    <div className='landingText1Header'>
                        <div className= 'headerText' >
                            <h1>Take Control.</h1>
                        </div>
                    </div>
                    <div className='LandingText1Body'>
                        <div className= 'bodyText' >
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                                Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                                nibh nibh, at maximus ante.</p>
                        </div>
                    </div>
                </div>
                <div className='box-item'>
                    <div className= 'landing_img-1'>
                        <img className='landingimg-1' src={connect_img}  alt='modular'/>
                    </div>
                </div>
                <div className='box-item'>
                    <div className='landingText2Header'>
                        <div className= 'headerText' >
                            <h1>Fits to your needs.</h1>
                        </div>
                    </div>
                    <div className='landingText2Body'>
                        <div className= 'bodyText' >
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                                Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                                nibh nibh, at maximus ante.</p>
                        </div>
                    </div>
                </div>
                <div className='box-item'>
                    <div className= 'landing_img-2'>
                        <img className='landingimg-2' src={modular_img} alt='modular'/>
                    </div>
                </div>
            </div>
            <a href='/register'>
                <button class='landing-trynow'>Try Now</button>
            </a> */}