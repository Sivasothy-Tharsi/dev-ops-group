

import React, { useState } from 'react';
import "./register.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import Transition from '../Header/Transition';
import Head from '../Header/Head';

const Register = ({title}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [verification, setVerification] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  
  async function handleRegister() {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Contact:", contact);
  
    if (!name || !email || !password || !confirmPassword || !contact) {
      setRegistrationStatus("Please fill in all the required fields.");
      return;
    }
    else if (password !== confirmPassword) {
      setRegistrationStatus("Passwords do not match.");
      return;
    }
  
    else if (!verification) {
      setRegistrationStatus("Please agree to the terms and conditions.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/v1/users/", {
        name: name,
        email: email,
        password: password,
        contact: contact,
      });
  
      console.log(response);
  
      if (response && response.data) {
        console.log(response.data);
        setTimeout(() => {
          setRegistrationStatus("Registration successful. You can now log in.");
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setContact('');
          setVerification(false);
        }, 2000);  
        window.location.href='/login'      
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        setRegistrationStatus(error.response.data.message);
      } else {
        setRegistrationStatus("Registration failed. Please check your information.");
      }
    }
  }
  

  return (
    <>
      {/* <Header title={title}/> */}
      <Head title={title}/>
      <Transition/>
      <div className="register-container">
        <h2>Create an Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor='name'>Full Name</label>
            <input type='text' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input type='password' placeholder='********' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor='contact'>Contact</label>
            <input type='text' placeholder='Contact Information' value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <div className="form-group">
            <input type="checkbox" checked={verification} onChange={() => setVerification(!verification)} />
            <label htmlFor="verification">I agree to the terms and conditions</label>
          </div>
          <button type='button' onClick={handleRegister}>Register</button>
        </form>
        {registrationStatus && <p className="error">{registrationStatus}</p>}
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </>
  );
}

export default Register;
