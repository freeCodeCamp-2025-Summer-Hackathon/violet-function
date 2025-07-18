'use client';

import { Movie } from '@/types';
import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface Props {
  title: string;
  movies: Movie[];
  onCardClick: (movie: Movie) => void;
}

export default function MovieRow({ title, movies, onCardClick }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
    scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
  };

  if (!movies?.length) return null;

  return (
    <section className="mb-8 relative group">
      <h2 className="text-xl md:text-2xl font-bold mb-3 px-1 text-white">{title}</h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden group-hover:flex items-center justify-center bg-black/50 text-white rounded-full w-10 h-10"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide gap-3 px-2 scroll-smooth"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[150px] max-w-[150px]">
            <MovieCard movie={movie} onClick={() => onCardClick(movie)} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden group-hover:flex items-center justify-center bg-black/50 text-white rounded-full w-10 h-10"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
