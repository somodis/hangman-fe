import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { wordService } from '../../services';
import { WordModel } from '../../models';
interface AddWordState {
  word: string;
}

const NewWordForm = ({ words }: { words: WordModel[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      word: '',
    } as AddWordState,
    validationSchema: Yup.object().shape({
      word: Yup.string()
        .min(6)
        .max(14)
        .test('word-does-not-exist', 'Word must be unique', (value) => words?.some(({ word }) => word !== value))
        .required('Required'),
    }),
    validateOnChange: false,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  const handleSubmit = async ({ word }: { word: string }) => {
    try {
      setIsLoading(true);
      setError('');
      const res = await wordService.addWord({ word });
    } catch (e) {
      setError('Invalid word');
      setIsLoading(false);
    } finally {
      setError('');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ display: 'grid', rowGap: '1rem' }}>
        <Typography variant="body2">Type the word you want to add to the list</Typography>
        <TextField
          id="new-word-field"
          value={formik.values.word}
          onChange={formik.handleChange}
          error={(formik.touched.word && Boolean(formik.errors.word)) || Boolean(error)}
          helperText={formik.touched.word && formik.errors.word}
          name="word"
          label="New word"
          type="text"
          variant="outlined"
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default NewWordForm;
