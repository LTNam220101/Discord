import React from 'react';
import { Stack } from '@mui/system';
import { ContentSettingServerProps } from './ServerInterface';
import OverviewSetting from './OverviewSetting';
import RoleSetting from './RoleSetting';
import MemberSetting from './MemberSetting';

const ContentSettingServer = (props: ContentSettingServerProps ) => {
  const indexTab = props.index;
  return (
    <>
      <Stack pt={6} pl={2}>
        {(() => {
          switch (indexTab) {
            case 0:
              return <OverviewSetting />;
            case 1:
              return <RoleSetting />;
            case 2:
              return <MemberSetting />;
            default:
              return null;
          }
        })()}
      </Stack>
    </>
  );
};

export default ContentSettingServer;
