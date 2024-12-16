import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Grid, Paper } from '@mui/material';

const FormSkeleton = ({ fields = 6 }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
      }}
    >
      <Skeleton height={50} width="60%" style={{ marginBottom: '2rem' }} />
      
      <Grid container spacing={3}>
        {Array(fields).fill(0).map((_, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Skeleton height={56} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Skeleton height={120} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={48} width="200px" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormSkeleton;
