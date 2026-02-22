import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { wishlist, darkMode, setDarkMode } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Catalog" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/transactions", label: "Transaksi" },
  ];

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-400">
          ⚡ TechStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-colors hover:text-blue-400 ${
                location.pathname === link.path
                  ? "text-blue-400"
                  : "text-gray-300"
              }`}
            >
              {link.label}
              {link.path === "/wishlist" && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 p-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 dark:bg-gray-950 px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`relative font-medium py-2 border-b border-gray-700 transition-colors hover:text-blue-400 flex items-center justify-between ${
                location.pathname === link.path
                  ? "text-blue-400"
                  : "text-gray-300"
              }`}
            >
              {link.label}
              {link.path === "/wishlist" && wishlist.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-1 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-sm font-semibold"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}