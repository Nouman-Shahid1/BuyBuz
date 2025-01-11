import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import AllProducts from "./components/Products/AllProducts";
import ContactPage from "./pages/ContactPage/ContactPage";
import Login from "./pages/LoginPage/login";
import Checkout from "./pages/CheckoutPage/checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import AdminApp from "./AdminApp";
import { CartProvider } from "./context/cartContext";

function App() {
  const hideNavbarFooterRoutes = ["/login", "/admin", "/admin/users", "/admin/categorios", "/admin/products","/admin/orders"];
  const location = useLocation();
  const currentPath = location.pathname;

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
          <Route path="/*" element={<AdminApp />} />
        </Routes>
        {!hideNavbarFooterRoutes.includes(currentPath) && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
