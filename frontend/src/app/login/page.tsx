"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import "../signup/InfiniteScroll.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const InfiniteScroll = dynamic(() => import("../signup/InfiniteScroll"), { ssr: false });

const items = [
  { content: "Inception" },
  { content: "The Godfather" },
  { content: "Pulp Fiction" },
  { content: "The Dark Knight" },
  { content: "Forrest Gump" },
  { content: "Interstellar" },
  { content: "Fight Club" },
  { content: "The Matrix" },
  { content: "Parasite" },
  { content: "The Shawshank Redemption" },
  { content: "La La Land" },
  { content: "Spirited Away" },
  { content: "Whiplash" },
  { content: "The Social Network" },
  { content: "Avengers: Endgame" },
  { content: "The Grand Budapest Hotel" },
  { content: "Joker" },
  { content: "Gladiator" },
  { content: "Coco" },
  { content: "Mad Max: Fury Road" },
];

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
      } else {
        // Store user info in localStorage for now (token-based auth can be added later)
        localStorage.setItem("user", JSON.stringify(data));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("user-logged-in"));
        }
        router.push("/");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black/90">
      <div className="flex-1 flex flex-col md:flex-row items-stretch justify-center">
        {/* Left: Animated InfiniteScroll with fade overlay */}
        <div
          className="flex-1 flex items-center justify-center relative p-0 m-0"
          style={{
            background: "linear-gradient(90deg, rgba(139,92,246,0.35) 0%, rgba(236,72,153,0.25) 45%, transparent 90%)"
          }}
        >
          <div style={{ height: "100vh", width: "100%", maxWidth: "100%", position: "relative" }}>
            <InfiniteScroll
              items={items}
              isTilted={true}
              tiltDirection="left"
              autoplay={true}
              autoplaySpeed={1}
              autoplayDirection="down"
              pauseOnHover={true}
              width="100%"
              maxHeight="100vh"
            />
            {/* Fade overlay on right edge to blend with black background */}
            <div className="fade-side" />
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 flex items-center justify-center bg-black/60 backdrop-blur-lg p-8 md:p-12">
          <div className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10 bg-black/60 backdrop-blur-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-white font-primary">Sign In</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-white/80 font-secondary" htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-white/10 text-white font-secondary border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your username" required />
              </div>
              <div>
                <label className="block mb-1 text-white/80 font-secondary" htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-white/10 text-white font-secondary border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold font-secondary text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all" disabled={loading}>{loading ? "Signing In..." : "Sign In"}</button>
              {error && <div className="text-red-400 text-center mt-2">{error}</div>}
            </form>
            <p className="mt-6 text-center text-white/60 font-secondary">
              Don&apos;t have an account? <Link href="/signup" className="text-purple-400 hover:underline font-semibold">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 