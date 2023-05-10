import React from 'react';
import { useSelector } from 'react-redux';

import Keyboard from '../keyboard/Keyboard';
import HangmanWord from './HangmanWord';
import HangmanDrawing from './HangmanDrawing';

import { selectGuessedLetters, selectMistakeCount, selectWordToGuess } from '../../store/game';
import { Button } from '@mui/material';

const Hangman = () => {
  console.log('hangman');
  const wordToGuess = useSelector(selectWordToGuess);
  const guessedLetters = useSelector(selectGuessedLetters);
  const mistakeCount = useSelector(selectMistakeCount);

  const isLoser = mistakeCount === 6;
  const isWinner = wordToGuess?.word.split('').every((letter) => guessedLetters.includes(letter));

  return (
    <div>
      {isWinner && "You've Won! - Refresh to try again"}
      {isLoser && 'Nice Try - Refresh to try again'}

      <HangmanDrawing />
      <HangmanWord reveal={isLoser} />
      <Keyboard />
      <h4>Mistake counter: {mistakeCount}</h4>
      <Button>End Game</Button>
      <Button>New Game</Button>
    </div>
  );
};

export default Hangman;
