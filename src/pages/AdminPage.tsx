import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

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
    <>
      <Typography variant="h4">Admin</Typography>
      <NewWordForm words={words} />
      <WordList words={words} />
    </>
  );
};

export default AdminPage;
