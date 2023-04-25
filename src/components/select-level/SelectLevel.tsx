import React from 'react';
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';

const SelectLevel = () => {
  return (
    <div>
      <Typography variant="h4">Hangman Game</Typography>

      <Typography variant="body1">Choose a difficulty level</Typography>

      {/* <ToggleButtonGroup value={selectedDifficulty} exclusive onChange={selectDifficulty} orientation="vertical">
        {Object.keys(DifficultyLevel).map((level) => (
          <ToggleButton value={level} key={level}>
            {level}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button disabled={!selectedDifficulty} onClick={startGame}>
        {"Let's play"}
      </Button> */}
    </div>
  );
};

export default SelectLevel;
