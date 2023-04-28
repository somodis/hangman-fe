import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import DifficultySelector from '../components/hangman/DifficultySelector';
import Hangman from '../components/hangman/Hangman';

import { selectGameState } from '../store/game';

const HomePage = () => {
  const gameInProgress = useSelector(selectGameState);
  useEffect(() => {
    console.log('useeff');
  }, [gameInProgress]);

  return !gameInProgress ? <DifficultySelector /> : <Hangman />;
};

export default HomePage;
