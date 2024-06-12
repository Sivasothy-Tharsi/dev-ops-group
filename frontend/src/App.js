import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainFooter from './Components/Footer/MainFooter';
import ProductList from './Components/Product/ProductList';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Contact from './Components/Contact/Contact';
import CartList from './Components/Product/CartList';
import MainWindow from './Components/Product/MainWindow';
import NotLoggedInMessage from './Components/NotLoggedInMessage';
import AboutUs from './Components/AboutUs/AboutUs';
import CheckoutPage from './Components/CheckOut/CheckoutPage';

function App() {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [showNotLoggedInMessage, setShowNotLoggedInMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/products/all')
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  const addToCart = async (productData) => {
    try {
      if (user) {
        Navigate('/MainWindow')
      } else {
        setShowNotLoggedInMessage(true)
      }
    } catch {
      console.log('An error occurred while adding the product')
    }
  }

  const filteredProducts = product.filter((productItem) =>
    productItem.name.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <>

      <section className="App">

        <Routes>
          <Route path='/login' element={<Login title='GlamCart' />} />
          <Route path='/register' element={<Register title='GlamCart' />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/cart' element={<CartList product={product} cart={cart} setCart={setCart} />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/' element={
            <>
              {showNotLoggedInMessage && (
                <NotLoggedInMessage message='You are not logged in. Please log in to add produt to your cart.' onClose={() => setShowNotLoggedInMessage(false)} />
              )}
              <ProductList addToCart={addToCart} product={filteredProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
            </>
          } />
          <Route path='/mainWindow' element={<MainWindow product={filteredProducts} setSearchQuery={setSearchQuery} searchQuery={searchQuery} title='GlamCart' />} />
        </Routes>
        <MainFooter />
      </section>

    </>
  );
}

export default App;
