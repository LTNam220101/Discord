import React from 'react';
import {
    colors,
    Grid,
    IconButton,
    Stack,
    useTheme,
    Dialog,
} from '@mui/material';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import SidebarServer from '../../components/ServerSetting/SidebarServer';
import ContentSettingServer from '../../components/ServerSetting/ContentSettingServer';

const ServerSetting: React.FC = () => {
    const theme = useTheme();
    const [index, setIndex] = React.useState(0);
    const handleIndexTab = (index: number) => {
        setIndex(index);
    };
    //   const modal = useModal();

    return (
        <Dialog
            //   {...muiDialogV5(modal)}
            open
            fullWidth
            maxWidth={false}
            sx={{ height: '100vh' }}
        >
            <Stack>
                <Grid direction="row" container height="90vh">
                    <Grid
                        item
                        xs={3.5}
                        color={colors.grey[100]}
                        bgcolor={colors.grey[900]}
                    >
                        <SidebarServer handleIndexTab={handleIndexTab} />
                    </Grid>
                    <Grid
                        item
                        xs={8.5}
                        color={colors.grey[100]}
                        bgcolor={theme.palette.grey[800]}
                    >
                        <Stack flexDirection="row">
                            <Grid item xs={8.5}>
                                <ContentSettingServer index={index} />
                            </Grid>
                            <Grid item xs={3.5}>
                                <Box
                                    sx={{
                                        color: colors.grey[400],
                                        align: "center"
                                    }}
                                    justifyContent="center"
                                    pt={6}
                                    position="absolute"
                                >
                                    {/* <IconButton onClick={() => modal.hide()}> */}
                                    <IconButton>    
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

export default ServerSetting;
