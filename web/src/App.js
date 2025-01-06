import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage'; // Create this component
import ServicesPage from './ServicesPage/ServicesPage';
import AllProducts from './components/Products/AllProducts';
import ContactPage from './components/contactPage/ContactPage';
import Login from '../src/Login/login';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/services" element={<ServicesPage />} /> 
          <Route path="/products" element={<AllProducts />} /> 
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/login" element={<Login/>} /> 




        </Routes>
        <Footer/>
      </div>

  );
}

export default App;
