import React from 'react';
import { RouteConfigurationModel } from '../models';
import { Role } from '../config/roles';

import UsersIcon from '@mui/icons-material/People';
import ComponentsIcon from '@mui/icons-material/Dashboard';

import AdminPage from '../pages/AdminPage';

export const routes: RouteConfigurationModel[] = [
//   {
//     icon: ComponentsIcon,
//     allowedFor: [Role.ADMIN, Role.USER],
//     path: 'components',
//     link: '/components',
//     component: <ComponentsPage />,
//     title: () => i18n.t('COMPONENTS.TITLE'),
//   },
  {
    icon: UsersIcon,
    allowedFor: [Role.ADMIN],
    path: 'admin',
    link: '/admin',
    component: <AdminPage />,
    title: () => 'Admin page',
  },
];
