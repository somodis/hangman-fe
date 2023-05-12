import React from 'react';
import { useSelector } from 'react-redux';

import DifficultySelector from '../components/hangman/DifficultySelector';
import Hangman from '../components/hangman/Hangman';

import { selectIsGameLoading, selectGameState } from '../store/game';

const HomePage = () => {
  const gameInProgress = useSelector(selectGameState);
  const isLoading = useSelector(selectIsGameLoading);

  return !isLoading && !gameInProgress ? <DifficultySelector /> : <Hangman />;
};

export default HomePage;
