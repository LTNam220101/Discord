
  
  import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    colors,
    FormControl,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    OutlinedInput,
    Stack,
    Typography,
    Checkbox,
    IconButton,
  } from '@mui/material';
  import {
    ExpandMore as ExpandMoreIcon,
    Person as PersonIcon,
    Search as SearchIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
  } from '@mui/icons-material';
  import * as React from 'react';
import { Role } from './ServerInterface';
  
  

  const _mockRoles_ = [
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
  
  const RoleSetting: React.FC = () => {
    const [roles, setRoles] = React.useState<Role[]>([]);
  
    const handlePermissionChange = (roleIndex: number, permissionIndex: number, value: boolean) => {
      const updatedRoles = [...roles];
      updatedRoles[roleIndex].permissions[permissionIndex].value = value;
      setRoles(updatedRoles);
    };
  
    const handleMoveLeft = (roleIndex: number, permissionIndex: number) => {
      if (permissionIndex > 0) {
        const updatedRoles = [...roles];
        const tempPermission = updatedRoles[roleIndex].permissions[permissionIndex];
        updatedRoles[roleIndex].permissions[permissionIndex] =
          updatedRoles[roleIndex].permissions[permissionIndex - 1];
        updatedRoles[roleIndex].permissions[permissionIndex - 1] = tempPermission;
        setRoles(updatedRoles);
      }
    };
  
    const handleMoveRight = (roleIndex: number, permissionIndex: number) => {
      if (permissionIndex < roles[roleIndex].permissions.length - 1) {
        const updatedRoles = [...roles];
        const tempPermission = updatedRoles[roleIndex].permissions[permissionIndex];
        updatedRoles[roleIndex].permissions[permissionIndex] =
          updatedRoles[roleIndex].permissions[permissionIndex + 1];
        updatedRoles[roleIndex].permissions[permissionIndex + 1] = tempPermission;
        setRoles(updatedRoles);
      }
    };
  
    const handleSubmit = () => {
      // Lưu thông tin roles theo yêu cầu của bạn
      console.log(roles);
    };
  
    return (
      <>
        <Stack>
          {/* ... */}
          {_mockRoles_.map((role, roleIndex) => (
            <Accordion key={roleIndex} sx={{ backgroundColor: colors.grey[900] }}>
              {/* ... */}
              <AccordionDetails>
                <List>
                  {role.permissions.map((permission, permissionIndex) => (
                    <ListItem key={permissionIndex}>
                      <ListItemText primary={permission.name} secondary={permission.description} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleMoveLeft(roleIndex, permissionIndex)}
                          disabled={permissionIndex === 0}
                        >
                          <ChevronLeftIcon />
                        </IconButton>
                        <Checkbox
                          edge="end"
                          checked={permission.value}
                          onChange={(event) =>
                            handlePermissionChange(roleIndex, permissionIndex, event.target.checked)
                          }
                        />
                        <IconButton
                          edge="end"
                          onClick={() => handleMoveRight(roleIndex, permissionIndex)}
                          disabled={permissionIndex === role.permissions.length - 1}
                        >
                          <ChevronRightIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
  
        <Button variant="outlined" onClick={handleSubmit}>
          Save
        </Button>
      </>
    );
  };
  
  export default RoleSetting;
  