import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const FlexLayout = ({ 
  children, 
  direction = 'row', 
  spacing = 2,
  wrap = 'wrap',
  justify = 'center',
  align = 'center',
  sx = {},
  ...props 
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        gap: spacing,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

FlexLayout.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),
  spacing: PropTypes.number,
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'stretch', 'baseline']),
  sx: PropTypes.object
};

export default FlexLayout;
