import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import AllProducts from "./components/Products/AllProducts";
import ContactPage from "./pages/ContactPage/ContactPage";
import Login from "./pages/LoginPage/login";
import Checkout from "./components/Checkout";
import AdminDashboard from "./pages/AdminPanel/pages/Dashboard";
import UserPage from "./pages/AdminPanel/pages/UserPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import AdminApp from "./AdminApp"; // Import AdminApp
import { CartProvider } from "./context/cartContext";

function App() {
  const hideNavbarFooterRoutes = ["/login", "/admin", "/admin/users","/admin/categorios","/admin/products"];
  const location = useLocation(); // Use useLocation hook
  const currentPath = location.pathname;

  return (
    <CartProvider>
      <div className="App">
        {/* Hide Navbar and Footer on specified routes */}
        {!hideNavbarFooterRoutes.includes(currentPath) && <Navbar />}
        <Routes>
          {/* Main App Routes */}
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

          {/* Admin Panel */}
          <Route path="/*" element={<AdminApp />} /> {/* Admin routes */}
        </Routes>
        {!hideNavbarFooterRoutes.includes(currentPath) && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
