import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import Keyboard from '../keyboard/Keyboard';
import HangmanWord from './HangmanWord';
import HangmanDrawing from './HangmanDrawing';

import { endGame, selectLoss, selectMistakeCount, selectWin } from '../../store/game';

const Result = ({ isWinner, isLoser }: { isWinner: boolean | undefined; isLoser: boolean | undefined }) => {
  return (
    <Typography sx={{ color: isWinner ? 'green' : 'red', fontWeight: 600 }} variant="h5">
      {isWinner == true && "You've Won!"}
      {isLoser == true && "You've lost!"}
    </Typography>
  );
};

const MAX_MISTAKES = 6;

const Hangman = () => {
  const dispatch = useDispatch<AppDispatch>();

  const mistakeCount = useSelector(selectMistakeCount);
  const isWinner = useSelector(selectWin);
  const isLoser = useSelector(selectLoss);

  const handleClick = async (type?: 'new' | undefined) => {
    await dispatch(endGame(type));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' } }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h5">Hangman Game</Typography>
        <Result isWinner={isWinner} isLoser={isLoser} />
        <HangmanWord reveal={isLoser} />
        <Keyboard />
        <Typography variant="body2">
          Remaining possibility of failure: <b>{MAX_MISTAKES - mistakeCount}</b>
        </Typography>

        <Box>
          <Button variant="outlined" onClick={() => handleClick()} sx={{ marginRight: '1rem' }}>
            End Game
          </Button>
          <Button variant="contained" onClick={() => handleClick('new')}>
            Start New Game
          </Button>
        </Box>
      </Box>
      <Box>
        <HangmanDrawing />
      </Box>
    </Box>
  );
};

export default Hangman;
