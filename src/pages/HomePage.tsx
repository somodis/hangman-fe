import React, { useCallback, useEffect, useState } from 'react';

import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Hangman from '../components/hangman/Hangman';
import HangmanWord from '../components/hangman/HangmanWord';
import Keyboard from '../components/hangman/Keyboard';

enum DifficultyLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

const HomePage = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const selectDifficulty = (event: React.MouseEvent<HTMLElement>, newValue: DifficultyLevel | null) => {
    setSelectedDifficulty(newValue);
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  const [wordToGuess, setWordToGuess] = useState('GETWORD');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess.split('').every((letter) => guessedLetters.includes(letter));

  const addguessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addguessedLetter(key);
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
      setGuessedLetters([]);
      // setWordToGuess(getWord());
      setWordToGuess('MASIK');
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <>
      {!isPlaying ? (
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
              addGuessedLetter={addguessedLetter}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
