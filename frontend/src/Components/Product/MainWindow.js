import React, { useState } from 'react';
import axios from 'axios';
import "./productList.css";
import HeaderMain from '../Header/HeaderMain';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../slices/userSlices';
import { addToCart as addToCartAction } from '../../slices/cartSlice';
import NotLoggedInMessage from '../NotLoggedInMessage';

const MainWindow = ({ product, title, setSearchQuery, searchQuery }) => {
    console.log(product)
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [userData, setUserData] = useState(useSelector(selectUser));
    const [quantityMap, setQuantityMap] = useState({}); 
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const dispatch = useDispatch();

 

    const handleAddToCart = async (productId,productName) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/api/v1/carts/add-to-cart`,
                {
                    product: productId,
                    quantity: quantityMap[productId] || 1, 
                },
                {
                    headers: {
                        'x-access-token': userData.token,
                    },
                }
            );

            console.log(response.data); 

            dispatch(addToCartAction({ productId, quantity: quantityMap[productId] || 1 }));

            setQuantityMap({ ...quantityMap, [productId]: 1 });
            setMessage(`${productName} added to your cart.`);
            setShowMessage(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
      };

   

    return (
        <div>
            <HeaderMain title={title} user={userData.name} token={userData.token} totalQuantity={totalQuantity} 
            setSearchQuery={setSearchQuery} searchQuery={searchQuery} product={product} />
            <div className="newArrival">
                <h2>New Arrivals</h2>
                <ul className="newArrival-list">
                    {product.map((product) => (
                        <li key={product.productId} className="newArrival-item">
                            <div className="newArrival-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="newArrival-details">
                                <p className="newArrival-category">{product.name}</p>
                                {/* <p className="newArrival-category">{product.category}</p> */}
                                <p className='newArrival-category'>{product.productId}</p>
                                <p className="newArrival-price">${product.price}</p>
                                
                                <button
                                    onClick={() => handleAddToCart(product._id,product.name)}
                                >Add To Cart</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {showMessage && <NotLoggedInMessage message={message} onClose={handleCloseMessage} />}
        </div>
    );
};

export default MainWindow;



