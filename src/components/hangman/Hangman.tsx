import React from "react";
import styles from './Hangman.module.scss';

type HangmanProps = {
  numberOfGuesses: number;
};

const Hangman = ({ numberOfGuesses }: HangmanProps) => {
  const HEAD = <circle cx="5" cy="4" r="1" />;
  const BODY = <path d="M5,5 v3" />;
  const LHAND = <path d="M5,5 l-2,2" />;

  const RHAND = <path d="M5,5 l2,2" />;
  const LLEG = <path d="M5,8 l-2,2" />;
  const RLEG = <path d="M5,8 l2,2" />;
  const BODY_PARTS = [HEAD, BODY, LHAND, RHAND, LLEG, RLEG];

  return (
    <div>
      <svg style={styles} width={300} height={300} viewBox="0 0 10 12">
        <path d="M1,11 h8" />
        <path d="M9,11 v-10" />
        <path d="M9,1 h-4" />
        <path d="M5,1 v2" />
        {BODY_PARTS.slice(0, numberOfGuesses)}
      </svg>
    </div>
  );
};

export default Hangman;
