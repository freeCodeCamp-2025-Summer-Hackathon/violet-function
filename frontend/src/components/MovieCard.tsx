'use client';

import { Movie } from '@/types';
import Image from 'next/image';
import { PlayCircle, PlusCircle } from 'lucide-react';

interface Props {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      className="relative w-[150px] cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={movie.image || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          width={300}
          height={450}
          className="w-full h-auto object-cover rounded-lg"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 p-2">
          <h3 className="text-white text-sm font-semibold mb-2 line-clamp-2">
            {movie.title}
          </h3>

          <div className="flex flex-wrap justify-between gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert(`Play "${movie.title}"`);
              }}
              className="flex-1 flex items-center justify-center gap-1 text-xs text-white border px-2 py-1 rounded-md transition
                         border-[var(--color-purple-500)] bg-transparent hover:bg-[var(--color-purple-500)]"
            >
              <PlayCircle size={16} />
              Play
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                alert(`Added "${movie.title}" to Watchlist`);
              }}
              className="flex-1 flex items-center justify-center gap-1 text-xs text-white border px-2 py-1 rounded-md transition
                         border-white bg-transparent hover:bg-white hover:text-black"
            >
              <PlusCircle size={16} />
              Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
