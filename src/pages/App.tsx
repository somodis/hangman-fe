import React, { FC, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { filterRoutes } from '../utils/auth';
import { routes } from '../config/routes';
import { getProfile, selectUserRoles } from '../store/profile';

import { AuthRoute } from '../components/auth/AuthRoute';
import LoginPage from './LoginPage';
import { PrivateLayout } from './PrivateLayout';
import { initToken } from '../store/auth';
import { initGame } from '../store/game';

const App: FC = () => {
  const dispatch = useDispatch<any>();

  const role = useSelector(selectUserRoles);

  const initApp = useCallback(async () => {
    try {
      // todo loading?

      await dispatch(initToken());
      await dispatch(getProfile());
      await dispatch(initGame());
    } finally {
      // todo loading false
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [dispatch, initApp]);

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
