import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LoginForm from '../components/login-form/LoginForm';

const LoginPage = () => (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginY: 10,
            paddingTop: 8,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </>
  );

export default LoginPage;
