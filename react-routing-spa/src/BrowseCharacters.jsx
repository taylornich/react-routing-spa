import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Link } from 'react-router-dom';

const BrowseCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const publicKey = 'efd1ec1409ccbe082faeba0a447a504a';
  const privateKey = '573daad0e4789d6d87b8224bc1d6e81e7bd557c2';
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  const url = `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  useEffect(() => {
    console.log("Fetching characters...");
    axios
      .get(url)
      .then((response) => {
        const results = response?.data?.data?.results;
        console.log("API Response: ", results);
        if (results && results.length > 0) {
          setCharacters(results);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  return (
    <div className="character-list">
      {characters.length > 0 ? (
        characters.map((character) => (
          <div key={character.id} className="character-item">
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <p>{character.name}</p>
            <Link to={`/character/${character.id}`}>View Details</Link>
          </div>
        ))
      ) : (
        <p>No characters found.</p>
      )}
    </div>
  );
};

export default BrowseCharacters;