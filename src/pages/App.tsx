import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { filterRoutes } from '../utils/auth';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RankingPage from './RankingPage';
import AdminPage from './AdminPage';
import { routes } from '../config/routes';

const App: FC = () => {
      const role = useSelector(selectUserRoles);

    const authenticatedRoutes = filterRoutes(routes, role);
    const defaultRoute = authenticatedRoutes?.length ? authenticatedRoutes[0].path || '/' : '/';

    return <div>App</div>;
};

export default App;
