import React from 'react';
import './aboutUs.css';

const AboutUs = ({user}) => {


    const handleHomeClick = () => {
            window.location.href = '/MainWindow';       
      };

  return (
    <div className="about-us-container">
      <div className="header">
      <i
          onClick={handleHomeClick}
          className="fas fa-home"
          style={{ color: 'white', fontSize: '24px' }}
        ></i>
        <h1>About T&T Glamour Tinctures</h1>
        <p>
          Welcome to T&T Glamour Tinctures, your gateway to a world of beauty and self-expression. We believe that makeup and skincare aren't just about aesthetics; they are tools for empowering individuals, enhancing confidence, and celebrating uniqueness.
        </p>
      </div>
      <div className="about-us-content">
        <h2>Our Mission</h2>
        <p>
          At T&T Glamour Tinctures, our unwavering mission is to provide the highest quality products to our customers. We source and curate a range of cosmetics and skincare items that are meticulously crafted to elevate your beauty routines. We understand the power of self-expression, and our products are designed to help you express your inner allure with confidence and flair.
        </p>

        <h2>Our Vision</h2>
        <p>
          Our vision is to be a trusted and innovative brand in the beauty industry. We aspire to set new standards, inspire creativity, and continuously innovate, ensuring that our customers have access to the latest and most exciting products. We aim to build a community where beauty knows no boundaries, where every individual is encouraged to embrace their unique style.
        </p>
      </div>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <ul>
          <li><strong>Address:</strong> 123 Main Street, Galle, Southern 12345</li>
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>
          <li><strong>Email:</strong> info@example.com</li>
        </ul>
      </div>
      <div className="about-us-content">
        <h2>Join Our Journey</h2>
        <p>
          By choosing T&T Glamour Tinctures, you're not just selecting beauty products; you're embarking on a journey of self-expression and self-discovery. We invite you to explore our extensive range of cosmetics and skincare solutions and join us on this exciting path. Our products are crafted with care and dedication, and our commitment to quality is unwavering.
        </p>
        <p>
          Together, let's redefine beauty and celebrate individuality. Thank you for making T&T Glamour Tinctures a part of your beauty journey.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
