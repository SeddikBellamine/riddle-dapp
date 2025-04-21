import logo from '../assets/logo-zama-squareyellow.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#ffd209',
        color: 'black',
        textAlign: 'center',
        p: 2,
        mt: 6,
      }}
    >
      <img src={logo} alt="Zama Logo" style={{ height: '40px' }} />
      <Typography variant="body2">
        &copy; 2025 Zama.ai. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
