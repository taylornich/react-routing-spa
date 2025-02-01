import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  const publicKey = 'efd1ec1409ccbe082faeba0a447a504a';
  const privateKey = '573daad0e4789d6d87b8224bc1d6e81e7bd557c2';
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  const url = `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  useEffect(() => {
      axios
          .get(url)
          .then((response) => {
              const results = response?.data?.data?.results;
              console.log('API Response:', response);
              if (results && results.length > 0) {
                  setCharacters(results);
              } else {
                  console.log('No characters found.');
              }
              setLoading(false);
          })
          .catch((error) => {
              console.error('Error fetching characters:', error);
              setLoading(false);
          });
  }, [url]);

  return (
      <div className="character-list">
          {loading ? (
              <p>Loading characters...</p>
          ) : characters.length > 0 ? (
              characters.map((character) => (
                  <div
                      key={character.id}
                      className="character-item"
                      onClick={() => onCharacterClick(character.id)}
                  >
                      <img
                          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                          alt={character.name}
                      />
                      <p>{character.name}</p>
                  </div>
              ))
          ) : (
              <p>No characters found.</p>
          )}
      </div>
  );
};

export default CharacterList;