import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom'; 
import Header from '../Header/Header';
import { login } from '../../slices/userSlices';
import Head from '../Header/Head';
import Transition from '../Header/Transition';

const Login = ({title}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleLogin = async () => {
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:3001/api/v1/users/login", {
        email: email,
        password: password
    });
    console.log(response);
    if (response && response.data) {
      console.log(response.data);
      dispatch(login(response.data)); 
      navigate('/mainWindow');
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      setLoginError(error.response.data.message);
    } else {
      setLoginError("An error occurred during login.");
    }
  }
  
  };

  return (
    <>      
    {/* <Header title={title}/> */}
    <Head title={title}/>
    <Transition/>

    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <button type='button' onClick={
          (e)=>{
            e.preventDefault();
            handleLogin();
          }

        }>Login</button>
      </form>
      {loginError && <p className="error">{loginError}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    </>
  );
};

export default Login;
