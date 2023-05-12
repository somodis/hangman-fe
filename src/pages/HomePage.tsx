import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import DifficultySelector from '../components/hangman/DifficultySelector';
import Hangman from '../components/hangman/Hangman';

import { selectGameIsLoading, selectGameState } from '../store/game';

const HomePage = () => {
  const gameInProgress = useSelector(selectGameState);
  const isLoading = useSelector(selectGameIsLoading);

  useEffect(() => {
    console.log('useeff, gameInProgress', gameInProgress);
  }, [gameInProgress]);

  return !isLoading && !gameInProgress ? <DifficultySelector /> : <Hangman />;
};

export default HomePage;
