import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import store from '../../store';
import { selectDifficultyLevel, setDifficulty, setGame } from '../../store/game';
import { DifficultyLevel } from '../../models/game.model';

const DifficultySelector = () => {
  const selectedDifficulty = useSelector(selectDifficultyLevel);

  const selectDifficulty = (event: React.MouseEvent<HTMLElement>, newValue: DifficultyLevel | null) => {
    console.log('setdiff func', newValue);
    store.dispatch(setDifficulty(newValue));
  };

  const startGame = () => {
    console.log('startgame func');
    store.dispatch(setGame());
  };

  useEffect(() => {
    console.log('selectedDifficulty changed', selectedDifficulty);
  }, [selectedDifficulty]);

  return (
    <div>
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
    </div>
  );
};

export default DifficultySelector;
