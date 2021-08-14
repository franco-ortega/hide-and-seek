import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState('');

  return (
    <GameContext.Provider value={{ player, setPlayer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const { player, setPlayer } = useContext(GameContext);
  return { player, setPlayer };
}