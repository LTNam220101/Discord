import React, { useCallback, useEffect, useState } from 'react';
import {
    DialogTitle,
    DialogContent,
    IconButton,
    Dialog,
    Container,
    TextField,
    Stack,
    Button,
    Divider,
    Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useDispatch, useSelector } from 'react-redux';
// import {
//     createServerAction,
//     getListJoinedServerAction,
// } from 'src/features/server/serverSlice';
// import serverAPI from 'src/features/server/serverAPI';
// import LoadingModal from 'src/commons/components/LoadingModal';
import { toast } from 'react-toastify';
import { State } from '../../redux-saga/reducers';
import { createServer } from '../../redux-saga/reducers/Server/CreateServer/actions';
import { createServerRole } from '../../redux-saga/reducers/ServerRole/CreateServerRole/actions';
import { joinWithLink } from '../../redux-saga/reducers/User/JoinWithLink/actions';
import { getListServerJoined } from '../ServersList/actions';
import { useNavigate } from 'react-router-dom';



const AddServerDialog = NiceModal.create(() => {
    const modal = useModal();
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [nameServer, setNameServer] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [serverCode, setServerCode] = useState<string | null>(null);

    const handleNameServer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameServer(e.target.value);
    };

    const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const onCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerCode(e.target.value);
    };
    const [shouldReload, setShouldReload] = useState(false);

    const handleCreateServer = () => {
      if (localStorage.getItem("id")) {
        const data = {
          name: nameServer,
          description: description,
          isPublic: true,
          ownerId: localStorage.getItem("id"),
        };
        console.log(data);
        dispatch(createServer(data));
        dispatch(getListServerJoined());
        setShouldReload(true); // Đánh dấu cần reload dữ liệu
        modal.hide();
      }
    };
    useEffect(() => {
      if (shouldReload) {
        dispatch(getListServerJoined()); // Reload danh sách server
        setShouldReload(false); 
        navigate("/")// Đặt lại giá trị của biến đánh dấu sau khi đã reload
      }
    }, [shouldReload,navigate]);
    
    const listServerJoined = useSelector(
        (state: State) => state.getListServerJoinedResult
    )
    console.log(listServerJoined)

    const handleJoinServer = () => {
        console.log(typeof serverCode)
        dispatch(joinWithLink({ code: serverCode }))

    };
    const joinWithLinkResulT = useSelector((state: State) => state.joinWithLinkResult)
    console.log(joinWithLinkResulT?.response)
    useEffect(() => {
        if (joinWithLinkResulT) {
          // Xử lý khi action joinWithLink thành công
          console.log("Dispatch success:", joinWithLinkResulT);
        }
      }, [joinWithLinkResulT]);

    const CreateServerResult = useSelector((state: State) => state.createServerResult)
    console.log(CreateServerResult?.response)
    const CreateServerRoleResult = useSelector((state: State) => state.createServerRoleResult)
    console.log(CreateServerRoleResult)
    return (
        <Dialog {...muiDialogV5(modal)}>
            <Container sx={{ position: 'relative', width: 400 }}>
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
                <DialogTitle align="center">Create new Server</DialogTitle>
                <DialogContent>
                    <Stack p={1} spacing={2}>
                        <TextField
                            onChange={handleNameServer}
                            label="Server Name"
                            variant="outlined"
                        />
                        <TextField
                            onChange={handleDescription}
                            multiline
                            label="Description"
                            variant="outlined"
                        />
                    </Stack>

                    <Stack direction="row-reverse" pb={2}>
                        <Button onClick={handleCreateServer} variant="contained">
                            Create
                        </Button>
                    </Stack>

                    <Divider sx={{ marginY: 2 }} />

                    <Stack>
                        <Typography pt={1} fontWeight={500} fontSize={18}>
                            Join a server with code
                        </Typography>

                        <TextField
                            sx={{ mt: 2 }}
                            onChange={onCodeInputChange}
                            multiline
                            margin="dense"
                            label="Server code"
                            variant="outlined"
                        />
                        <Stack direction="row-reverse" py={1}>
                            <Button onClick={handleJoinServer} variant="contained">
                                Join Server
                            </Button>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Container>
        </Dialog>
    );
}
)

export default AddServerDialog;
