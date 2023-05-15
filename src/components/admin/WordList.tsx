import React from 'react';
import { Box, Typography } from '@mui/material';

import { WordModel } from '../../models';

const WordList = ({ words }: { words: WordModel[] }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        margin: '0 auto',
        gap: '.1rem',
        columnGap: '.5rem',
      }}
    >
      {words.map(({ word }) => {
        return (
          <Typography key={word} variant="body2">
            {word}
          </Typography>
        );
      })}
    </Box>
  );
};

export default WordList;
