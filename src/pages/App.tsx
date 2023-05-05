import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { filterRoutes } from '../utils/auth';
import { routes } from '../config/routes';
import { selectUserRoles } from '../store/profile';

import { AuthRoute } from '../components/auth/AuthRoute';
import LoginPage from './LoginPage';
import { PrivateLayout } from './PrivateLayout';

const App: FC = () => {
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
