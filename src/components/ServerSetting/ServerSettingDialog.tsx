import React, { useEffect, useState } from 'react';
import {
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Tabs,
    Tab,
    Box,
    Typography,
    colors,
    Avatar,
    Container,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Switch,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    IconButton,
    Dialog,
    Stack,
    Table,
} from '@mui/material';
import {
    Search as SearchIcon,
    ExpandMore as ExpandMoreIcon,
    Person as PersonIcon,
    Delete as DeleteIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import NiceModal, { NiceModalHocProps, muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//     selectCurrentServer,
//     updateServerAction,
// } from 'src/features/server/serverSlice';
import { A11yProps, Role, TabPanelProps } from './ServerInterface';
import { State } from '../../redux-saga/reducers';
import CreateRole from './CreateRole';
import { createServerRole } from '../../redux-saga/reducers/ServerRole/CreateServerRole/actions';
import { updateServerRole } from '../../redux-saga/reducers/ServerRole/UpdateServerRole/actions';
import { getAllServerRoles } from '../../redux-saga/reducers/ServerRole/GetAllServerRoles/actions';
import { getUser } from '../../redux-saga/reducers/User/GetUser/actions';
import { kickUser } from '../../redux-saga/reducers/Server/KickUser/actions';


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            sx={{ width: '100%' }}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index: number): A11yProps {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const _mockRoles_: Role[] = [
    {
        name: 'admin',
        countMember: 3,
        permissions: [
            {
                name: 'View channels',
                value: true,
                description:
                    'Allows members to view and read messages in text channels and see voice channels.',
            },
            {
                name: 'Send messages',
                value: true,
                description: 'Allows members to send messages in text channels.',
            },
            {
                name: 'Manage messages',
                value: false,
                description:
                    'Allows members to delete and edit other members messages.',
            },
            {
                name: 'Manage roles',
                value: false,
                description: 'Allows members to create, edit and delete roles.',
            },
            {
                name: 'Manage channels',
                value: false,
                description: 'Allows members to create, edit and delete channels.',
            },
            {
                name: 'Manage server',
                value: false,
                description: 'Allows members to edit server settings.',
            },
        ],
    },
    {
        name: 'moderator',
        countMember: 15,
        permissions: [
            {
                name: 'View channels',
                value: true,
                description:
                    'Allows members to view and read messages in text channels and see voice channels.',
            },
            {
                name: 'Send messages',
                value: true,
                description: 'Allows members to send messages in text channels.',
            },
            {
                name: 'Manage messages',
                value: false,
                description:
                    'Allows members to delete and edit other members messages.',
            },
            {
                name: 'Manage roles',
                value: false,
                description: 'Allows members to create, edit and delete roles.',
            },
            {
                name: 'Manage channels',
                value: false,
                description: 'Allows members to create, edit and delete channels.',
            },
            {
                name: 'Manage server',
                value: false,
                description: 'Allows members to edit server settings.',
            },
        ],
    },
    {
        name: 'member',
        countMember: 140,
        permissions: [
            {
                name: 'View channels',
                value: true,
                description:
                    'Allows members to view and read messages in text channels and see voice channels.',
            },
            {
                name: 'Send messages',
                value: true,
                description: 'Allows members to send messages in text channels.',
            },
            {
                name: 'Manage messages',
                value: false,
                description:
                    'Allows members to delete and edit other members messages.',
            },
            {
                name: 'Manage roles',
                value: false,
                description: 'Allows members to create, edit and delete roles.',
            },
            {
                name: 'Manage channels',
                value: false,
                description: 'Allows members to create, edit and delete channels.',
            },
            {
                name: 'Manage server',
                value: false,
                description: 'Allows members to edit server settings.',
            },
        ],
    },
];

type CreateInvitationDialogProps = {
    serverId: string

}
const ServerSettingDialog = NiceModal.create<CreateInvitationDialogProps & NiceModalHocProps>(({ serverId }) => {
    const modal = useModal();

    const dispatch = useDispatch();
    // const currentServer = useSelector(selectCurrentServer);
    const getServerInfor = useSelector((state: State) => state.getServerByIdResult)
    console.log(getServerInfor)
    const currentServer: any = getServerInfor?.response;
    const [currentTab, setCurrentTab] = useState(0);
    const [serverName, setServerName] = useState(currentServer.name);

    // const updateServer = (data: Partial<Server>) => {
    //     dispatch(updateServerAction({ id: currentServer._id, data }));
    // };

    // useEffect(() => {
    //     setServerName(currentServer.name);
    // }, [currentServer.name]);
    useEffect(() => {
        console.log(dispatch(getUser({ userId: localStorage.getItem('id') })))
    }, [serverId]);

    const getUserResult = useSelector((state: State) => state.getUserResult);
    console.log(getUserResult)
    useEffect(() => {
        dispatch(getAllServerRoles({ serverId: serverId }))

    }, [serverId])
    const getAllServerRoless = useSelector((state: State) => state.getAllServerRolesResult)
    console.log(getAllServerRoless)
    const [roles, setRoles] = useState(_mockRoles_);
    const [isRoleClicked, setIsRoleClicked] = useState(Array(roles.length).fill(false));

    const handleAddRole = () => {

        const roleNames = ["admin", "member", "moderator"];
        const rolePairs: any = []; // Khởi tạo mảng rolePairs trước vòng lặp

        if (getAllServerRoless?.success && Array.isArray(getAllServerRoless.response)) {
            console.log(getAllServerRoless?.response)
            const serverRoles = getAllServerRoless.response as any[];

            roleNames.forEach((roleName) => {
                const role = serverRoles.find((item) => item.name === roleName);
                if (role) {
                    const roleId = role._id;
                    const rolePair = { roleId, roleName };
                    rolePairs.push(rolePair);
                }
            });

            console.log(rolePairs);
            // Gửi dispatch với rolePairs
            // dispatch(sendRolePairs(rolePairs));
        }

        NiceModal.show(CreateRole, { rolePairs: rolePairs, serverId: serverId });
    };

    const handleSaveChanges = (roleIndex: any, roleName: string) => {
        // if (isRoleClicked[roleIndex]) {
        const payload = [];

        // Lặp qua các vai trò
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];

            // Kiểm tra vai trò tương ứng với roleIndex
            if (i === roleIndex) {
                // Lặp qua các permissions
                for (let j = 0; j < role.permissions.length; j++) {
                    const permission = role.permissions[j];

                    // Kiểm tra giá trị value của permission
                    if (permission.value) {
                        // Đẩy vị trí lựa chọn vào mảng payload
                        payload.push({ roleIndex: i, permissionIndex: j });
                    }
                }
            }
        }
        const permissionIndexes = payload.map(item => item.permissionIndex);
        console.log(permissionIndexes)
        // Gửi dispatch với payload
        // dispatch(sendpayload(payload));
        console.log(payload)
        let roleId = ''
        if (getAllServerRoless?.success) {
            const role = (getAllServerRoless.response as any)?.find((item: any) => item.name === roleName);

            if (role) {
                console.log(alert("Đã có role này rồi"));
            } else {
                dispatch(createServerRole({ name: roleName, rolePolicies: permissionIndexes, serverId: currentServer._id }))
            }
        }

        // Sau khi lưu thay đổi, cập nhật trạng thái isEditing
        dispatch(getAllServerRoles({ serverId: currentServer._id }))
        console.log(permissionIndexes)
        // }
        // const updatedClickedRoles = [...isRoleClicked];
        // updatedClickedRoles[roleIndex] = true;
        // setIsRoleClicked(updatedClickedRoles);
    };

    const handleUpdate = (roleIndex: any, roleName: string) => {
        const payload = [];

        // Lặp qua các vai trò
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];

            // Kiểm tra vai trò tương ứng với roleIndex
            if (i === roleIndex) {
                // Lặp qua các permissions
                for (let j = 0; j < role.permissions.length; j++) {
                    const permission = role.permissions[j];

                    // Kiểm tra giá trị value của permission
                    if (permission.value) {
                        // Đẩy vị trí lựa chọn vào mảng payload
                        payload.push({ roleIndex: i, permissionIndex: j });
                    }
                }
            }
        }
        const permissionIndexes = payload.map(item => item.permissionIndex);
        console.log(permissionIndexes)
        // Gửi dispatch với payload
        // dispatch(sendpayload(payload));
        console.log(payload)
        let roleId = ''
        if (getAllServerRoless?.success) {
            const role = (getAllServerRoless.response as any)?.find((item: any) => item.name === roleName);

            if (role) {
                roleId = role._id;
                // Sử dụng roleId theo nhu cầu của bạn
                console.log(roleId);
            } else {
                // Không tìm thấy role với name tương ứng
            }
        }
        console.log(roleId);
        console.log(roleName)
        dispatch(updateServerRole({ name: roleName, rolePolicies: permissionIndexes, serverId: serverId, roleId: roleId }))
        // Sau khi lưu thay đổi, cập nhật trạng thái isEditing
    };
    const updateServerRol = useSelector((state: State) => state.updateServerResult)
    console.log(updateServerRol)
    const handleKickUser = (userId:any) => {
        dispatch(kickUser({userId:userId ,serverId:serverId}))
        window.location.reload()
    }
    const kickUserResulT=useSelector((state:State)=>state.kickUserResult)
    console.log(kickUserResulT)
    return (
        <Dialog fullScreen {...muiDialogV5(modal)}>
            <Box sx={{ position: 'relative' }}>
                <IconButton
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 48,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={() => modal.hide()}
                >
                    <CloseIcon />
                </IconButton>

                <DialogTitle>Server settings</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: colors.grey[900],
                            display: 'flex',
                            borderRadius: 1,
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={currentTab}
                            onChange={(event, newTab) => {
                                setCurrentTab(newTab);
                            }}
                            aria-label="Vertical tabs"
                            sx={{ borderRight: 1, borderColor: 'divider', width: 350 }}
                        >
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="Roles" {...a11yProps(1)} />
                            <Tab label="Members" {...a11yProps(2)} />
                        </Tabs>

                        <TabPanel value={currentTab} index={0}>
                            <Typography variant="h5" component="h2" mb={4}>
                                Overview
                            </Typography>
                            <Box display="flex">
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        marginRight: 4,
                                        '&:hover': {
                                            cursor: 'pointer',
                                        },
                                    }}
                                    onClick={() => alert('Change avatar')}
                                />
                                <Stack direction="column" spacing={1}>
                                    <TextField
                                        size="small"
                                        label="Server name"
                                        value={serverName}
                                        onChange={(event) => setServerName(event.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        disabled={serverName === currentServer.name}
                                    // onClick={() => updateServer({ name: serverName })}
                                    >
                                        Save
                                    </Button>
                                </Stack>
                            </Box>
                        </TabPanel>

                        <TabPanel value={currentTab} index={1}>
                            <Typography variant="h5" component="h2">
                                Roles
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                color={'GrayText'}
                                mb={4}
                            >
                                Use roles to manage permissions for your server members.
                            </Typography>

                            <Box display="flex" mb={2} sx={{ width: '100%' }}>
                                <FormControl size="small" sx={{ mr: 1, width: '50ch' }}>
                                    <InputLabel>Search role</InputLabel>
                                    <OutlinedInput
                                        endAdornment={
                                            <InputAdornment position="end" sx={{ color: 'GrayText' }}>
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        label="Search role"
                                    />
                                </FormControl>
                                <Button variant="outlined" onClick={handleAddRole}>Create role</Button>
                            </Box>

                            {_mockRoles_.map((role, index) => (
                                <Accordion
                                    key={index}
                                    sx={{ backgroundColor: colors.grey[900] }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel2"
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                            sx={{ width: '50%', flexShrink: 0 }}
                                        >
                                            {role.name}
                                        </Typography>
                                        <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} onClick={() => NiceModal.show(Table)} />
                                        <Typography sx={{ color: 'text.secondary' }}>
                                            {role.countMember}
                                        </Typography>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <List>
                                            {role.permissions.map((permission, index2) => (
                                                <ListItem key={index2}>
                                                    <ListItemText
                                                        primary={permission.name}
                                                        secondary={permission.description}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Switch
                                                            edge="end"
                                                            checked={permission.value}
                                                            onChange={() => {
                                                                const updatedRoles = [...roles];
                                                                updatedRoles[index].permissions[index2].value = !permission.value;
                                                                setRoles(updatedRoles);
                                                            }}
                                                            value={permission.value}
                                                        />
                                                    </ListItemSecondaryAction>

                                                </ListItem>
                                            ))}
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleSaveChanges(index, role.name)}
                                                    disabled={isRoleClicked[index]}
                                                >
                                                    Tạo
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleUpdate(index, role.name)}
                                                >
                                                    Sửa
                                                </Button>
                                            </div>

                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </TabPanel>

                        <TabPanel value={currentTab} index={2}>
                            <Typography variant="h5" component="h2">
                                Members
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="p"
                                color={'GrayText'}
                                mb={4}
                            >
                                Manage your server members.
                            </Typography>

                            <Box display="flex" mb={2} sx={{ width: '100%' }}>
                                <FormControl
                                    fullWidth
                                    size="small"
                                    sx={{ mr: 1, width: '50ch' }}
                                >
                                    <InputLabel>Search member</InputLabel>
                                    <OutlinedInput
                                        endAdornment={
                                            <InputAdornment position="end" sx={{ color: 'GrayText' }}>
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        label="Search member"
                                    />
                                </FormControl>
                                <Button variant="outlined">Invite member</Button>
                            </Box>

                            <List>
                                    {currentServer.members.map((user: any, index: any) => {
                                        useEffect(() => {
                                            dispatch(getUser({ userId: user }));
                                          }, [user]);
                                          
                                          const getUserResult = useSelector((state: State) => state.getUserResult);
                                        
                                          useEffect(() => {
                                            console.log(getUserResult);
                                          }, [getUserResult]);
                                        return (
                                            <ListItem /*key={index}*/>
                                                <ListItemAvatar>
                                                    <Avatar /*alt={user?.fullname} src={user.avatarUrl}*/ />
                                                </ListItemAvatar>
                                                <ListItemText
                                                primary={user}
                                                // secondary={getUserResulT?.response?.email ?? "Unknown"}
                                                />


                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>handleKickUser(user)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            

                        </TabPanel>
                    </Box>
                </DialogContent>
            </Box>
        </Dialog>
    );
});

export default ServerSettingDialog;