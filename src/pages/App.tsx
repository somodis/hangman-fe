import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { filterRoutes } from '../utils/auth';
import { routes } from '../config/routes';
import { Role } from '../config/roles';
import { AuthRoute } from '../components/auth/AuthRoute';
import { NotFound } from '../components/not-found/NotFound';

import LoginPage from './LoginPage';
import { PrivateLayout } from './PrivateLayout';

const App: FC = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const role = useSelector(selectUserRoles);
  const role = Role.ADMIN;

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
