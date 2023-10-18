import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../css/login_and_register.css';
import hex from "../images/hive-logo.png"
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleLogin(formValues);
      console.log(formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    console.log(formValues);
    const errors = {};
    if (values.username === "") {
      errors.username = "*Username is blank";
    }
    if (values.password === "") {
      errors.password = "*Password is blank";
    }
    return errors;
  };

  const handleLogin = (values) => {
    console.log(values.username + ", " + values.password);
    fetch(`/api/users?username=${values.username}&password=${values.password}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log(response);
      if (!response.ok){
        return response.json().then((data) => {
          console.error(data.error); // Log the error message
          setFormErrors({ ...formErrors, password: "INVALID CREDENTIALS" });
          setIsSubmit(false);
        });
      }
      else{
        return response.json().then((data) => {
          console.log(data.token); // Log the token
          console.log(data.user);  // Log the user object
          console.log(data.user._id);
          // Store the token and user data in localStorage or state as needed
          localStorage.setItem('token', data.token);
          sessionStorage.setItem('UID', data.user._id);
          // setUser(data.user); // Set the user data in your state if needed
    
          navigate("/myFleets");
        });
      }
    });
  };

  return (
    <div className="authentication-page">
      <Navbar/>
      <div className="form-page">
        <div className="login-container">
              <div className="authentication-header">
                <p><img src={hex} alt='HIVE logo' height='75'/></p> 
              </div>
              <div className='input-fields'>
                <div id="login-input" className="input-group">
                    <label htmlFor="Username">Username</label>
                    <input 
                      type="text" 
                      name="username" 
                      id="login-username" 
                      placeholder="Username"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                    <p className="error">{formErrors.username}</p>
                    <label htmlFor="Password">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      id="login-password" 
                      placeholder="Password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <p className="error">{formErrors.password}</p>
                </div>
              </div>
              <h1>
                <Link to="/pages/home.js">
                  <input
                    className="loginAndRegister-btn"
                    type="button"
                    value="Log in"
                    onClick={handleSubmit}
                  />
                </Link>
              </h1>
              <Link className="login-register-swap" to="/register">Don't have an account yet?</Link>
          </div>
        </div>
    </div>
  );
}
export default Login;