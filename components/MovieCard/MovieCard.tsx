import React from 'react';
import { Link } from 'react-router-dom';

import './MovieCard.scss';
export interface MovieCardProps {
  id: string;
  title: string;
  overview: string;
  image: string;
  year: string;
};

const MovieCard: React.FC<MovieCardProps> = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className="movie-card">
      <img className="movie-card__poster" src={props.image} alt="movie_poster" />
      <div className="movie-card__info">
        <p className="movie-card__title">{props.title} ({props.year})</p>
        <p className="movie-card__description">{props.overview.substring(0, 50) + '...'}</p>
      </div>
    </Link>
  );
};

export default MovieCard;