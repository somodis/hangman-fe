import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './Keyboard.module.scss';
import alphabet from '../../assets/alphabet.json';

import store from '../../store';
import { addGuessedLetter, selectGuessedLetters, setWordToGuess } from '../../store/game';

const Keyboard = () => {
  const guessedLetters = useSelector(selectGuessedLetters);

  const addLetter = (letter: string) => {
    store.dispatch(addGuessedLetter(letter));
  };

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/) && key !== 'Enter') return;

      e.preventDefault();

      if (key === 'Enter') {
        store.dispatch(setWordToGuess());
      } else {
        addLetter(key.toUpperCase());
      }
    };

    document.addEventListener('keypress', keyPressHandler);

    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, []);

  return (
    <div
      style={{
        alignSelf: 'stretch',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
        gap: '.5rem',
      }}
    >
      {alphabet.map((key) => {
        const isInactive = guessedLetters.includes(key);
        return (
          <button
            onClick={() => addGuessedLetter(key)}
            className={`${styles.btn} ${isInactive ? styles.inactive : ''}`}
            disabled={isInactive}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
