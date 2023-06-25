import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../css/login_and_register.css';
import hex from "../images/hex2.png"

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
    console.log(values.username + ", " + values.password)
    fetch('/api/users', {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
    .then((data) => {
        console.log(data);
        navigate("/home", { replace: true });
    })
    .catch((error) => {
      console.error(error)
      console.log("INVALID CREDENTIALS IN VALIDATE");
      setFormErrors({ ...formErrors, password: "INVALID CREDENTIALS" });
      setIsSubmit(false);
    });
  };

  return (
    <div className="authentication-page">
      <div className="login-container">
            <div className="authentication-header">
              <p><img src={hex} alt='HIVE logo' height='75'/></p> 
              <h1>Log in</h1> 
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
                  className="nav-login"
                  type="button"
                  value="Log in"
                  onClick={handleSubmit}
                />
              </Link>
            </h1>
            <Link className="login-register-swap" to="/register">Don't have an account yet?</Link>
        </div>
    </div>
  );
}
export default Login;