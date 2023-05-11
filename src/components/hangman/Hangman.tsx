import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import Keyboard from '../keyboard/Keyboard';
import HangmanWord from './HangmanWord';
import HangmanDrawing from './HangmanDrawing';

import { endGame, selectLoss, selectMistakeCount, selectWin } from '../../store/game';

const Result = ({ isWinner, isLoser }: { isWinner: boolean | undefined; isLoser: boolean | undefined }) => {
  useEffect(() => {
    console.log('asd');
  }, [isWinner, isLoser]);

  return (
    <>
      <h1>{isWinner == true && "You've Won! - Refresh to try again"}</h1>

      <h1>{isLoser == true && 'Nice Try - Refresh to try again'}</h1>
    </>
  );
};

const Hangman = () => {
  const mistakeCount = useSelector(selectMistakeCount);
  const isWinner = useSelector(selectWin);
  const isLoser = useSelector(selectLoss);
  const dispatch = useDispatch<any>();

  const handleClick = (type?: 'new' | undefined) => {
    dispatch(endGame(isWinner, type));
  };

  return (
    <div>
      <Result isWinner={isWinner} isLoser={isLoser} />
      <HangmanDrawing />
      <HangmanWord reveal={false} />
      <Keyboard />
      <h4>Mistake counter: {mistakeCount}</h4>
      <Button onClick={() => handleClick()}>End Game</Button>
      <Button onClick={() => handleClick('new')}>Start New Game</Button>
    </div>
  );
};

export default Hangman;
