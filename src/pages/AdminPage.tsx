import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { wordService } from '../services';
import { WordModel } from '../models';

import NewWordForm from '../components/admin/NewWordForm';
import WordList from '../components/admin/WordList';

const AdminPage = () => {
  const [words, setWords] = useState<WordModel[]>([]);

  const getWordList = async () => {
    const res = await wordService.getAllWords();

    setWords(res);
  };

  useEffect(() => {
    getWordList();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography sx={{ alignSelf: 'center' }} variant="h4">
        Admin
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
        <NewWordForm words={words} />
        <WordList words={words} />
      </Box>
    </Box>
  );
};

export default AdminPage;
