import React from 'react';
import './movies.css';
import { Movie } from './movie';

export const Movies = ({ moviesData }) => {
	return (
		<div className="movies-container">
			{moviesData && moviesData.map((movie) => <Movie movie={movie} />)}
		</div>
	);
};
