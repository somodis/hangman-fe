import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Keyboard.module.scss';
import alphabet from '../../assets/alphabet.json';

import { guess, selectGuessedLetters } from '../../store/game';

const Keyboard = () => {
  const guessedLetters = useSelector(selectGuessedLetters);
  const dispatch = useDispatch<AppDispatch>();

  const addLetter = useCallback(
    async (letter: string) => {
      await dispatch(guess({ letter }));
    },
    [dispatch]
  );

  useEffect(() => {
    const keyPressHandler = async (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/) && key !== 'Enter') return;

      e.preventDefault();

      addLetter(key.toLowerCase());
    };

    document.addEventListener('keypress', keyPressHandler);

    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [dispatch, addLetter]);

  return (
    <div className={styles.hangmanKeyboard}>
      {alphabet.map((key) => {
        const isInactive = guessedLetters.includes(key.toLowerCase());
        return (
          <button
            onClick={() => addLetter(key.toLowerCase())}
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
