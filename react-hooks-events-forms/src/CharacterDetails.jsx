import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const CharacterDetail = ({ characterId }) => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    const publicKey = 'efd1ec1409ccbe082faeba0a447a504a';
    const privateKey = '573daad0e4789d6d87b8224bc1d6e81e7bd557c2';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
    const url = `${baseUrl}/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    useEffect(() => {
        if (!characterId) return;

        axios
            .get(url)
            .then((response) => {
                const results = response?.data?.data?.results[0];
                console.log('API Response:', results);
                setCharacter(results);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching character details:', error);
                setLoading(false);
            });
    }, [characterId]);

    if (!character) {
        return <p>No character selected.</p>;
    }

    return (
        <div className="character-detail">
            <h2>{character.name}</h2>
            <p>{character.description || 'No description available.'}</p>
            <h3>Comics:</h3>
            <ul>
                {character.comics?.items?.length > 0 ? (
                    character.comics.items.map((comic, index) => <li key={index}>{comic.name}</li>)
                ) : (
                    <p>No comics available for this character.</p>
                )}
            </ul>
        </div>
    );
};

export default CharacterDetail;