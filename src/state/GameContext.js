import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState('');
  const [gameActive, setGameActive] = useState(false);

  return (
    <GameContext.Provider value={{
      player,
      setPlayer,
      gameActive,
      setGameActive
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const {
    player,
    setPlayer,
    gameActive,
    setGameActive
  } = useContext(GameContext);
  return {
    player,
    setPlayer,
    gameActive,
    setGameActive
  };
};
