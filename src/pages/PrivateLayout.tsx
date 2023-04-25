import React from 'react';
import { Outlet } from 'react-router-dom';

import { PrivateRoute } from '../components';

export function PrivateLayout() {
  return (
    <PrivateRoute>
      <Outlet />
    </PrivateRoute>
  );
}
