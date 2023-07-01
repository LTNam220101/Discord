import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Profiles from './Profiles/Profiles';
import MyAccount from './MyAccount';

const ContentSetting = (props:any) => {
  const index = props.index;
  return (
    <Stack>
      <Box height="100%" py={3} px={5}>
        <div className="tabContent " hidden={index !== 0}>
          <MyAccount />
        </div>
        <div className="tabContent " hidden={index !== 1}>
          <Profiles id=''/>
        </div>
      </Box>
    </Stack>
  );
};

export default ContentSetting;
