import React, { useState } from 'react';

export const PlayerNameContext = React.createContext();

export const PlayerNameProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState('')
  
    return (
      <PlayerNameContext.Provider value={[playerName, setPlayerName]}>
        {children}
      </PlayerNameContext.Provider>
    );
  };