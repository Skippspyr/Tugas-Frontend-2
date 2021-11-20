import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Search from '../../components/Search/Search';
import MovieCard, { MovieCardProps } from '../../components/MovieCard/MovieCard';
import routes from '../../constants/apiRoutes';
import WishlistButton from '../../components/WishlistButton/WishlistButton';

const Home = () => {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);

  useEffect(() => {
    const BASE_API_URL = process.env.REACT_APP_MOVIE_API_URL ?? '';
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY ?? '';
    const BASE_CONTENT_URL = process.env.REACT_APP_BASE_CONTENT_URL ?? '';
    const { discoverMovie: discoverMovieUrl } = routes;

    axios.get(`${BASE_API_URL}${discoverMovieUrl}?api_key=${API_KEY}`)
      .then(data => {
        setMovies(prevMovies => {
          const response = data.data;
          const result: MovieCardProps[] = response.results.map((r: any) => ({
            id: r.id,
            image: `${BASE_CONTENT_URL}${r.poster_path}`,
            overview: r.overview,
            title: `${r.original_title}`,
            year: r.release_date.split('-')[0]
          } as MovieCardProps));

          return prevMovies.concat(result);
        })
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center home-brand">Movie List</h1>
      <Search />
      <div className="movie-list">
        {movies.map(movies => (
          <MovieCard key={movies.title} {...movies} />
        ))}
      </div>
    </div>
  );
};

export default Home;