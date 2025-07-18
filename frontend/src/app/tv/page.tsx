'use client';

import { useEffect, useState } from 'react';
import MovieRow from '@/components/MovieRow';
import SearchBar from '@/components/SearchBar';
import { Movie } from '@/types';

const CATEGORIES = [
  { title: 'Recommended', query: 'Elite' },
  { title: 'Drama Shows', query: 'The Crown' },
  { title: 'Comedy Shows', query: 'Brooklyn Nine-Nine' },
];

export default function MoviesPage() {
  const [rows, setRows] = useState<Record<string, Movie[]>>({});
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const fetchMovies = async (query: string): Promise<Movie[]> => {
    const res = await fetch(`https://search.imdbot.workers.dev/?q=${query}`);
    const data = await res.json();
    return (
      data?.description?.map((m: any, i: number) => ({
        id: m.id || i.toString(),
        title: m['#TITLE'],
        image: m['#IMG_POSTER'],
        description: m['#YEAR'],
      })) || []
    );
  };

  useEffect(() => {
    const loadAll = async () => {
      const result: Record<string, Movie[]> = {};
      await Promise.all(
        CATEGORIES.map(async (cat) => {
          const movies = await fetchMovies(cat.query);
          result[cat.title] = movies;
        })
      );
      setRows(result);
    };
    loadAll();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    const results = await fetchMovies(query);
    setSearchResults(results);
  };

  const handleCardClick = (movie: Movie) => {
    alert(`Clicked on ${movie.title}`);
  };

  return (
    <main className="p-4 pt-24">
      <h1 className="text-3xl font-bold text-white mb-4">Browse</h1>

      {/* 🔍 Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* 🔎 Search Results */}
      {searchResults.length > 0 && (
        <MovieRow
          title="Search Results"
          movies={searchResults}
          onCardClick={handleCardClick}
        />
      )}

      {/* 🧩 Default Categories */}
      {CATEGORIES.map(({ title }) => (
        <MovieRow
          key={title}
          title={title}
          movies={rows[title] || []}
          onCardClick={handleCardClick}
        />
      ))}
    </main>
  );
}
