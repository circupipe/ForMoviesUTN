import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import { AiFillAccountBook } from 'react-icons/ai';

export function Search() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');
    const [page, setPage] = useState('');
    const API_URL = `http://www.omdbapi.com/?apikey=bdaa3204&type=movie&s=${query}`;

    // http://www.omdbapi.com/?apikey=bdaa3204&type=movie&s=${query}&page=${page} link para paginacion

 
    const navigate = useNavigate();

    const CallApi = async () => {
        if (query) {
            let response = await fetch(API_URL);
            let previousData = await response.json();
            setData(previousData);
            console.log(previousData);
        }
    };

    const handleSearch = () => {
        CallApi();
    };

    const handleMovieClick = (imdbID) => {
        navigate(`/movie/${imdbID}`);
    };

    return (
        <>
        <div>
        <input type="text" placeholder="Buscar pelis" onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>
        </div>
            
            {data.Response === "False" && (
                <h1>{query} no existe, vuelve a intentarlo porfavor</h1>
            )}
            {data.Search && data.Search.length > 0 && (
                <>                   
                <h1>Se encontraron {data.totalResults} peliculas</h1>
                    {data.Search.map(peli => (
                        <div key={peli.imdbID} className="movie-search" onClick={() => handleMovieClick(peli.imdbID)}>
                            
                            <h2>{peli.Title}</h2>
                            <h3>Año: {peli.Year}</h3>
                            <h3>ID: {peli.imdbID}</h3>
                            <img src={peli.Poster} alt={peli.Title} />
                            
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

