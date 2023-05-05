import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '../components/login-form/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Box sx={{ margin: '2rem' }}>
        <LoginForm />
      </Box>
    </>
  );
};

export default LoginPage;
