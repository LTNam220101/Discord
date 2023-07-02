import NiceModal, { NiceModalHocProps, muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { Box, Dialog, IconButton, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField, Button, Stack, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER_TO_SERVER_ROLE } from '../../redux-saga/actions';
import { State } from '../../redux-saga/reducers';
import { addUserToServerRole } from '../../redux-saga/reducers/ServerRole/AddUserToServerRole/actions';
import { getAllUserBelongToRole } from '../../redux-saga/reducers/ServerRole/GetAllUserBelongToRole/actions';

type CreateInvitationDialogProps = {
    rolePairs: any[],
    serverId: string

}
const CreateRole = NiceModal.create<CreateInvitationDialogProps & NiceModalHocProps>(({ rolePairs, serverId }) => {
    const modal = useModal();
    const dispatch = useDispatch()
    const [userId, setUserId] = useState('');
    const [roleName, setRoleName] = useState('');
    // const [RoleId,setRoleId]=useState('')
    console.log(rolePairs)
    // const currentServer = useSelector((state: State) => state.getServerInfo?.currentServer?.response);
    // console.log(currentServer);
    const handleAddRole = () => {
        if (rolePairs && userId && roleName) {
            const selectedRolePair = rolePairs.find((pair) => pair.roleName === roleName);
            console.log(selectedRolePair)
            if (selectedRolePair) {
                console.log({ userId: userId, roleId: selectedRolePair.roleId, serverId: serverId })
                dispatch(addUserToServerRole({ userId: userId, roleId: selectedRolePair.roleId, serverId: serverId }))
            }
        }
    }
    

    const Handle = () => {
        if (rolePairs ) {
            const selectedRolePair = rolePairs.find((pair) => pair.roleName === "admin");
            console.log(selectedRolePair)
            if (selectedRolePair) {
                console.log({roleId: selectedRolePair.roleId, serverId: serverId })
                dispatch(getAllUserBelongToRole({ serverId: serverId, roleId: selectedRolePair.roleId }))
            }
        }
    }
    // const addUserTo = useSelector((state: State) => state.addUserToServerRoleResult)
    // console.log(addUserTo)

    const getAllUserBelongto = useSelector((state: State) => state.getAllUserBelongToRoleResult)
    console.log(getAllUserBelongto)
    const aa:any=[]
    aa.push(getAllUserBelongto?.response)
    console.log(aa)
    // useEffect(()=>{
    //     if(getAllUserBelongto){

    //     }
    // },[getAllUserBelongto])
    const Handle1 = () => {
        if (rolePairs ) {
            const selectedRolePair = rolePairs.find((pair) => pair.roleName === "moderator");
            console.log(selectedRolePair)
            if (selectedRolePair) {
                console.log({roleId: selectedRolePair.roleId, serverId: serverId })
                dispatch(getAllUserBelongToRole({ serverId: serverId, roleId: selectedRolePair.roleId }))
            }
        }
    }
    const getAllUserBelongtoo = useSelector((state: State) => state.getAllUserBelongToRoleResult)
    console.log(getAllUserBelongtoo)
    aa.push(getAllUserBelongto?.response)
    console.log(aa)
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
                            label="UserId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            variant="outlined"
                            size="small"
                        />
                        <FormControl variant="outlined" size="small">
                            <InputLabel
                                id="role-label"
                                sx={{ fontSize: '0.875rem', fontWeight: 600, color: (theme) => theme.palette.text.primary }}
                            >
                                Role
                            </InputLabel>
                            <Select
                                labelId="role-label"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                label="Role"
                                sx={{ minWidth: '120px' }}
                            >
                                <MenuItem value="admin">admin</MenuItem>
                                <MenuItem value="moderator">moderator</MenuItem>
                                <MenuItem value="member">member</MenuItem>
                            </Select>
                        </FormControl>
                        {userId && roleName ? (
                            <Button variant="contained" onClick={handleAddRole}>
                                Thêm
                            </Button>
                        ) : (
                            <Button variant="contained" disabled>
                                Thêm
                            </Button>
                        )}
                    </Stack>
                    <button onClick={Handle}>danh sach admin</button>
                    {Array.isArray(getAllUserBelongto?.response) ? (
                    getAllUserBelongto?.response?.map((request: any, index: any) => {
                        return (<div key={index}>
                            {request.userId}
                        </div>)
                    })
                ) : null}
                <button onClick={Handle1}>danh sach moderator</button>
                    {Array.isArray(getAllUserBelongto?.response) ? (
                    getAllUserBelongto?.response?.map((request: any, index: any) => {
                        return (<div key={index}>
                            {request.userId}
                        </div>)
                    })
                ) : null}
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
});

export default CreateRole;