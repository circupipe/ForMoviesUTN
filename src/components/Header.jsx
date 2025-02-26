import './Header.css';


export function Header() {
  return (
    <header>
        <div className="formovies">
          <h1>forMovies </h1>
          <p>Tus peliculas en bucle.</p>
        </div>
        
        <nav>
            <a href="/">Inicio</a>
            <a href="#sobre">Estrenos</a>
            <a href="#servicios">Top Ten</a>
            <a href="#contacto">Contacto</a>
        </nav>
    </header>
  )
}
