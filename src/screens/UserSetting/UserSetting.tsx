import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, colors, IconButton, useTheme } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Stack } from '@mui/system';
// import ContentSetting from './components/ContentSetting';
import { Dialog } from '@mui/material';
import SidebarSetting from '../../components/SidebarSetting';
import ContentSetting from '../../components/ContentSetting';
import { UserSettingProps } from './UserSettingProps';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';


const UserSetting = /*NiceModal.create(*/() => {
  const theme = useTheme();
  const [index, setIndex] = React.useState<number>(0);
  const handleIndexTab = (index: number) => {
    setIndex(index);
  };
  const modal = useModal("1");

  return (
    <Dialog
      {...muiDialogV5(modal)}
      open={true}
      fullWidth
      maxWidth={false}
      sx={{ height: '100vh' }}
    >
      <Stack minWidth={1000}>
        <Grid direction="row" container height="92vh">
          <Grid
            item
            xs={3.5}
            sx={{ color: colors.grey[100], backgroundColor: colors.grey[900] }}
          >
            <SidebarSetting handleIndexTab={handleIndexTab} />
          </Grid>
          <Grid
            item
            xs={8.5}
            sx={{
              color: colors.grey[100],
              bgcolor: theme.palette.grey[800],
            }}
          >
            <Stack flexDirection="row">
              <Grid item xs={8.5}>
                <ContentSetting index={index} />
              </Grid>
              <Grid item xs={3.5}>
                <Box
                  sx={{ color: colors.grey[400] }}
                  justifyContent="center"
                  pt={6}
                  position="absolute"
                  textAlign="center"
                >
                  <IconButton onClick={() => modal.hide()}>
                  {/* <IconButton> */}
                    <HighlightOffIcon fontSize="large" />
                  </IconButton>
                  <Typography color="grey"> ESC </Typography>
                </Box>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  );
};

export default UserSetting;
