import React from 'react';
import { Typography } from '@mui/material';

import NewWordForm from '../components/admin/NewWordForm';
import WordList from '../components/admin/WordList';

const AdminPage = () => {
  return (
    <>
      <Typography variant="h4">Admin</Typography>
      <NewWordForm />
      <WordList />
    </>
  );
};

export default AdminPage;
