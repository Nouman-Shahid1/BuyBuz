import React from 'react'

function AboutPage() {
  return (
  
    <div>
     <div class="sm:flex items-center max-w-screen-xl">
    <div class="sm:w-1/2 p-10">
        <div class="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png"/>
        </div>
    </div>
    <div class="sm:w-1/2 p-5">
        <div class="text">
            <span class="text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">About <span class="text-indigo-600">Our Company</span>
            </h2>
            <p class="text-gray-700">
            "Welcome to AH-BUYBUZZ, your go-to online store for all things amazing! We aim to redefine your shopping experience by offering a wide variety of high-quality products at unbeatable prices. Our mission is to make your life easier by bringing everything you need right to your doorstep.

With a focus on user-friendly design, secure payments, and lightning-fast delivery, we’re here to ensure you enjoy every moment of your shopping journey. Explore our curated collections, find your favorites, and let us take care of the rest.

Shop smarter. Live better. Start your journey with ShopEase today!"
            </p>
        </div>
    </div>
</div>
    </div>
  )
}

export default AboutPage
