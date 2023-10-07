import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import '../css/login_and_register.css';
import hex from "../images/hive-logo.png"

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
      handleRegister(formValues);
      console.log(formValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, formValues, isSubmit]);


// ========================================= Input Validation =========================================
  const [isBetween8And32Chars, setIsBetween8And32Chars] = useState(false);
  const [hasUppercaseLetter, setHasUppercaseLetter] = useState(false);
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);

  const validate = (values) => {
    setIsBetween8And32Chars(false);
    setHasUppercaseLetter(false);
    setHasSpecialCharacter(false);
    setHasDigit(false);

    const errors = {};

    if (values.username === "") {
      errors.username = "*Username is blank";
    } else {
      var userCheck = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{4,32}$/g;
      if (userCheck.test(values.username) === false) {
        errors.username = "* Username must be between 5-32 characters";
      }
    }

    if (values.email === "") {
      errors.email = "*Email Address is blank";
    } else {
      var emailCheck = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]+$/g;
      if (emailCheck.test(values.email) === false) {
        errors.email = "*Email Address is not valid";
      }
    }

    if (values.password === "") {
      errors.password = "*Password is blank";
    } else {
      // Checks for 8-32 characters long
      // At least 1 digit, 1 Special Character
      var passCheck =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$/;

      if (passCheck.test(values.password) === false)
      {
        errors.password = "Please make sure your password meets all the requirements.";
        // Check if password is between 8-32 characters
        if ((values.password.length >= 8 && values.password.length <= 32) === false) {
          setIsBetween8And32Chars(true);
        } else {
          setIsBetween8And32Chars(false);
        }
    
        // Check if password has at least one uppercase letter
        if (/[A-Z]/.test(values.password) === false) {
          setHasUppercaseLetter(true);
        } else {
          setHasUppercaseLetter(false);
        }
    
        // Check if password has at least one special character
        if (/[@#$%^&+=]/.test(values.password) === false) {
          setHasSpecialCharacter(true);
        } else {
          setHasSpecialCharacter(false);
        }
    
        // Check if password has at least one digit
        if (/\d/.test(values.password) === false) {
          setHasDigit(true);
        } else {
          setHasDigit(false);
        }
      }
    }
    if (values.confirmPassword === "" || values.confirmPassword !== values.password) {
      errors.confirmPassword = "*Passwords do not match";
    }
    return errors;
  };

  // =========================================================================


  const handleRegister = (values) => {
    console.log(values.email + ", " + values.username + ", " + values.password)
    fetch('/api/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password,
      }),
    })
    .then((data) => {
        console.log(data);
        navigate("/login", { replace: true });
    })
    .catch((error) => console.error(error));
    setIsSubmit(false);
  };

  return (
    <div className="authentication-page">
      <Navbar/>
      <div className="form-page">
        <div className="register-container">
          <div className="authentication-header">
            <p><img src={hex} alt='HIVE logo' height='75'/></p> 
            <h1>Create an account to get started</h1>
          </div>
          <div className='input-fields'>
              <div className="container-half">
                  <div id="login-input" className="input-group">
                    <label htmlFor="Email">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="register-email" 
                      placeholder="Email (ex. abc@123.com)"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <p className="error">{formErrors.email}</p>

                    <label htmlFor="Username">Username</label>
                    <input 
                      type="text" 
                      name="username" 
                      id="register-username" 
                      placeholder="Username (ex. abc123)"
                      value={formValues.username}
                      onChange={handleChange}
                    />
                    <p className="error">{formErrors.username}</p>
                  </div>
              </div>
            
            <div className="container-half">
              <div id="login-input" className="input-group">
                <label htmlFor="Password">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="register-password" 
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.password}</p>
                <p>
                  <ul className="error">
                    {isBetween8And32Chars && <li className="error-li">*Password must be between 8-32 characters</li>}
                    {hasUppercaseLetter && <li className="error-li">*Password must contain at least one uppercase letter</li>}
                    {hasSpecialCharacter && <li className="error-li">*Password must contain at least one special character (@#$%^&+=)</li>}
                    {hasDigit && <li className="error-li">*Password must contain at least one digit</li>}
                  </ul>
                </p>

                <label htmlFor="Password">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  id="register-confirmPassword" 
                  placeholder="Confirm Password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
                <p className="error">{formErrors.confirmPassword}</p>
              </div>
            </div>
          </div>
        <h1>
          <Link to="/pages/home.js">
            <input
              className="nav-login"
              type="button"
              value="Register"
              onClick={handleSubmit}
            />
          </Link>
        </h1>
        <Link className="login-register-swap" to="/login">Already have an account?</Link>
      </div>
    </div>
  </div>
  );
}

export default Register;