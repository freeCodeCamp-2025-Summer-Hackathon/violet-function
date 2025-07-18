'use client';

import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mb-6 px-2"
    >
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 border rounded text-white bg-transparent hover:bg-purple-500 hover:bg-opacity-20 transition"
        style={{ borderColor: 'var(--color-purple-500)' }}
      >
        Search
      </button>
    </form>
  );
}
