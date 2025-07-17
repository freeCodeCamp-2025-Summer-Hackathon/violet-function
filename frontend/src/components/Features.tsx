"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Vote, Star, TrendingUp, Heart, Zap } from "lucide-react";

export default function Features() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Create Groups",
      description: "Start a group and invite friends to share your passion for great content",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Vote Together",
      description: "Democratically decide what to watch next with group voting",
      icon: Vote,
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Track & Rate",
      description: "Keep your personal watchlist and rate everything you watch",
      icon: Star,
      color: "from-orange-500 to-red-500",
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

  const additionalFeatures = [
    {
      title: "Smart Recommendations",
      description: "AI-powered suggestions based on your group's preferences",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Watch Together",
      description: "Synchronized viewing with real-time chat and reactions",
      icon: Heart,
      color: "from-rose-500 to-pink-500"
    },
    {
      title: "Instant Sync",
      description: "Real-time updates across all group members",
      icon: Zap,
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-primary">
            Everything You Need
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-secondary">
            From creating groups to tracking your watchlist, SceneSwap has all the features you need for the perfect movie night.
          </p>
        </motion.div>
        
        {/* Main Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:scale-105 ${
                currentFeature === index ? 'ring-2 ring-purple-500/50' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 transition-opacity duration-300 ${
                currentFeature === index ? 'opacity-20' : ''
              }`} />
              
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 relative z-10`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10 font-primary">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed relative z-10 font-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4 font-primary">
            And So Much More
          </h3>
          <p className="text-lg text-white/60 font-secondary">
            Discover additional features that make SceneSwap the ultimate collaborative viewing platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2 font-primary">{feature.title}</h4>
              <p className="text-white/60 text-sm font-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
} 