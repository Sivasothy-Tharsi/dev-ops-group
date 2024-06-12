
import React, { useState } from 'react';
import "./head.css";
import NotLoggedInMessage from '../NotLoggedInMessage';


const Head = ({ title }) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  const toggleHover = () => {
    setIsHovered(!isHovered);
  };
  const [showNotLoggedInMessage, setShowNotLoggedInMessage] = useState(false);
  const [message, setMessage] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCartClick = () => {
    setMessage('You are not logged in. Please log in to access your cart.');
    setShowNotLoggedInMessage(true);
  };

  const handleContactClick = () => {
    const companyPhoneNumber = '1234567890';

    const message = 'Hello, I want to get in touch with you.';

    const whatsappLink = `https://wa.me/${companyPhoneNumber}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappLink;
  }

  const openLogin = () => {
    window.location.href = '/login';
  };

  const openHome = () => {
    window.location.href = '/';
  };

  const gotoAbout = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
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
            <li onClick={gotoAbout}>
              About us
            </li>
            <li onClick={handleContactClick}>
            {/* <i className="fab fa-whatsapp" style={{ color: 'white', fontSize: '24px' }}></i> */}
              WhatsApp
            </li>
            <li onClick={openLogin}>
              Login
            </li>
            <li >
            <i onClick={handleCartClick} className="fas fa-shopping-cart" style={{ color: 'white', fontSize: '24px' }}></i>
          </li>
          </ul>
        
      </div>
      {showNotLoggedInMessage && <NotLoggedInMessage message={message} onClose={() => setShowNotLoggedInMessage(false)} />}
    </section>
  );
};

export default Head;
