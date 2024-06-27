import React from 'react'
import "./productList.css"
import Header from '../Header/Header'

const ProductList = ({product, addToCart, setSearchQuery, searchQuery}) => {
  return (
    <div className="newArrival">
            <Header  title="GlamCart" setSearchQuery={setSearchQuery} searchQuery={searchQuery} product={product}/>

      <h2>New Arrivals</h2>

      <ul className="newArrival-list">
        {product.map((product) => (
          <li key={product.productId} className="newArrival-item">
            <div className="newArrival-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="newArrival-details">
              <p className="newArrival-category">{product.name}</p>
              <p className='newArrival-category'>{product.productId}</p>
              <p className="newArrival-price">${product.price}</p>
              <button onClick={() => addToCart(product)} >Add To Cart</button>
            </div>
          </li>
        ))}
      </ul>

    </div>

  )
}

export default ProductList
