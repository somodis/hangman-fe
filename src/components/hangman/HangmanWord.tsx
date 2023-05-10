import React from 'react';
import { useSelector } from 'react-redux';

import { selectGuessedLetters, selectWordToGuess } from '../../store/game';

type HangmanWordProps = {
  reveal?: boolean;
};

const HangmanWord = ({ reveal = false }: HangmanWordProps) => {
  const guessedLetters = useSelector(selectGuessedLetters);
  const wordToGuess = useSelector(selectWordToGuess);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '.25em',
        fontSize: '5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
      }}
    >
      {wordToGuess?.word.split('').map((letter, index) => (
        <span style={{ borderBottom: '.1em solid black' }} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
              color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black',
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};

export default HangmanWord;
