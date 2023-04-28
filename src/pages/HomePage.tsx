import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import Hangman from '../components/hangman/Hangman';
import HangmanWord from '../components/hangman/HangmanWord';
import Keyboard from '../components/hangman/Keyboard';
import { DifficultyLevel } from '../models/game.model';
import { selectDifficultyLevel, selectGameState, selectWordToGuess, setDifficulty, setWordToGuess, setGame, selectGuessedLetters, addGuessedLetter } from '../store/game';
import store from '../store';


const HomePage = () => {
  const selectedDifficulty = useSelector(selectDifficultyLevel);
  const gameInProgress = useSelector(selectGameState);  
  const wordToGuess = useSelector(selectWordToGuess);
  const guessedLetters = useSelector(selectGuessedLetters);

  const selectDifficulty = (event: React.MouseEvent<HTMLElement>, newValue: DifficultyLevel | null) => {
    store.dispatch(setDifficulty(newValue));
  };

  const startGame = () => {
    console.log('startGame')
    store.dispatch(setGame());
  };


  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter));

  const addLetter = (letter:string)=>{
    store.dispatch(addGuessedLetter(letter));
  }

  // const addLetter = useCallback(
  //   (letter: string) => {
  //     if (guessedLetters.includes(letter) || isLoser || isWinner) return;

  //     store.dispatch(addGuessedLetter(letter));
  //   },
  //   [guessedLetters, isWinner, isLoser]
  // );

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addLetter(key);
    };

    document.addEventListener('keypress', keyPressHandler);

    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') return;

      e.preventDefault();

      store.dispatch(setWordToGuess());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <>
      {!gameInProgress ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4">Hangman Game</Typography>
          <Typography variant="body1">Choose a difficulty level</Typography>
          <ToggleButtonGroup value={selectedDifficulty} exclusive onChange={selectDifficulty} orientation="vertical">
            {Object.keys(DifficultyLevel).map((level) => (
              <ToggleButton value={level} key={level}>
                {level}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Button disabled={!selectedDifficulty} onClick={startGame}>
            {"Let's play"}
          </Button>
        </Box>
      ) : (
        <div
          style={{
            // maxWidth: "800px",
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            margin: '0 auto',
            alignItems: 'center',
          }}
        >
          <div>
            {isWinner && "You've Won! - Refresh to try again"}
            {isLoser && 'Nice Try - Refresh to try again'}
          </div>
          <Hangman numberOfGuesses={incorrectLetters.length} />
          <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
          <div style={{ alignSelf: 'stretch' }}>
            <Keyboard
              disabled={isWinner || isLoser}
              activeLetters={guessedLetters.filter((letter) => wordToGuess.includes(letter))}
              inactiveLetters={incorrectLetters}
              addGuessedLetter={addLetter}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
