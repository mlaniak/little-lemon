import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

const GridLayout = ({ 
  children, 
  spacing = 4, 
  justifyContent = "center", 
  containerProps = {}, 
  itemProps = {
    xs: 12,
    sm: 6,
    md: 4
  }
}) => {
  return (
    <Grid 
      container 
      spacing={spacing} 
      justifyContent={justifyContent}
      {...containerProps}
    >
      {React.Children.map(children, (child) => (
        <Grid 
          item 
          {...itemProps}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.number,
  justifyContent: PropTypes.string,
  containerProps: PropTypes.object,
  itemProps: PropTypes.object
};

export default GridLayout;
