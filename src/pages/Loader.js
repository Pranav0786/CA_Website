import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader1 from '../assets/loader1.png';  
import Loader2 from '../assets/loader2.png'; 
import Loader3 from '../assets/loader3.png'; 

const Loader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: Loader1,
      text: "Empowering Your Business with Expert Financial Guidance",
    },
    {
      src: Loader2,
      text: "Innovative Solutions for Growing Your Business",
    },
    {
      src: Loader3,
      text: "Tailored Financial Strategies for Your Success",
    },
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
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 overflow-hidden relative p-5">
      <div className="relative text-center max-w-4/5 animate-fade-in">
        <img
          src={images[currentImageIndex].src}
          alt="Businessman"
          className="w-full max-h-[400px] rounded-xl transition-opacity duration-1000 ease-in-out transform scale-105 shadow-lg hover:scale-110 hover:shadow-2xl"
        />
        <p className="text-lg font-medium text-gray-600 mt-4 transition-opacity duration-1000 ease-in-out hover:translate-y-[-10px] hover:text-blue-500">
          {images[currentImageIndex].text}
        </p>
      </div>
      <div className="absolute bottom-8 w-20 h-20 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin delay-300 duration-1000 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 shadow-md"></div>
    </div>
  );
};


export default Loader;
