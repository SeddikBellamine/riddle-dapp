import { getAvatarVisualNumber } from '../utils/getAvatarVisualNumber';
import { truncateAddress } from '../utils/truncateAddress';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import React from 'react';
import { Bounce, toast } from 'react-toastify';

type AddressForNavBarProps = {
  address: string;
};

export function AddressChip({ address }: AddressForNavBarProps) {
  const avatarVisualBg = getAvatarVisualNumber({ address });
  const displayAddress = truncateAddress(address);
  const avatarImgUrl = `../assets/profiles_avatars/${avatarVisualBg}`;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        border: '1px solid black',
        borderRadius: '0px',
        backgroundColor: '#ffd209',
        color: 'black',
        height: '40px',
        cursor: 'pointer',
      }}
      onClick={() => {
        navigator.clipboard.writeText(address.toLowerCase());
        toast.success('📋  Address Copied to clipboard!', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontWeight: 500, fontSize: '0.875rem', color: 'black' }}
      >
        {displayAddress}
      </Typography>

      <IconButton size="small" sx={{ ml: 1, p: 0.5 }}>
        <Avatar
          sx={{
            width: 20,
            height: 20,
            bgcolor: 'black',
            backgroundImage: `url(${avatarImgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </IconButton>
    </Box>
  );
}
