import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ExitToAppIcon from '@mui/icons-material/PowerSettingsNew';
import { Tooltip } from '@mui/material';

import { selectProfile } from '../../store/profile';
import { routes } from '../../config/routes';

export const Header: FC = () => {
  const profile = useSelector(selectProfile);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="100%">
            <Typography variant="h6">Logo</Typography>

            <Box display="flex" alignItems="center">
              {routes.map(
                (route) =>
                  profile &&
                  route.allowedFor?.includes(profile.role) && (
                    <NavLink key={route.title()} to={route.link || ''}>
                      <Typography variant="h6">{route.title()}</Typography>
                    </NavLink>
                  )
              )}

              <Tooltip title="Logout">
                <IconButton onClick={() => console.log('logout')} size="large">
                  <ExitToAppIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
