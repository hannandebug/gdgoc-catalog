import { useState } from "react";
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

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, placeOrder } = useApp();
  const [confirmProduct, setConfirmProduct] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalWishlist = wishlist.reduce((acc, item) => acc + item.price, 0);

  const handleOrder = () => {
    playOrderSound();
    placeOrder(confirmProduct);
    setConfirmProduct(null);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-6xl mb-4">🤍</p>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          Wishlist Kosong
        </h2>
        <p className="text-gray-400">
          Belum ada produk yang kamu tambahkan ke wishlist.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Popup Konfirmasi */}
      {confirmProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <p className="text-2xl text-center mb-2">🛒</p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white text-center mb-1">
              Konfirmasi Order
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-1">
              {confirmProduct.name}
            </p>
            <p className="text-blue-600 font-bold text-center mb-5">
              {formatPrice(confirmProduct.price)}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmProduct(null)}
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
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              ❤️ Wishlist
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {wishlist.length} produk di wishlist kamu
            </p>
          </div>

          {/* Total Wishlist */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm font-medium">Total Estimasi Harga</p>
              <p className="text-3xl font-bold mt-1">{formatPrice(totalWishlist)}</p>
            </div>
            <div className="text-5xl">🛍️</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-gray-800 dark:text-white text-base mb-1">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-lg mb-4">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="flex-1 py-2 rounded-xl text-sm font-semibold bg-red-100 text-red-500 hover:bg-red-200 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      🗑️ Hapus
                    </button>
                    <button
                      onClick={() => setConfirmProduct(product)}
                      className="flex-1 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      🛒 Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}