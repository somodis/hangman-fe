import React from 'react';
import { Button, TextField, Typography } from '@mui/material';

const NewWordForm = () => {
  return (
    <div>
      <Typography>Type the word you want to add to the list</Typography>
      <TextField id="new-word-field" label="New word" variant="outlined" />

      <Button variant="contained">Save</Button>
      <Button variant="outlined">Back</Button>
    </div>
  );
};

export default NewWordForm;
