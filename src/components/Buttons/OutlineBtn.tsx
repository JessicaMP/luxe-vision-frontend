import React from 'react';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';

const OutlineBtn = ({ nombre }) => {
  return (
    <Button
      variant="outlined"
      size="lg"
      sx={{
        color: 'white',
        borderColor: '#FFA987CC',
        borderRadius: '10px',
        '&:hover': {
          borderColor: '#FFA987CC',
          backgroundColor: 'rgba(255, 169, 135, 0.1)',
        },
      }}
    >
      <Link to="/register">{nombre}</Link>
    </Button>
  );
};

export default OutlineBtn;
