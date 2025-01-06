import React from 'react';
import ProductSection from './ProductSection';
import MainImage from "../assets/Images/mainimg.jpg";
import Hafsa from "../assets/Images/ss.jpg"
function MainSection() {
  return (
    <div>
     <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
  <div class="absolute inset-0">
    <img src={MainImage} alt="Background Image" class="object-cover object-center w-full h-full" />
    
    <div class="absolute inset-0 bg-black opacity-50"></div>
  </div>
  <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
    <h1 class="text-5xl font-bold leading-tight mb-4 ">Discover Unique Fashion Styles </h1>
    <p class="text-lg text-gray-300 mb-8 " >Discover amazing features and services that await you.</p>
    <a href="#" class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Shop Now</a>
  </div>
</div>

<ProductSection/>
    </div>
  )
}

export default MainSection
