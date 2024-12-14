import React, { useState } from 'react';
import { Box } from '@mui/material';

const TouchFeedback = ({ children, onClick, disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = (e) => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleTouchEnd = (e) => {
    if (!disabled) {
      setIsPressed(false);
      onClick?.(e);
    }
  };

  const handleTouchCancel = () => {
    setIsPressed(false);
  };

  return (
    <Box
      component="div"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      sx={{
        transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
        transform: isPressed ? 'scale(0.97)' : 'scale(1)',
        opacity: isPressed ? 0.8 : 1,
        cursor: disabled ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
        '& *': {
          userSelect: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TouchFeedback;
