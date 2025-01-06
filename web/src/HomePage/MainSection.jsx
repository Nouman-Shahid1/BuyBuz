import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSection from "./ProductSection";

const slides = [
  {
    image:
      "https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/perry-merrity-ii-gprji5r4rak-unsplash.jpg",
    heading: "Sophisticated Men's Fashion",
    subtext:
      "Redefine your wardrobe with tailored and elegant styles. Find classic and modern outfits suitable for every occasion.",
  },
  {
    image:
      "https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/perry-merrity-ii-gprji5r4rak-unsplash.jpg",
    heading: "Trendy Retail Clothing",
    subtext:
      "Discover the latest trends in retail fashion for all seasons. Shop styles that keep you ahead in fashion.",
  },
  {
    image:
      "https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/perry-merrity-ii-gprji5r4rak-unsplash.jpg",
    heading: "Sustainable Fashion",
    subtext:
      "Join the movement with eco-friendly, stylish clothing. Make a difference while looking great.",
  },
];

// Custom Arrow Components
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute left-4 z-10 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700`}
      style={{ transform: "translateY(-50%)" }}
      onClick={onClick}
    >
      &#8249;
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} absolute right-4 z-10 bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700`}
      style={{ transform: "translateY(-50%)" }}
      onClick={onClick}
    >
      &#8250;
    </button>
  );
};

function MainSection() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true, // Enable arrows
    prevArrow: <CustomPrevArrow />, // Use custom previous arrow
    nextArrow: <CustomNextArrow />, // Use custom next arrow
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen text-white overflow-hidden">
        {/* Slider */}
        <Slider {...sliderSettings} className="absolute inset-0 w-full h-full z-0">
          {slides.map((slide, index) => (
            <div key={index} className="relative w-full h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="object-cover object-center w-full h-full brightness-50"
                style={{ objectFit: "cover" }}
              />
              {/* Slide Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide leading-tight drop-shadow-lg">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl max-w-2xl text-gray-200 drop-shadow-md">
                  {slide.subtext}
                </p>
                <a
                  href="#products"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-3 px-10 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Shop Now
                </a>
              </div>
            </div>
          ))}
        </Slider>

        {/* Decorative Elements */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-16 w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-20 h-20 bg-pink-500 rounded-full opacity-25 blur-xl animate-spin-slow"></div>
      </div>

      {/* Featured Collections Section */}
      <div className="bg-gray-100 py-16 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Explore Our Featured Collections
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://media.burford.co.uk/images/SNY04089.jpg_edit.width-640_ln7jm6QxYVkHFHaT.jpg"
              alt="Men's Collection"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">Men's Collection</h3>
              <p className="text-gray-600">
                Experience premium quality and classic styles for every occasion.
              </p>
              <a
                href="#"
                className="block mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-full hover:bg-blue-600 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://omnitail.net/wp-content/uploads/2021/06/amazon-clothes-titlecards.png"
              alt="Women's Collection"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">Women's Collection</h3>
              <p className="text-gray-600">
                Explore stylish and chic options for your wardrobe refresh.
              </p>
              <a
                href="#"
                className="block mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-full hover:bg-blue-600 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://thegreenhubonline.com/wp-content/uploads/2021/07/My-year-of-no-new-clothes.jpg"
              alt="Sustainable Fashion"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">Sustainable Collection</h3>
              <p className="text-gray-600">
                Choose eco-friendly fashion that makes a statement.
              </p>
              <a
                href="#"
                className="block mt-4 bg-blue-500 text-white text-center py-2 px-4 rounded-full hover:bg-blue-600 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <ProductSection />
    </div>
  );
}

export default MainSection;
