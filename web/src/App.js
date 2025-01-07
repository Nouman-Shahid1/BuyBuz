import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import AllProducts from './components/Products/AllProducts';
import ContactPage from './pages/ContactPage/ContactPage';
import Login from './pages/LoginPage/login';
import Checkout from './components/Checkout';
import AdminDashboard from './pages/AdminPanel/Dashboard';
import UserPage from './pages/AdminPanel/UserPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import { CartProvider } from "./context/cartContext";

function App() {
  const hideNavbarFooterRoutes = ['/login', '/admin', '/admin/users'];
  const currentPath = window.location.pathname;

  return (
    <CartProvider>
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
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UserPage />
              </AdminRoute>
            }
          />
        </Routes>
        {!hideNavbarFooterRoutes.includes(currentPath) && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
