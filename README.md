# ⚡ TechStore - Product Catalog App

Aplikasi katalog produk elektronik berbasis React yang dibangun sebagai Final Project Web Development Pathway **Google Developer Groups on Campus Universitas Sumatera Utara (GDGoC USU)**.

## 🌐 Live Demo
[Link Demo](https://gdgoc-catalog.vercel.app/)

## ✨ Fitur

### Core Features
- 🛍️ **Product Catalog** — 30 produk elektronik dalam tampilan grid responsif
- ❤️ **Wishlist** — Tambah, lihat, dan hapus produk dari wishlist
- 🛒 **Order System** — Pesan produk dari catalog maupun wishlist
- 🧾 **Transaction History** — Riwayat semua transaksi dengan detail lengkap

### Bonus Features
- 🔍 **Search & Sort** — Cari produk dan urutkan berdasarkan harga/nama
- 🏷️ **Filter Kategori** — Filter produk berdasarkan kategori
- 🌙 **Dark Mode** — Toggle antara light dan dark mode
- 📄 **Halaman Detail Produk** — Info lengkap produk + pilih quantity
- 🔔 **Toast Notification** — Feedback visual untuk setiap aksi
- 🔊 **Suara Order** — Efek suara saat order berhasil
- ✅ **Konfirmasi Order** — Popup konfirmasi sebelum order diproses
- 💀 **Loading Skeleton** — Animasi loading saat halaman pertama dibuka
- 📱 **Responsive Design** — Tampilan optimal di HP, tablet, dan desktop
- 🎨 **Animasi** — Page transition, hover effects, dan animasi tombol
- 🔝 **Scroll to Top** — Tombol kembali ke atas halaman

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|---|---|
| React 19 | UI Library |
| Vite | Build Tool |
| React Router DOM | Routing |
| Tailwind CSS | Styling |
| React Hot Toast | Notifikasi |
| Context API | State Management |

## 📁 Struktur Project
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ScrollToTop.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   └── products.js
├── pages/
│   ├── CatalogPage.jsx
│   ├── WishlistPage.jsx
│   ├── TransactionPage.jsx
│   └── ProductDetailPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🚀 Cara Menjalankan

1. Clone repository ini
```bash
git clone https://github.com/hannandebug/gdgoc-catalog.git
```

2. Masuk ke folder project
```bash
cd gdgoc-catalog
```

3. Install dependencies
```bash
npm install
```

4. Jalankan development server
```bash
npm run dev
```

5. Buka browser dan akses `http://localhost:5173`

## 👤 Author

**Hannan Rava Mahardika** — [GitHub](https://github.com/hannandebug)

GDGoC USU — Web Development Pathway 2025/2026