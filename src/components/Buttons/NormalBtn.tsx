import React from 'react';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../types';

type NormalBtnProps = {
  element: MenuItem;
};

const NormalBtn = ({ element }: NormalBtnProps) => {
  return (
    <Button
      variant="plain"
      size="lg"
      sx={{
        color: 'white',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Link to={element.route}>{element.name}</Link>
    </Button>
  );
};

export default NormalBtn;
