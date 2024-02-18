import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

import store from '../../store';
import { selectDifficultyLevel, setDifficulty, setGame, getWord } from '../../store/game';
import { DifficultyLevel } from '../../models/game.model';

const DifficultySelector = () => {
  const selectedDifficulty = useSelector(selectDifficultyLevel);

  const selectDifficulty = async (event: React.MouseEvent<HTMLElement>, newValue: DifficultyLevel) => {
    store.dispatch(setDifficulty(newValue));

    store.dispatch(getWord({ level: newValue }));
  };

  const startGame = () => {
    store.dispatch(setGame());
  };

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Hangman Game</Typography>
        <Typography variant="body1">Choose a difficulty level</Typography>
        <ToggleButtonGroup
          color="primary"
          value={selectedDifficulty}
          exclusive
          onChange={selectDifficulty}
          orientation="vertical"
        >
          {Object.values(DifficultyLevel).map((level) => (
            <ToggleButton value={level} key={level}>
              {level}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Button variant="contained" color="primary" disabled={!selectedDifficulty} onClick={startGame}>
          {"Let's play"}
        </Button>
      </Box>
    </div>
  );
};

export default DifficultySelector;
