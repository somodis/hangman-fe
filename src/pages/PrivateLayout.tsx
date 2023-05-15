import React from 'react';
import { Outlet } from 'react-router-dom';

import { PrivateRoute } from '../components';
import { Container, CssBaseline } from '@mui/material';
import { Header } from '../components/header/Header';

export function PrivateLayout() {
  return (
    <PrivateRoute>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
        <Header />

        <Container maxWidth="md" sx={{ paddingY: '3rem', backgroundColor: '#fefefe', marginTop: '2.5rem' }}>
          <Outlet />
        </Container>
      </Container>
    </PrivateRoute>
  );
}
