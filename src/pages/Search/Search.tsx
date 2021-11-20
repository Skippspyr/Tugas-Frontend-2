import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import './SearchPage.scss';

import SearchComponent from '../../components/Search/Search';
import MovieCard, { MovieCardProps } from '../../components/MovieCard/MovieCard';
import routes from '../../constants/apiRoutes';


const Search = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const { query } = useParams() as {
    query: string
  };

  useEffect(() => {
    const BASE_API_URL = process.env.REACT_APP_MOVIE_API_URL ?? '';
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY ?? '';
    const BASE_CONTENT_URL = process.env.REACT_APP_BASE_CONTENT_URL ?? '';
    const { searchMovie } = routes;

    axios.get(`${BASE_API_URL}${searchMovie}?api_key=${API_KEY}&query=${query}`)
      .then(data => {
        const fetchedMovies: any[] = data.data.results;
        setMovies(() => fetchedMovies.map(m => {
          const dropdownItemObject: MovieCardProps = {
            id: m.id,
            title: m.original_title,
            image: `${BASE_CONTENT_URL}${m.poster_path}`,
            overview: m.overview,
            year: m.release_date.split('-')[0]
          }

          return dropdownItemObject;
        }));
      })
      .catch(error => console.log(error));
  }, [query]);

  return (
    <div className="container">
      <h1 className="text-center home-brand">Movie List</h1>
      <SearchComponent defaultSearch={query} />
      <p className="query-text">Search result for: {query}</p>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.title} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;