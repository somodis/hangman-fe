import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ExitToAppIcon from '@mui/icons-material/PowerSettingsNew';
import { Avatar, Button, Divider, Drawer, List, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { selectProfile } from '../../store/profile';
import { routes } from '../../config/routes';
import { logout } from '../../store/auth';
import LogoImg from '../../assets/images/react-icon.png';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch<AppDispatch>();

  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const routesNav = routes.map(
    (route) =>
      profile &&
      route.allowedFor?.includes(profile.role) && (
        <NavLink className={styles.navItem} key={route.title()} to={route.link || ''}>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            {route.title()}
          </Typography>
        </NavLink>
      )
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <Avatar alt="Logo" src={LogoImg} />
        <Typography variant="h6" sx={{ my: 2 }}>
          Noose Nonsense
        </Typography>
      </Box>

      <Divider />
      <List>
        {routesNav}
        <Button sx={{ marginTop: '1rem' }} variant="outlined" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
          Logout
        </Button>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar sx={{ backgroundColor: '#fefefe' }} elevation={0} position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Avatar alt="Logo" src={LogoImg} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'inline-block' } }}>
              Noose Nonsense
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: 'center' } }}>
              {routesNav}
              <Tooltip title="Logout">
                <IconButton aria-label="logout" onClick={handleLogout} size="large">
                  <ExitToAppIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </>
  );
};
