import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaImdb } from 'react-icons/fa';
import { SiRottentomatoes } from 'react-icons/si';
import './CardMovie.css';

export function CardMovie() {
  const { imdbID } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const API_DATA = `http://www.omdbapi.com/?apikey=bdaa3204&type=movie&i=${imdbID}`;
      let response = await fetch(API_DATA);
      let data = await response.json();
      setMovieData(data);
      console.log(data);
    };

    fetchMovieData();
  }, [imdbID]);

  if (!movieData) {
    return <div className="loading"></div>;
  }

  return (
    <article className="card-movie bg-shadow-1">
      <div className="poster">
        <img src={movieData.Poster} alt={movieData.Title} />
        <div className="logos">
          <p className="imdb">
            <FaImdb className="faimdb" /> {movieData.imdbRating}
          </p>
          {movieData.Ratings[2] && movieData.Ratings[2].Value && (
            <div className="imdb">
              <div className="circle">
                <p className="m">m</p>
              </div>
              <p>{movieData.Ratings[2].Value}</p>
            </div>
          )}
          <div>
            {movieData.Ratings[1] && movieData.Ratings[1].Value && (
              <p className="imdb">
                <SiRottentomatoes className="tomato" /> {movieData.Ratings[1].Value}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="info">
        <h1 className="title">{movieData.Title}</h1>
        <div className="rated-year">
          <p className="rated">{movieData.Rated}</p>
          <span className="year">Año: {movieData.Year}</span>
        </div>
        <p className="plot">{movieData.Plot}</p>
        <p className="padding-bottom-05">Género: {movieData.Genre}</p>
        <p className="padding-bottom-05">Actores: {movieData.Actors}</p>
        <p className="padding-bottom-05">Duración: {movieData.Runtime}</p>
        <p className="padding-bottom-05">Director: {movieData.Director}</p>
        <p className="padding-bottom-05">Premios: {movieData.Awards}</p>
        <p className="padding-bottom-05">Recaudación: {movieData.BoxOffice}</p>
        <p className="padding-bottom-05">País: {movieData.Country}</p>
        <p className="padding-bottom-05">Fecha de lanzamiento: {movieData.Released}</p>
        <p className="padding-bottom-05">Idioma: {movieData.Language}</p>
      </div>
    </article>
  );
}
