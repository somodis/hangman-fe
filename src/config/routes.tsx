import React from 'react';
import { RouteConfigurationModel } from '../models';
import { Role } from '../config/roles';

import UsersIcon from '@mui/icons-material/People';
import ComponentsIcon from '@mui/icons-material/Dashboard';

import AdminPage from '../pages/AdminPage';
import ScoreboardPage from '../pages/ScoreboardPage';
import HomePage from '../pages/HomePage';

export const routes: RouteConfigurationModel[] = [
  {
    icon: ComponentsIcon,
    allowedFor: [Role.ADMIN, Role.USER],
    path: 'home',
    link: '/home',
    component: <HomePage />,
    title: () => 'HomePage',
  },
  {
    icon: ComponentsIcon,
    allowedFor: [Role.ADMIN, Role.USER],
    path: 'scores',
    link: '/scores',
    component: <ScoreboardPage />,
    title: () => 'Scoreboard',
  },
  {
    icon: UsersIcon,
    allowedFor: [Role.ADMIN],
    path: 'admin',
    link: '/admin',
    component: <AdminPage />,
    title: () => 'Admin page',
  },
];