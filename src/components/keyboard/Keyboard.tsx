import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Keyboard.module.scss';
import alphabet from '../../assets/alphabet.json';

import store from '../../store';
import { guess, selectGuessedLetters } from '../../store/game';
import { getWord } from '../../utils/words';

const Keyboard = () => {
  const guessedLetters = useSelector(selectGuessedLetters);
  const dispatch = useDispatch<any>();

  const addLetter = async (letter: string) => {
    await dispatch(guess({ letter }));
  };

  useEffect(() => {
    const keyPressHandler = async (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/) && key !== 'Enter') return;

      e.preventDefault();

      if (key === 'Enter') {
        await dispatch(getWord());
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
            onClick={() => addLetter(key)}
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
