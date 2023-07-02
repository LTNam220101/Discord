import * as React from 'react';
import {
  DialogTitle,
  DialogContent,
  IconButton,
  Dialog,
  Container,
  TextField,
  Stack,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useEffect } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import NiceModal, { NiceModalHocProps, muiDialogV5, useModal } from '@ebay/nice-modal-react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel } from '../../redux-saga/reducers/Channel/CreateChannel/actions';
import { State } from '../../redux-saga/reducers';
import { useNavigate } from 'react-router-dom';
import { getAllChannelByServer } from '../../redux-saga/reducers/Channel/GetAllChannelByServer/actions';
import { getListServerJoined } from '../ServersList/actions';
import { CREATE_CHANNEL_CLEAR } from '../../redux-saga/reducers/Channel/CreateChannel/reducers';
// import { createChannelAction } from 'src/features/server/serverSlice';

interface AddChannelDialogProps {
  serverId: string;
}

const AddChannelDialog = NiceModal.create<AddChannelDialogProps & NiceModalHocProps>(({ serverId }) => {
  const modal = useModal();
  const [nameChannel, setNameChannel] = React.useState<string | null>(null);
  const [description, setDescription] = React.useState<string | null>(null);
  const [channelType, setChannelType] = React.useState<'text' | 'voice'>(
    'text'
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNameChannel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameChannel(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelType(e.target.value as 'text' | 'voice');
  };
  const userId = localStorage.getItem('id');
  const [shouldReload, setShouldReload] = React.useState(false);
  const handleSubmitCreateChannel = () => {
    const data = {
      userId,
      serverId,
      name: nameChannel,
      description: description,
      type: channelType === 'text' ? 0 : 1,
      isPrivate: false,
    };
    dispatch(createChannel(data));
    dispatch(getAllChannelByServer({ serverId }))
    modal.hide();
  };
  const channel = useSelector((state: State) => state.createChannelResult)
  console.log(channel)
  useEffect(() => {
    if (channel) {
      if (channel?.success) {
        dispatch(getAllChannelByServer({ serverId })) // Reload danh sách server
        navigate(`/channels/${serverId}`)
      }
      else if(channel?.success===false) {
        modal.hide()
        alert('ban khong co quyen ')
        
      }
    }
    return () => {
      dispatch({type:CREATE_CHANNEL_CLEAR})
    }
  }, [channel]);

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Container sx={{ position: 'relative', width: 500 }}>
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
        <DialogTitle align="center">Create Channel</DialogTitle>
        <DialogContent>
          <Typography fontWeight={500} fontSize={16}>
            Channel type
          </Typography>
          <FormControl>
            <RadioGroup value={channelType} onChange={handleChangeType}>
              <FormControlLabel value="text" control={<Radio />} label="Text" />
              <FormControlLabel
                value="voice"
                control={<Radio />}
                label="Voice"
              />
            </RadioGroup>
          </FormControl>
          <Stack spacing={1.5} pt={1}>
            <TextField
              onChange={handleNameChannel}
              id="outlined-basic"
              label="Channel Name"
              variant="outlined"
            />
            <TextField
              onChange={handleDescription}
              multiline
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <Stack direction="row-reverse" pb={2}>
          <Button onClick={handleSubmitCreateChannel} variant="contained">
            Create
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
});

export default AddChannelDialog;
