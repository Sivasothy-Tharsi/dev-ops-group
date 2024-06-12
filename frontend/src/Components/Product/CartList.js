import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import "./cartList.css";
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../slices/userSlices'

const CartList = () => {

  const user = useSelector(selectUser);
  const token = user.token;
  const [prod,setprod]= useState([]);
  
  const [cart,setCart] = useState([]);

  const deleteCartItem = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/v1/carts/${productId}`,
      
      {
        headers: {
          'x-access-token': token
        }
      });
      if (response.status === 200) {
        const updatedCart = cart.filter((product) => product._id != productId);
        setCart(updatedCart);
        console.log('Cart product deleted.');
      } else {
        console.error('Failed to delete the cart product.');
      }
    } catch (error) {
      console.error('An error occurred while deleting the cart product:', error);
    }
  };

 

  const handleEditQuantity = async (productId, newQuantity) => {

    if (newQuantity < 1) {
      newQuantity = 1;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/carts/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
  
      if (response.status === 200) {
        const updatedCart = cart.map((product) => {
          if (product._id === productId) {
            return { ...product, quantity: newQuantity };
          }
          return product;
        });
  
        setCart(updatedCart);
        console.log('Cart product quantity updated.');
      } else {
        console.error('Failed to update the cart product quantity.');
      }
    } catch (error) {
      console.error('An error occurred while updating the cart product quantity:', error);
    }
  };
  

  const calculateTotalPrice = () => {
    let total = 0;
    console.log(prod)
    console.log(prod.find(o=>o._id == "653123fae480503883b743f9" ))
    for (const product of cart) {
      let prodId = product._id;
      console.log(prodId)
      // console.log(prod.find(o=>o._id == product._id ))
      total += prod.find(o=>o._id == product.product ).price * product.quantity;
    }
    return total;
  };


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/carts/all',
      {
        headers: {
          'x-access-token': token
        }
      }
      
      ); 
      const data = await response.json();
      console.log(data)
      setCart(data); 
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleCheckout = async() => {
    window.location.href = '/checkout'
  }




 
  useEffect(() => {
    async function getPRoducts(){
      await fetch('http://localhost:3001/api/v1/products/all')
      .then((response) => response.json())
      .then((data) => setprod(data));
    }
    getPRoducts();
    fetchData();
    console.log(prod)
  }, []);

  return (
    <>
        <section className='section'>
          <Link to="/mainWindow" className="section-link">Close</Link>
        </section>


      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.product}>
                  <td>
                    <img src={prod.find(o=>o._id == product.product ).image} alt={prod.find(o=>o._id == product.product ).name} style={{ width: '50px' }} />
                  </td>
                  <td>{prod.find(o=>o._id == product.product ).category}</td>
                  <td>{prod.find(o=>o._id == product.product ).name}</td>
                  <td>${prod.find(o=>o._id == product.product ).price}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => handleEditQuantity(product._id, product.quantity - 1)}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => handleEditQuantity(product._id, product.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>${prod.find(o=>o._id == product.product ).price * product.quantity}</td>
                  <td>
                    <button onClick={() => deleteCartItem(product._id)} className="delete-button">
                    <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty</p>
        )}
        <p>Total Cart Price: ${calculateTotalPrice()}</p>
        <button onClick={handleCheckout} className="confirm-button">Confirm Order</button>
        
      </div>
    </>
    
  );
}
export default CartList;
