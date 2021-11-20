import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './Detail.scss';

import routes from '../../constants/apiRoutes';
import MovieCard, { MovieCardProps } from '../../components/MovieCard/MovieCard';
import WishlistButton from '../../components/WishlistButton/WishlistButton';

interface MovieDetail {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  overview: string;
  genres: string[];
  release_date: string;
};

const Detail = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [similarMovies, setSimilarMovies] = useState<MovieCardProps[]>([]);
  const { movieId } = useParams() as {
    movieId: string;
  };

  useEffect(() => {
    const BASE_API_URL = process.env.REACT_APP_MOVIE_API_URL ?? '';
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY ?? '';
    const BASE_CONTENT_URL = process.env.REACT_APP_BASE_CONTENT_URL ?? '';
    const { getMovieDetail } = routes;

    axios.get(`${BASE_API_URL}/${getMovieDetail}/${movieId}?api_key=${API_KEY}`)
      .then(data => {
        const movie = data.data;
        const genres: { id: string; name: string }[] = movie.genres;

        setMovieDetail({
          title: movie.original_title as string,
          poster: `${BASE_CONTENT_URL}${movie.poster_path}` as string,
          backdrop: `${BASE_CONTENT_URL}${movie.backdrop_path}` as string,
          id: movieId,
          overview: movie.overview as string,
          genres: genres.map(genre => genre.name),
          release_date: movie.release_date,
        });
      })
      .catch(error => console.log(error));

    axios.get(`${BASE_API_URL}/${getMovieDetail}/${movieId}/similar?api_key=${API_KEY}`)
      .then(data => {
        const movies: any[] = data.data.results;

        setSimilarMovies(movies.slice(0, 6).map((m: any) => ({
          id: m.id,
          image: `${BASE_CONTENT_URL}${m.poster_path}`,
          overview: m.overview,
          title: m.original_title,
          year: m.release_date.split('-')[0]
        })));
      })
      .catch(error => console.log(error));
  }, [movieId]);

  if (!!!movieDetail) {
    return null;
  }

  return (
    <>
      <div className="detail__backdrop" style={{ backgroundImage: `url('${movieDetail.backdrop}')` }}></div>
      <div className="container">
        <div className="detail__header">
          <img className="detail__poster" src={`${movieDetail.poster}`} alt="" />
          <div className="detail__info">
            <p className="detail__title">{movieDetail.title} ({movieDetail.release_date.split('-')[0]}) <WishlistButton movieId={movieDetail.id} size="25" /></p>
            <p>{movieDetail.genres.join(', ')}</p>
            <p>{movieDetail.overview}</p>
          </div>
        </div>
        <p className="detail__similar-title">Similar Movies</p>
        <div className="movie-list">
          {similarMovies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Detail;