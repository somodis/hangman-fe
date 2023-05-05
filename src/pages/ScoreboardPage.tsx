import React from 'react';
import { Typography } from '@mui/material';

import ScoreBoard from '../components/scoreboard/ScoreBoard';

const ScoreboardPage = () => {
  return (
    <>
      <Typography variant="h4">Scoreboard</Typography>
      <ScoreBoard />
    </>
  );
};

export default ScoreboardPage;
