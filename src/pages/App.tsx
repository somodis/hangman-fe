import React, { FC, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { filterRoutes } from '../utils/auth';
import { routes } from '../config/routes';
import { getProfile, selectUserRoles } from '../store/profile';

import { AuthRoute } from '../components/auth/AuthRoute';
import LoginPage from './LoginPage';
import { PrivateLayout } from './PrivateLayout';
import { initToken, selectIsLoggedIn } from '../store/auth';

const App: FC = () => {
  const dispatch = useDispatch<any>();

  const role = useSelector(selectUserRoles);

  // const initProfile = useCallback(async () => {
  //   try {
  //     // setProfileLoading(true);

  //     // await dispatch(initToken());
  //     // await dispatch(getProfile());

  //   } finally {
  //     // setProfileLoading(false);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    dispatch(initToken());
    dispatch(getProfile());
  }, [dispatch]);

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
