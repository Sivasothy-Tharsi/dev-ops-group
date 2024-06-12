
import React, { useEffect, useState } from 'react'
import "./transition.css"

const Transition = () => {

    const topic1 = 'Unlock Your Inner Godness';
    const transitions = [
        { topic: topic1, image: 'Images/image1.png' },
        { topic: topic1, image: 'Images/image2.jpg' },
        { topic: topic1, image: 'Images/image3.jpg' },
        { topic: topic1, image: 'Images/image4.png' },
        { topic: topic1, image: 'Images/image5.png' },
      
      ];

      const [currentIndex, setCurrentIndex] =useState(0);
      const currentTransition = transitions[currentIndex];

      const nextTransition = () => {
        setCurrentIndex((prevIndex) => (prevIndex === transitions.length - 1 ? 0 :prevIndex + 1 ));
      };

      useEffect(() => {
        const interval = setInterval(nextTransition, 5000);
        return () => clearInterval(interval);
      });

  return (
    <>
        <section>
            <div className='transitionSlider'>
                <h2 className='transition-topic'>{currentTransition.topic}</h2>
                <img className='transition-image' alt={currentTransition.image}
                    src = {process.env.PUBLIC_URL + '/' + currentTransition.image}           
                />   
            </div>
        </section>
    </>
  )
}

export default Transition
