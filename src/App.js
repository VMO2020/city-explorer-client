import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Map } from './components/map/Map';
import { Weather } from './components/weather/weather';
import { Movies } from './components/movies/movies';

function App() {
	const [searchQuery, setSearchQuery] = useState('');
	const [location, setLocation] = useState({});
	const [locationMap, setLocationMap] = useState('');
	const [locationWeather, setLocationWeather] = useState('');
	const [locationWeatherData, setLocationWeatherData] = useState('');
	const [moviesData, setMoviesData] = useState([]);
	const [reset, setReset] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const handleChange = (event) => {
		// console.log(event.target.value);
		setSearchQuery(event.target.value);
	};

	const handleReset = () => {
		setSearchQuery('');
		setLocation({});
		setLocationMap('');
		setLocationWeather('');
		setLocationWeatherData('');
		setMoviesData([]);
		setErrorMsg('');
		setReset(false);
	};

	const getLocation = async () => {
		try {
			const API = `https://eu1.locationiq.com/v1/search?key=${
				process.env.REACT_APP_ACCESS_TOKEN
			}&q=${searchQuery.toLowerCase()}&format=json`;
			const data = await axios.get(API);
			// console.log(data.data[0]);
			setLocation(data.data[0]);
			getMap(data);
			getWeather(data);
			getMovies(data);
			setErrorMsg('');
			setReset(true);
		} catch (error) {
			console.error(error.message);
			setErrorMsg('City not found: ' + error.message);
			setReset(true);
		}
	};

	const getMap = async (data) => {
		try {
			// console.log(data.data[0]);
			let lat = data.data[0].lat;
			let lon = data.data[0].lon;

			const API2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_ACCESS_TOKEN}&center=${lat},${lon}&size=600x600&zoom=12&path=fillcolor:%2390EE90|weight:2|color:blue|17.452945,78.380055|17.452765,78.382026|17.452020,78.381375|17.452045,78.380846|17.452945,78.380055`;
			const map = await axios.get(API2);
			// console.log(map.config.url);
			setLocationMap(map.config.url);
		} catch (error) {
			console.error(error);
			setErrorMsg('Map not found: ' + error.message);
			setReset(true);
		}
	};

	const getWeather = async (data) => {
		try {
			let city = data.data[0].display_name.split(',')[0];
			// console.log(city);
			const API3 = `http://localhost:8080/weather?city=${city}`;
			const weather = await axios.get(API3);
			// console.log(weather.data.location);
			setLocationWeatherData(weather.data.location);
			// console.log(weather.data.current);
			setLocationWeather(weather.data.current);
		} catch (error) {
			console.error(error);
			setErrorMsg('Weather not found: ' + error.message);
			setReset(true);
		}
	};

	const getMovies = async (data) => {
		// https://image.tmdb.org/t/p/original/1E5gNpiBd7gUUNxXEHWBGTBRsOT.jpg
		try {
			let city = data.data[0].display_name.split(',')[0];
			// console.log('Movies: ', city);
			const API4 = `http://localhost:8080/movies?city=${city}`;
			const movies = await axios.get(API4);
			// console.log(movies.data.results);
			setMoviesData(movies.data.results);
		} catch (error) {
			console.error(error);
			setErrorMsg('Movies not found: ' + error.message);
			setReset(true);
		}
	};

	return (
		<div className="App">
			<h1>City Explorer</h1>
			<input
				value={searchQuery}
				onChange={handleChange}
				placeholder="Place name"
			/>

			{reset ? (
				<button onClick={handleReset}>Reset</button>
			) : (
				<button onClick={getLocation}>Explore</button>
			)}
			<h2>{location.display_name}</h2>

			{location.lat && (
				<div className="data-container">
					<p>
						<span>lat: </span>
						{location.lat}
					</p>
					<p>
						<span>lon: </span>
						{location.lon}
					</p>
				</div>
			)}
			<p style={{ color: 'red' }}>{errorMsg}</p>

			<Map locationMap={locationMap} />
			<Weather
				locationWeather={locationWeather}
				locationWeatherData={locationWeatherData}
			/>
			<Movies moviesData={moviesData} />
		</div>
	);
}

export default App;
