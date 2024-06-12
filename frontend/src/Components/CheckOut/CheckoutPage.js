import React, { useState } from 'react';
import './checkoutPage.css';

const CheckoutHeader = () => {
  const handleCancel = async() => {
    window.location.href='/cart'
  }
  return (
    <header className="checkout-header">
      <h1>Checkout</h1>
      <button className="cancel-button" onClick={handleCancel}>
       Cancel
      </button>

    </header>
  );
};

const CheckoutPage = () => {
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [notifications, setNotifications] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Track if OTP is sent

  const handlePlaceOrder = () => {
    // Collect the entered information
    const orderData = {
      name,
      paymentMethod,
      cardNumber,
      city,
      state,
      street,
      postalCode,
      notifications,
      mobileNumber,
    };

    // Handle sending OTP logic here
    if (!otpSent) {
      sendOtpToUser(); // Implement this function
      setOtpSent(true);
    } else {
      // Handle verifying OTP logic here
      verifyOtpFromUser(); // Implement this function
    }

    // Reset the form fields after placing the order
    setName('');
    setPaymentMethod('');
    setCardNumber('');
    setCity('');
    setState('');
    setStreet('');
    setNotifications('');
    setPostalCode('');
    setMobileNumber('');
  };

  // Function to send OTP to the user
  const sendOtpToUser = () => {
    // Implement this function to send OTP to the user's mobile number
    // You can use an API for sending SMS or other methods
    console.log('Sending OTP to user...');
  };

  // Function to verify OTP entered by the user
  const verifyOtpFromUser = () => {
    // Implement this function to verify the OTP entered by the user
    console.log('Verifying OTP...');
  };

  return (
    <>
      <CheckoutHeader />
      <div className="checkout-container">
        <form>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
          </select>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {!otpSent ? (
            <button onClick={handlePlaceOrder}>Send OTP</button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={notifications}
                onChange={(e) => setNotifications(e.target.value)}
              />
              <button onClick={handlePlaceOrder}>Place Order</button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
