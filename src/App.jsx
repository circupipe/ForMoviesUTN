import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Search } from './components/Search';
import { CardMovie } from './components/CardMovie';
import './library.css';
import { Header } from './components/Header';

function App() {
  return (
    <>
    <Header />
      
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/movie/:imdbID" element={<CardMovie />} />
        </Routes>

    </>
  );
}

export default App;
