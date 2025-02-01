import React, { useState } from 'react'
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetails';


const App = () => {
  const [selectedCharacterID, setSelectedCharacterID] = useState(null);

  const handleCharacterClick = (id) => {
    setSelectedCharacterID(id);
  };

  return (
    <div className="app">
      <h1>Marvel Characters</h1>
      <div className="content">
        <CharacterList onCharacterClick={handleCharacterClick}/>
        <CharacterDetail characterId={selectedCharacterID}/>
      </div>
    </div>
    );
  };

export default App;