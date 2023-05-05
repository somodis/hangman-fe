import React from 'react';
import { Outlet } from 'react-router-dom';

import { PrivateRoute } from '../components';
import { Container } from '@mui/material';
import { Header } from '../components/header/Header';

export function PrivateLayout() {
  return (
    <PrivateRoute>
      <Container maxWidth="xl">
        <Header />

        <Container maxWidth="sm" style={{ border: '1px solid red' }}>
          <Outlet />
        </Container>
      </Container>
    </PrivateRoute>
  );
}
