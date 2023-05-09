import React, { FC, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { filterRoutes } from '../utils/auth';
import { routes } from '../config/routes';
import { getProfile, selectUserRoles } from '../store/profile';
import { initToken } from '../store/auth';

import { AuthRoute } from '../components/auth/AuthRoute';
import LoginPage from './LoginPage';
import { PrivateLayout } from './PrivateLayout';
import ScoreboardPage from './ScoreboardPage';
import { selectIsLoggedIn } from '../store/auth';

const App: FC = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectUserRoles);
  // const role = Role.ADMIN;

  const authenticatedRoutes = filterRoutes(routes, role);
  const defaultRoute = authenticatedRoutes?.length ? authenticatedRoutes[0].path || '/' : '/';

  return (
    <Routes>
      <Route
        path="login"
        element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>
        }
      />
      <Route
        path="scores"
        element={
          <AuthRoute>
            <ScoreboardPage />
          </AuthRoute>
        }
      />
      <Route path="/*" element={<PrivateLayout />}>
        {authenticatedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        <Route index element={<Navigate to={defaultRoute} />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
