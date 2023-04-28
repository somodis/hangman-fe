import React from 'react';
import { useSelector } from 'react-redux';

import styles from './HangmanDrawing.module.scss';
import { selectMistakeCount } from '../../store/game';

const HangmanDrawing = () => {
  const mistakeCount = useSelector(selectMistakeCount);

  const HEAD = <circle cx="5" cy="4" r="1" key="head" />;
  const BODY = <path d="M5,5 v3" key="body" />;
  const LHAND = <path d="M5,5 l-2,2" key="lhand" />;

  const RHAND = <path d="M5,5 l2,2" key="rhand" />;
  const LLEG = <path d="M5,8 l-2,2" key="lleg" />;
  const RLEG = <path d="M5,8 l2,2" key="rleg" />;
  const BODY_PARTS = [HEAD, BODY, LHAND, RHAND, LLEG, RLEG];

  return (
    <div>
      <svg style={styles} width={300} height={300} viewBox="0 0 10 12">
        <path d="M1,11 h8" />
        <path d="M9,11 v-10" />
        <path d="M9,1 h-4" />
        <path d="M5,1 v2" />
        {BODY_PARTS.slice(0, mistakeCount)}
      </svg>
    </div>
  );
};

export default HangmanDrawing;
