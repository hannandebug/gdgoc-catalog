import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function playOrderSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const times = [0, 0.15, 0.3];
  const freqs = [523, 659, 784];
  times.forEach((t, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freqs[i];
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.3);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.3);
  });
}

export default function ProductCard({ product }) {
  const { addToWishlist, removeFromWishlist, isWishlisted, placeOrder } = useApp();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const wishlisted = isWishlisted(product.id);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleOrder = () => {
    playOrderSound();
    placeOrder(product);
    setShowConfirm(false);
  };

  return (
    <>
      {showConfirm && createPortal(
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <p className="text-2xl text-center mb-2">🛒</p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-1">
              Konfirmasi Order
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-1">
              {product.name}
            </p>
            <p className="text-blue-600 font-bold text-center mb-5">
              {formatPrice(product.price)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Batal
              </button>
              <button
                onClick={handleOrder}
                className="flex-1 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Ya, Order!
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group">
        <div className="overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">
            {product.category}
          </span>
          <h3
            onClick={() => navigate(`/product/${product.id}`)}
            className="font-bold text-gray-800 dark:text-white text-base mb-1 line-clamp-2 cursor-pointer hover:text-blue-500 transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 flex-1 line-clamp-3">
            {product.description}
          </p>
          <p className="text-blue-600 font-bold text-lg mb-4">
            {formatPrice(product.price)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                wishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                wishlisted
                  ? "bg-red-100 text-red-500 hover:bg-red-200"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              {wishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              🛒 Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}