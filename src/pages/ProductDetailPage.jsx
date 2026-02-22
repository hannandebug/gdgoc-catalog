import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import products from "../data/products";

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

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isWishlisted, placeOrder } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          Produk tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
        >
          Kembali ke Catalog
        </button>
      </div>
    );
  }

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
    placeOrder(product, quantity);
    setShowConfirm(false);
  };

  return (
    <>
      {/* Popup Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <p className="text-2xl text-center mb-2">🛒</p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-1">
              Konfirmasi Order
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-1">
              {product.name} x{quantity}
            </p>
            <p className="text-blue-600 font-bold text-center mb-5">
              {formatPrice(product.price * quantity)}
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
        </div>
      )}

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Tombol Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors font-medium"
          >
            ← Kembali
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            {/* Gambar */}
            <div className="md:w-1/2 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 md:h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info Produk */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-1 mb-3">
                  {product.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-3xl font-bold text-blue-600 mb-6">
                  {formatPrice(product.price)}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">Jumlah:</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 transition-all hover:scale-110 active:scale-95"
                    >
                      −
                    </button>
                    <span className="text-lg font-bold text-gray-800 dark:text-white w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 transition-all hover:scale-110 active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {quantity > 1 && (
                  <p className="text-sm text-gray-400 mb-4">
                    Total: <span className="text-blue-600 font-bold">{formatPrice(product.price * quantity)}</span>
                  </p>
                )}
              </div>

              {/* Tombol */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    wishlisted
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                    wishlisted
                      ? "bg-red-100 text-red-500 hover:bg-red-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {wishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
                </button>
                <button
                  onClick={() => setShowConfirm(true)}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  🛒 Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}