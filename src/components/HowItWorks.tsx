"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Users, Vote, Star, ArrowRight, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: 1,
      title: "Create a Group",
      description: "Start a new group and invite your friends. Set up your preferences and get ready to discover amazing content together.",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      details: [
        "Choose a group name and description",
        "Invite friends via email or link",
        "Set group preferences and genres"
      ]
    },
    {
      number: 2,
      title: "Suggest & Vote",
      description: "Add your favorite shows and movies to the group. Vote on what to watch next and let democracy decide your entertainment.",
      icon: Vote,
      color: "from-blue-500 to-cyan-500",
      details: [
        "Add movies and shows to the group",
        "Vote on upcoming content",
        "See real-time voting results"
      ]
    },
    {
      number: 3,
      title: "Track & Rate",
      description: "Keep track of what you've watched, rate your experiences, and build your personal watchlist for future reference.",
      icon: Star,
      color: "from-orange-500 to-red-500",
      details: [
        "Mark content as watched",
        "Rate and review everything",
        "Build your personal watchlist"
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-primary">
            How It Works
          </h2>
          <p className="text-xl text-white/60 font-secondary">
            Three simple steps to start your collaborative viewing experience
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-500 ${
                activeStep === index 
                  ? 'bg-white/10 backdrop-blur-sm border-2 border-purple-500/50' 
                  : 'bg-white/5 backdrop-blur-sm border border-white/10'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Step Number */}
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-6 relative`}
                animate={activeStep === index ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {activeStep === index ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CheckCircle className="w-8 h-8" />
                  </motion.div>
                ) : (
                  step.number
                )}
              </motion.div>

              {/* Step Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 text-center font-primary">{step.title}</h3>
              <p className="text-white/70 text-center mb-6 font-secondary">{step.description}</p>

              {/* Step Details */}
              <div className="space-y-3">
                {step.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: activeStep === index ? 1 : 0.7, 
                      x: activeStep === index ? 0 : -20 
                    }}
                    transition={{ delay: detailIndex * 0.1 }}
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                    <span className="text-white/80 text-sm font-secondary">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Arrow to next step */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                  animate={activeStep === index ? { x: [0, 10, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="w-8 h-8 text-purple-400" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <motion.div 
          className="flex justify-center mt-12 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 0.8 }}
        >
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                  : 'bg-white/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
} 