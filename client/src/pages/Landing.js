import '../App.css';
import { Textfit } from 'react-textfit';
import connectimg from '../images/connect-img.png';
import modimg from '../images/modular-img.png';


export default Landing;

function Landing() {

    return(
        <Textfit>
        <div className="App">
          <header className="App-header">
            <div className="LandingText1Header">
                <h1>Take Control.</h1>
            </div>
            <div className="LandingText1Body">
            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. 
                Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. 
                Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque 
                nibh nibh, at maximus ante.</p>
            </div>
         <div class = "landingimg-1">
            <img className="landingimg-1" src={connectimg} />
        </div>   
         
         
         {/* TODO: Link to register once it exists */}
         <a href="/login">
            <button class="landing-trynow">Try Now</button>
        </a>
        </header>
      </div>
      </Textfit>
    )

}