import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { Box, Dialog, IconButton, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField, Button, Stack } from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_TO_SERVER_ROLE } from '../../redux-saga/actions';
import { State } from '../../redux-saga/reducers';

const CreateRole = NiceModal.create(() => {
    const modal = useModal();
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('');
    const [RoleId, setRoleId] = useState('');
    // const currentServer = useSelector((state: State) => state.getServerInfo?.currentServer?.response);
    // console.log(currentServer);
    const handleAddRole = () => {
        // if (currentServer && userId && RoleId) {
        //     dispatch({ type: ADD_USER_TO_SERVER_ROLE, payload: { userId: userId, serverId: currentServer._id, RoleId: RoleId } })
        // }
    }
    return (
        <Dialog fullScreen {...muiDialogV5(modal)}>
            <Box sx={{ p: 2 }}>
                <IconButton
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={() => modal.hide()}
                >
                    <CloseIcon />
                </IconButton>

                <Box sx={{ textAlign: 'center' }}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <TextField
                            label="Tên"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            label="Role"
                            value={RoleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                        {userId && RoleId ? (
                            <Button variant="contained" onClick={handleAddRole}>
                                Thêm
                            </Button>
                        ) : (
                            <Button variant="contained" disabled>
                                Thêm
                            </Button>
                        )}
                    </Stack>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>UserId</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Dialog>
    );
}
)

export default CreateRole;
