import React from 'react';
import {
  Typography,
  Stack,
  colors,
  Box,
  Divider,
  Button,
  Avatar,
  Dialog,
} from '@mui/material';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';

const Profiles = NiceModal.create(() => {
  const [avatar, setAvatar] = React.useState();

  const modal = useModal();

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Stack color={colors.grey[400]}>
        <Stack width="100%" py={2} color={colors.grey[100]}>
          <Typography variant="h6">Profiles</Typography>
        </Stack>
        <Typography color={colors.grey[200]} mb={2}>
          User Profile
        </Typography>
        <Divider color={colors.grey[700]} />
        <Stack direction="row">
          <Box p={1} sx={{ width: 400 }}>
            <Typography sx={{ fontSize: '0.8rem' }}>AVATAR</Typography>
            <Button sx={{ marginRight: 2 }} variant="contained" component="label">
              Change Avatar
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
            <Button sx={{ color: colors.grey[200] }}>
              Remove Avatar
            </Button>
            <Box p={2}>
              <Divider color={colors.grey[700]} />
            </Box>
          </Box>
          <Box p={1} width={300}>
            <Typography sx={{ fontSize: '1rem' }}>Preview</Typography>

            <Stack p={1}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                  alt="Remy Sharp"
                  src={avatar}
                />
                <Typography sx={{ color: colors.grey[200], fontSize: '1.5rem' }}>
                  {/* {user.first_name} {user.last_name} */}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Typography color={colors.grey[200]} mb={2}>
          Server Profiles
        </Typography>
        <Divider color={colors.grey[700]} />
        <Stack py={2}>
          <Stack
            // key={server.id}
            m={0.5}
            height={60}
            width={500}
            alignItems="center"
            bgcolor={colors.grey[900]}
            direction="row"
            borderRadius={2}
          >
            <Avatar
              sx={{
                width: 45,
                height: 45,
                marginLeft: 2,
              }}
            // src={server.avatar}
            />
            {/* <Typography px={2}>{server.name}</Typography> */}
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
});

export default Profiles;
