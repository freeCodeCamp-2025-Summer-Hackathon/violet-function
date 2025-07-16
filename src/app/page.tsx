"use client";

import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { Oswald } from 'next/font/google';

const oswald = Oswald({
  subsets: ['latin'],
  weight: '500',
});

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
