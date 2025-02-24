// Importamos useState y useEffect desde React
import { useState, useEffect } from 'react';

// Definimos el componente ListMovie
export function ListMovie() {


    // Declaramos el estado 'data' y su función de actualización 'setData'
    const [data, setData] = useState({});

    // Definimos la URL de la API
    const API_URL = 'http://www.omdbapi.com/?s=titanic&apikey=bdaa3204';

    // Función asincrónica para llamar a la API
    const CallApi = async () => {
        // Hacemos una solicitud fetch a la API
        let response = await fetch(API_URL);
        // Convertimos la respuesta a JSON
        let previusData = await response.json();
        // Actualizamos el estado 'data' con los datos recibidos
        setData(previusData);
        // Imprimimos los datos en la consola para depuración
        console.log(previusData);
    }

    // Usamos useEffect para llamar a 'CallApi' al montar el componente
    useEffect(() => {
        CallApi(); 
    }, []);

    // Renderizamos el componente
    return (
        <>
            {data.Search && data.Search.length > 0 && // Comprobamos si hay resultados en 'data.Search'
                <> 
                    <h1>Se Garcharon las pelis</h1> 
                    {data.Search.map(peli => (
                        <div key={peli.imdbID}> 
                            <p>{peli.Title}</p> 
                        </div>
                    ))}
                </>
            }
        </>
    );
}