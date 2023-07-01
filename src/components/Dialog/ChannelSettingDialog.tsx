import NiceModal, { NiceModalHocProps, muiDialogV5, useModal } from '@ebay/nice-modal-react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
    Container,
    IconButton,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
    DialogActions,
    Button,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
// import serverAPI from 'src/features/server/serverAPI';
import { useDispatch, useSelector } from 'react-redux';
import LoadingModal from '../../commons/LoadingModal';
import { deleteChannel } from '../../redux-saga/reducers/Channel/DeleteChannel/actions';
import { getAllChannelByServer } from '../../redux-saga/reducers/Channel/GetAllChannelByServer/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { getChannelInfo } from '../../redux-saga/reducers/Channel/GetChannelById/actions';
import { State } from '../../redux-saga/reducers';
// import { updateChannelAction } from 'src/features/server/serverSlice';

interface ChannelSettingDialogProps {
    channelId: any;
    serverId:any;
}

const ChannelSettingDialog= NiceModal.create<ChannelSettingDialogProps & NiceModalHocProps>(({channelId,serverId}) => {
    const modal = useModal();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    console.log(serverId)
    const [channelDetail, setChannelDetail] = React.useState(true);
    useEffect(()=>{
        dispatch(getChannelInfo({channel:channelId}))
    },[])
    
    const getChannelInfor=useSelector((state:State)=>state.getChannelInfoResult)
    const getChannelInforr=getChannelInfor?.response
    console.log(getChannelInforr)
    const [input, setInput] = React.useState({
        name: getChannelInforr?.name ?? '',
        description: getChannelInforr?.description ?? ''
      });

    console.log(getChannelInforr)
    const handleSubmit = () => {
        // dispatch(updateChannelAction({ id: channelId, data: input }));
    };
    

    const handleDelete=()=>{
        dispatch(deleteChannel({channelId:channelId,serverId:serverId}))
       modal.hide()
    }


    console.log("channelId",channelId)
    return (
        <Dialog {...muiDialogV5(modal)}>
            {channelDetail && (
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
                    <DialogTitle>Channel settings</DialogTitle>

                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Channel name"
                            variant="outlined"
                            margin="dense"
                            value={input.name}
                            onChange={(e) => setInput({ ...input, name: e.target.value })}
                        />

                        <FormControl sx={{ mt: 2 }}>
                            <FormLabel>Channel type</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="text"
                                    control={<Radio readOnly />}
                                    label="Text"
                                    checked={ getChannelInforr?.type === 0}
                                />
                                <FormControlLabel
                                    value="voice"
                                    control={<Radio readOnly />}
                                    label="Voice"
                                    checked={ getChannelInforr?.type === 1}
                                />
                            </RadioGroup>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            margin="dense"
                            multiline
                            value={input.description}
                            onChange={(e) =>
                                setInput({ ...input, description: e.target.value })
                            }
                            maxRows={4}
                            sx={{ marginTop: 2 }}
                        />
                        <button onClick={handleDelete}>Delete</button>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="outlined" onClick={() => modal.hide()}>
                            Cancel
                        </Button>

                        <Button variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </Container>
            )}
        </Dialog>
    );
}
)
export default ChannelSettingDialog;
