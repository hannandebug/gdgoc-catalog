import { useApp } from "../context/AppContext";

export default function TransactionPage() {
  const { transactions, clearTransactions } = useApp();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalSpent = transactions.reduce((acc, t) => acc + (t.totalPrice || t.price), 0);

  if (transactions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-6xl mb-4">🧾</p>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-2">
          Belum Ada Transaksi
        </h2>
        <p className="text-gray-400">Kamu belum melakukan order apapun.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">🧾 Transaksi</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {transactions.length} transaksi berhasil dilakukan
            </p>
          </div>
          <button
            onClick={clearTransactions}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-100 text-red-500 hover:bg-red-200 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🗑️ Hapus Semua
          </button>
        </div>

        {/* Total Pengeluaran */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
          <div>
            <p className="text-blue-200 text-sm font-medium">Total Pengeluaran</p>
            <p className="text-3xl font-bold mt-1">{formatPrice(totalSpent)}</p>
          </div>
          <div className="text-5xl">💸</div>
        </div>

        <div className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.orderId}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 flex gap-4 items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={transaction.image}
                alt={transaction.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <span className="text-xs text-blue-500 font-semibold uppercase tracking-wide">
                  {transaction.category}
                </span>
                <h3 className="font-bold text-gray-800 dark:text-white text-base">
                  {transaction.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {formatPrice(transaction.price)} x {transaction.quantity || 1}
                </p>
                <p className="text-blue-600 font-bold">
                  {formatPrice(transaction.totalPrice || transaction.price)}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  🕐 {transaction.date}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Sukses
                </span>
                <p className="text-gray-400 text-xs mt-2">
                  {transaction.orderId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}