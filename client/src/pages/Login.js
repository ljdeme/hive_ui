import {Link} from 'react-router-dom';

import '../css/login_and_register.css';
import hex from "../images/hex2.png"

function Login() {
  return (
    <div className="authentication-page">
      <div className="login-container">
            <div className="authentication-header">
              <p><img src={hex} alt='HIVE logo' height='75'/></p> 
              <h1>Log in</h1> 
            </div>
            <div className='input-fields'>
              <div id="login-input" className="input-group">
                  <label htmlFor="Username">Email:</label>
                  <input type="text" name="username" id="login-username" placeholder="Email or Username"/>
                  <label htmlFor="Password">Password:</label>
                  <input type="password" name="password" id="login-password" placeholder="Password"/>
              </div>
            </div>

            <h1><button class="nav-login">Log in</button></h1>
            
            <Link className="login-register-swap" to="/register">Don't have an account yet?</Link>
        </div>
    </div>
  );
}

export default Login;