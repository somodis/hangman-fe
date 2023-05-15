import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { LoginCredentials } from '../../models/credentials.model';
import { login } from '../../store/auth';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError('');

      await dispatch(login({ credentials }));
    } catch (e) {
      setError('Invalid email or password!');
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    } as LoginCredentials,
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        value={formik.values.username}
        onChange={formik.handleChange}
        error={(formik.touched.username && Boolean(formik.errors.username)) || Boolean(error)}
        helperText={formik.touched.username && formik.errors.username}
        name="username"
        label="Username"
        type="text"
        autoComplete="username"
      />
      <TextField
        value={formik.values.password}
        onChange={formik.handleChange}
        error={(formik.touched.password && Boolean(formik.errors.password)) || Boolean(error)}
        helperText={(formik.touched.password && formik.errors.password) || error}
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
