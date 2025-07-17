"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Sparkles, Users, Star } from "lucide-react";

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  const testimonials = [
    {
      text: "SceneSwap transformed our movie nights!",
      author: "Sarah & Friends",
      rating: 5
    },
    {
      text: "Finally, no more arguing about what to watch!",
      author: "Movie Club",
      rating: 5
    },
    {
      text: "The best way to discover new content together.",
      author: "Film Enthusiasts",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"
              animate={isHovered ? { scale: 1.2, opacity: 0.5 } : { scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl"
              animate={isHovered ? { scale: 1.2, opacity: 0.5 } : { scale: 1, opacity: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6 font-secondary"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Join 10,000+ happy users</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-primary">
              Ready to Transform Your Movie Nights?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-secondary">
              Join thousands of groups already using SceneSwap to discover and enjoy amazing content together.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button 
                className="bg-white text-black px-12 py-4 rounded-xl text-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg font-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-black transition-all duration-200 font-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm mb-3 italic font-secondary">"{testimonial.text}"</p>
                  <p className="text-white/60 text-xs font-secondary">— {testimonial.author}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center items-center space-x-8 mt-8 text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm font-secondary">10K+ Groups</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span className="text-sm font-secondary">50K+ Ratings</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
} 