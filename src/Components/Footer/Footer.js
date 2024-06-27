import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className='subContainer'>
            <div className="footer-mission">
                <h3>Mission</h3>
                <p>Our mission is to provide the highest quality products to our customers.</p>
            </div>
            <div className="footer-vision">
                <h3>Vision</h3>
                <p>Our vision is to be a trusted and innovative brand in the industry.</p>
            </div>
            <div className="footer-follow">
                <h3>Follow Us</h3>
                <div className="follow-icons">
                    <i className="fab fa-facebook"></i>     
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-linkedin"></i>
                </div>
            </div>
        </div>
      
      
        <div className="company-details">
          <h1>T&T Glamour Tinctures</h1>
          <p>123 Main Street</p>
          <p>Galle, Southern 12345</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>
        <div className="product-categories">
          <h3>Quick Access</h3>
          <ul>
            <li>Face Makeup</li>
            <li>Eye Makeup</li>
            <li>Eye Shadow</li>
            <li>Chains</li>
            <li>Necklaces</li>
          </ul>
        </div>
        
      </div>
     
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} T&T Glamour Tinctures. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
