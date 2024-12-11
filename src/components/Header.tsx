import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(to left, #001f3f, white)', // Matte navy blue fade
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: '#001f3f' }} style={{height: 30}}>
          PORTAL MAKER
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
