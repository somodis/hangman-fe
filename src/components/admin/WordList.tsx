import React from 'react';

import { WordModel } from '../../models';
import { Typography } from '@mui/material';

const WordList = ({ words }: { words: WordModel[] }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        margin: '0 auto',
        gap: '.1rem',
        maxWidth: '500px',
      }}
    >
      {words.map(({ word }) => {
        return (
          <Typography key={word} variant="body2">
            {word}
          </Typography>
        );
      })}
    </div>
  );
};

export default WordList;
