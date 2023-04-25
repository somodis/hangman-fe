import React, { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Theme } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/PowerSettingsNew';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

export const Header: FC = () => {
  const dispatch = useDispatch();

  //   const profile = useSelector(selectProfile);

  //   const largeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up(theme.breakpoints.values.mobileBreakpoint));

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" height="100%">
            <Typography variant="h6">Logo</Typography>

            <Box display="flex" alignItems="center">
              <NavLink to="/admin">
                <Typography variant="h6">Admin</Typography>
              </NavLink>
              <NavLink to="/scores">
                <Typography variant="h6">Scores</Typography>
              </NavLink>
              <NavLink to="/home">
                <Typography variant="h6">Home</Typography>
              </NavLink>
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
