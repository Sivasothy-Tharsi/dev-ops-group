
import React, { useState, useEffect } from 'react';
import "./head.css";
import { Link } from 'react-router-dom';
import { logout } from '../../slices/userSlices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserNameHead = ({title,user, token}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);  const toggleHover = () => {
      setIsHovered(!isHovered);
    };
  
    const dispatch = new useDispatch()
    const navigate = useNavigate();

    const truncatedUser = user.slice(0, 5);

    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
      const config = {
        headers: {
          'x-access-token': token,
        },
      };
  
      axios
        .get('http://localhost:3001/api/v1/carts/total', config) 
        .then((response) => {
          setTotalQuantity(response.data.totalQuantity);
        })
        .catch((error) => {
          console.error('Error fetching cart total:', error);
        });
    });


    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {

  
      try {
   
        dispatch(logout()); 
        navigate('/');
        console.log(user)
      
    } catch (error) {
      console.log(error);
      
    }
    
    };

    const openHome = () => {
            window.location.href = '/mainWindow';
    };

    const openContact = () => {
      window.location.href = '/contact';
    };

    const openAbout = () => {
      window.location.href = '/about';
    };


  
  return (
    <section
    className={`section ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={toggleHover}
    onMouseLeave={toggleHover}
  >
    <div className="section-left">
      <img src={process.env.PUBLIC_URL + '/Mylogo.png'} alt="Logo" />
      <h3>{title}</h3>
    </div>

    <div className="section-right">

        <ul className="Nav">
          <li onClick={openHome}>
            Home
          </li>
          <li onClick={openContact}>
            Contact
          </li>
          <li onClick={openAbout}>
            About
          </li>
          <li className='yellow-text '>
            {truncatedUser}
          </li>
          <li onClick={handleLogout}>
            Logout
          </li>
         
          <li>
            <Link to="/cart">
              <i className="fas fa-shopping-cart" style={{ color: 'white', fontSize: '24px' }}></i>
              <sub style={{color:'white'}}>{totalQuantity}</sub>
            </Link>
          </li>
        </ul>
      
    </div>
  </section>
  )
}

export default UserNameHead
