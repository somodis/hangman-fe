import React from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { selectGuessedLetters, selectWordToGuess } from '../../store/game';

type HangmanWordProps = {
  reveal?: boolean;
};

const HangmanWord = ({ reveal = false }: HangmanWordProps) => {
  const guessedLetters = useSelector(selectGuessedLetters);
  const wordToGuess = useSelector(selectWordToGuess);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '.2em',
        fontSize: '3rem',
        textTransform: 'uppercase',
      }}
    >
      {wordToGuess?.word.split('').map((letter, index) => (
        <span style={{ borderBottom: '2px solid #555', marginBottom: '1rem' }} key={index}>
          <span
            key={index}
            style={{
              visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
              color: !guessedLetters.includes(letter) && reveal ? 'red' : '#555',
              fontWeight: 100,
              fontSize: '2rem',
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </Box>
  );
};

export default HangmanWord;
