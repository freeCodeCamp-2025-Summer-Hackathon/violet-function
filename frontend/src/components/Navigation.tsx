"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

function getInitials(name: string) {
  return name ? name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "U";
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string, username: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setUser({ name: userObj.name, username: userObj.username });
        } catch { setUser(null); }
      } else {
        setUser(null);
      }
      const handleStorage = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            const userObj = JSON.parse(userStr);
            setUser({ name: userObj.name, username: userObj.username });
          } catch { setUser(null); }
        } else {
          setUser(null);
        }
      };
      // Listen for both storage and user-logged-in events
      window.addEventListener("storage", handleStorage);
      window.addEventListener("user-logged-in", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener("user-logged-in", handleStorage);
      };
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    router.push("/");
  };

  // Nav items based on auth
  const navItems = user
    ? [
        { href: "/", label: "Home" },
        { href: "/movies", label: "Movies" },
        { href: "/tv", label: "TV" },
        { href: "/groups", label: "Groups" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "#features", label: "Features" },
        { href: "/movies", label: "Movies" },
        { href: "/tv", label: "TV" },
      ];

  return (
    <div className="fixed left-1/2 top-8 z-50 flex justify-center w-full pointer-events-none" style={{ transform: "translateX(-50%)" }}>
      <nav className="bg-black/90 rounded-full shadow-lg flex px-6 py-2 gap-2 md:gap-6 border border-white/10 items-center pointer-events-auto" style={{ minWidth: 400 }}>
        <div className="flex-1 flex justify-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`px-6 py-2 rounded-full font-semibold text-base transition-all duration-200 font-secondary ${pathname === item.href ? "bg-white text-black shadow font-bold" : "text-white/80 hover:bg-white/10"}`}>{item.label}</Link>
          ))}
        </div>
        {/* Profile or Auth Buttons */}
        {user ? (
          <div className="relative ml-4" ref={profileRef}>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-lg border border-white/20 shadow hover:bg-gray-200 transition"
              onClick={() => setShowDropdown(v => !v)}
              aria-label="Profile"
            >
              {getInitials(user.name)}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-black/95 border border-white/10 rounded-lg shadow-lg z-50">
                <Link href="/dashboard" className="block px-4 py-2 text-white/90 hover:bg-white/10 rounded-t-lg" onClick={() => setShowDropdown(false)}>
                  Dashboard
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-white/10 rounded-b-lg"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-4">
            <Link href="/login" className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">Sign In</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
} 