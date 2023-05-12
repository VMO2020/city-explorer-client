import React from 'react';
import './movie.css';

export const Movie = ({ movie }) => {
	return (
		<div className="movie-card">
			<div className="card-image">
				{movie.poster_path && (
					<img
						src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
						alt={movie.title}
					/>
				)}
			</div>
			<div className="card-text">
				<p>Title: {movie.original_title}</p>
				<p>Overview: {movie.overview}</p>
			</div>
		</div>
	);
};
