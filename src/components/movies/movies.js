import React from 'react';
import './movies.css';
import { Movie } from './movie';

export const Movies = ({ moviesData }) => {
	return (
		<>
			{moviesData.length > 0 && (
				<div className="main-container">
					<h2>MOVIES:</h2>
					<div className="movies-container">
						{moviesData &&
							moviesData.map((movie) => (
								<div key={movie.id}>
									<Movie movie={movie} />
								</div>
							))}
					</div>
				</div>
			)}
		</>
	);
};
