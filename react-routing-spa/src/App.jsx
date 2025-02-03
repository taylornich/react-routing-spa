import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Home from './home';
import BrowseCharacters from './BrowseCharacters';
import CharacterDetail from './CharacterDetails';
import Comics from './Comics';
import NotFound from './NotFound';
import './App.css';

const App = () => {
  console.log("App is rendering")
  return (
    <div className="app-container">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-characters" element={<BrowseCharacters />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;