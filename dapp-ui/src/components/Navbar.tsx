import logo from '../assets/logo-zama-squareyellow.png';
import { useLoginLogout } from '../hooks/useLoginLogout';
import useUserStore from '../stores/useUser.store';
import { AddressChip } from './AddressChip';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { LogOut } from 'react-feather';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { isConnected, address: userAddress } = useUserStore();
  const { logout, login } = useLoginLogout();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffd209' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            component={Link}
            to="/"
          >
            <img src={logo} alt="Zama Logo" style={{ height: '100px' }} />
          </IconButton>

          {/* Auth Button */}
          {isConnected ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 3,
              }}
            >
              <AddressChip address={userAddress!} />

              <Button
                variant="outlined"
                color="inherit"
                sx={{ borderColor: 'black', color: 'black' }}
                onClick={logout}
                startIcon={<LogOut size={15} />}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={login}
              sx={{ borderColor: 'black', color: 'black' }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
