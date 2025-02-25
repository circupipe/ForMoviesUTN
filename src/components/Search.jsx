import React, { useState, useEffect } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';

export function Search() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchPushed, setSearchPushed] = useState(false);
  const API_URL = `http://www.omdbapi.com/?apikey=bdaa3204&type=movie&s=${query}&page=${page}`;

  const navigate = useNavigate();

  const CallApi = async () => {
    if (searchPushed) {
      let response = await fetch(API_URL);
      let previousData = await response.json();
      setData(previousData);
      console.log(previousData);
      setSearchPushed(false); 
    }
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setSearchPushed(true); 
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    setSearchPushed(true); 
  };

  const handleSearch = () => {
    setPage(1);
    setSearchPushed(true);
  };

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  useEffect(() => {
    CallApi();
  }, [page, searchPushed]);

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar pelis"
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Buscar</button>
        </div>
        <p className="page-info">Página {page}</p>
        <div className="pagination">
          <button onClick={prevPage} className="pagination-button">Anterior</button>
          <button onClick={nextPage} className="pagination-button">Siguiente</button>
        </div>
      </div>

      {data.Response === 'False' && (
        <h1 className="error-message">{query} no existe, vuelve a intentarlo por favor</h1>
      )}
      {data.Search && data.Search.length > 0 && (
        <>
          <h1 className="results-count">Se encontraron {data.totalResults} películas</h1>
          <div className="movies-list">
            {data.Search.map((peli) => (
              <div
                key={peli.imdbID}
                className="movie-card"
                onClick={() => handleMovieClick(peli.imdbID)}
              >
                <img src={peli.Poster} alt={peli.Title} className="movie-poster" />
                <div className="movie-details">
                  <h2 className="movie-title">{peli.Title}</h2>
                  <h3 className="movie-year">Año: {peli.Year}</h3>
                  <h3 className="movie-id">ID: {peli.imdbID}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
