import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loader.css'; 
import Loader1 from '../assets/loader1.png';  
import Loader2 from '../assets/loader2.png'; 
import Loader3 from '../assets/loader3.png'; 

const Loader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: Loader1,
      text: "Empowering Your Business with Expert Financial Guidance"
    },
    {
      src: Loader2,
      text: "Innovative Solutions for Growing Your Business"
    },
    {
      src: Loader3,
      text: "Tailored Financial Strategies for Your Success"
    }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const imageChangeInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    setTimeout(() => {
      navigate('/login'); 
    }, 9000);

    return () => clearInterval(imageChangeInterval); 
  }, [navigate]);

  return (
    <div className="loader-container">
      <div className="image-container">
        <img
          src={images[currentImageIndex].src}
          alt="Businessman"
          className="loading-image"
        />
        <p className="image-text">{images[currentImageIndex].text}</p>
      </div>
      <div className="loader"></div> 
    </div>
  );
};

export default Loader;
