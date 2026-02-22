import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
      toast.success(`${product.name} ditambahkan ke wishlist! ❤️`);
    }
  };

  const removeFromWishlist = (productId, showToast = true) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
    if (showToast) {
      toast.error(`Produk dihapus dari wishlist! 🗑️`);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const placeOrder = (product, quantity = 1) => {
    const transaction = {
      ...product,
      quantity,
      totalPrice: product.price * quantity,
      orderId: "ORD-" + Date.now(),
      date: new Date().toLocaleString("id-ID"),
    };
    setTransactions([transaction, ...transactions]);
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    removeFromWishlist(product.id, false);
    if (isInWishlist) {
      toast.success(`${product.name} diorder & dihapus dari wishlist! 🛒`, {
        style: { background: "#1d4ed8", color: "#fff" },
      });
    } else {
      toast.success(`Order ${product.name} berhasil! 🛒`, {
        style: { background: "#1d4ed8", color: "#fff" },
      });
    }
  };

  const clearTransactions = () => {
    setTransactions([]);
    toast.success("Semua transaksi dihapus! 🗑️");
  };

  return (
    <AppContext.Provider
      value={{
        wishlist,
        transactions,
        darkMode,
        setDarkMode,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        placeOrder,
        clearTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}