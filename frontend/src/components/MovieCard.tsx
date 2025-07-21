'use client';
import { useState } from 'react';
import { Movie } from '@/types';
import Image from 'next/image';
import { PlayCircle, PlusCircle } from 'lucide-react';

interface Props {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: Props) {
 
  const [showPopup, setShowPopup] = useState(false);

 const handleSelect = async (type: 'personal' | 'group') => {
  // placeholder user and group IDs for now
  const userId = 1;    // replace with actual logged-in user ID later
  const groupId = 1;   // replace with actual group ID if needed

  try {
    const response = await fetch('https://5000-arakhshq-violetfunction-iahylmjzbha.ws-us120.gitpod.io/api/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        movie_id: movie.id,
        type: type,
        user_id: type === 'personal' ? userId : undefined,
        group_id: type === 'group' ? groupId : undefined,
      }),
    });

    if (response.ok) {
      alert(`Added "${movie.title}" to ${type} watchlist!`);
      setShowPopup(false);
    } else {
      const data = await response.json();
      alert(`Failed to add to watchlist: ${data.error || response.statusText}`);
    }
  } catch (error) {
    alert('Network error: Could not add to watchlist');
  }
};
  return (
    <>
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
    setShowPopup(true);
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
    {showPopup && (
 <div
  className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50
             animate-fadeIn"
  style={{ animationDuration: '0.5s' }}
>
    <div className="bg-white p-6 rounded shadow-lg w-80 text-center space-y-4">
      <h3 className="text-lg font-bold">Add to Watchlist</h3>
      <button
       className="w-full bg-[var(--color-purple-500)] hover:bg-[var(--color-purple-600)] text-white py-2 rounded cursor-pointer"
        onClick={() => handleSelect('personal')}
      >
        Personal Watchlist
      </button>
      <button
      className="w-full bg-[var(--color-purple-500)] hover:bg-[var(--color-purple-600)] text-white py-2 rounded cursor-pointer"
        onClick={() => handleSelect('group')}
      >
        Group Watchlist
      </button>
      <button
       className="text-sm text-gray-600 hover:underline hover:text-black mt-2 cursor-pointer"
        onClick={() => setShowPopup(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
</>
  );
}
