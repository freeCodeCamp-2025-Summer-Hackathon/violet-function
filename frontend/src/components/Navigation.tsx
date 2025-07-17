"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg transition-all duration-300 hover:bg-black/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between gap-4">
          {/* Brand */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg font-primary">S</span>
            </div>
            <span className="text-white font-bold text-xl font-primary">SceneSwap</span>
          </motion.div>

          {/* Centered Nav Links */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors font-secondary px-3 py-1 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={item.href === "/" ? handleHomeClick : undefined}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right-side Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/login" className="contents">
              <motion.button
                className="text-white/80 hover:text-white transition-colors font-secondary px-4 py-2 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                Sign In
              </motion.button>
            </Link>
            <Link href="/signup" className="contents">
              <motion.button
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-white/80 hover:text-black transition-all duration-200 font-semibold font-secondary shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                Get Started
              </motion.button>
            </Link>
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white font-secondary ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-white/80 hover:text-white transition-colors font-secondary"
                onClick={item.href === "/" ? (e) => { handleHomeClick(e); setIsMenuOpen(false); } : () => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
} 