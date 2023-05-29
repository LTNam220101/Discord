import React from 'react';
import { Stack, Typography } from '@mui/material';

const OverviewSetting: React.FC = () => {
  return (
    <>
      <Stack>
        <Typography variant="h5" component="h2">
          Overview
        </Typography>
        <Typography variant="subtitle1" component="p">
          This is the overview section.
        </Typography>
        {/* Add your overview content here */}
      </Stack>
    </>
  );
};

export default OverviewSetting;
