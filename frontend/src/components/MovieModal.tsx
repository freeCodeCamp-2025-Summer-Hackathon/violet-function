'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Play, Plus } from 'lucide-react';

type MovieModalProps = {
  movie: {
    id: string;
    title: string;
    image: string;
    description: string;
  };
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-[#181818] text-white rounded-lg max-w-lg w-full overflow-hidden">
        <div className="relative h-[300px] w-full">
          <img
            src={movie.image || 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="text-sm text-gray-300 mb-4">{movie.description || 'No description available.'}</p>
          <div className="flex gap-3">
            <button className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200">
              <Play size={18} /> Play
            </button>
            <button className="bg-[#333] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#444]">
              <Plus size={18} /> Watchlist
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
