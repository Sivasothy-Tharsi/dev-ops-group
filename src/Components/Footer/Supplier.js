import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "./supplier.css"
const Supplier = () => {
  const suppliers = [
    {
      name: 'Supplier 1',
      profile: 'Profile description for Supplier 1',
      image : 'SupplierImage/Supplier1.jpeg'
    },
    {
      name: 'Supplier 2',
      profile: 'Profile description for Supplier 2',
      image : 'SupplierImage/Supplier2.jpeg'
    },
    {
      name: 'Supplier 3',
      profile: 'Profile description for Supplier 3',
      image : 'SupplierImage/Supplier3.jpg'
    },
  ];

  return (
    <div className="supplier-slider">
      <Carousel showArrows={false} showThumbs={false}>
        {suppliers.map((supplier, index) => (
          <div key={index} className='slide'>
            <img src = {process.env.PUBLIC_URL + '/' + supplier.image}
            alt={`Image of ${supplier.name}`}/>
            <h3>{supplier.name}</h3>
            <p>{supplier.profile}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Supplier
