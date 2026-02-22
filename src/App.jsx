import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import CatalogPage from "./pages/CatalogPage";
import WishlistPage from "./pages/WishlistPage";
import TransactionPage from "./pages/TransactionPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navbar />
          <AnimatedRoutes />
          <ScrollToTop />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}