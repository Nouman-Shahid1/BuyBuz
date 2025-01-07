import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import ServicesPage from './ServicesPage/ServicesPage';
import AllProducts from './components/Products/AllProducts';
import ContactPage from './components/contactPage/ContactPage';
import Login from './pages/LoginPage/login';
import Checkout from './components/Checkout';
import AdminDashboard from './pages/AdminPanel/Dashboard';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  const hideNavbarFooterRoutes = ['/login', '/admin'];
  const currentPath = window.location.pathname;

  return (
    <div className="App">
      {!hideNavbarFooterRoutes.includes(currentPath) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      {!hideNavbarFooterRoutes.includes(currentPath) && <Footer />}
    </div>
  );
}

export default App;