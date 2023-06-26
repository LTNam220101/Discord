// import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Container,
//   IconButton,
//   DialogActions,
//   Button,
//   TextField,
//   Typography,
//   Stack,
//   useScrollTrigger,
// } from '@mui/material';
// import { Close as CloseIcon } from '@mui/icons-material';
// import React, { useEffect } from 'react';
// import LoadingModal from '../../commons/LoadingModal';
// import { useDispatch, useSelector } from 'react-redux';
// import { createInvite } from '../../redux-saga/reducers/Invite/CreateInvite/actions';
// import { State } from '../../redux-saga/reducers';
// // import serverAPI from 'src/features/server/serverAPI';
// // import LoadingModal from 'src/commons/components/LoadingModal';
// type CreateInvitationDialogProps = {
//   serverId: string
// }
// const CreateInvitationDialog = NiceModal.create<CreateInvitationDialogProps>(({ serverId }) => {
//   const modal = useModal();
//   const dispatch=useDispatch();
//   const [server, setServer] = React.useState<any>(null);
//   const [expireTime, setExpireTime] = React.useState<number>(7);
//   const [code, setCode] = React.useState<string>('');
// console.log("hi")

//   const createInvitE=useSelector((state:State)=>state.createInvite)
//   console.log(createInvitE)

//   const handleSubmit = () => {
//     NiceModal.show(LoadingModal);
    
//     dispatch(createInvite(serverId, expireTime.toString()));




//     // serverAPI
//     //   .createInvitationCode(serverId, { expireTime })
//     //   .then((res) => {
//     //     setCode(res.data.data.inviteCode);
//     //     NiceModal.hide(LoadingModal);
//     //   })
//     //   .catch(() => {
//     //     NiceModal.hide(LoadingModal);
//     //   });
//   };

//   useEffect(() => {
//     // NiceModal.show(LoadingModal);

//     // serverAPI.getServerInfo(serverId).then((res) => {
//     //   setServer(res.data.data);
//     //   NiceModal.hide(LoadingModal);
//     // });
//   }, []);

//   return (
//     <Dialog {...muiDialogV5(modal)}>
//       {server && (
//         <Container sx={{ position: 'relative', width: 500 }}>
//           <IconButton
//             aria-label="close"
//             sx={{
//               position: 'absolute',
//               top: 8,
//               right: 16,
//               color: (theme) => theme.palette.grey[500],
//             }}
//             onClick={() => modal.hide()}
//           >
//             <CloseIcon />
//           </IconButton>
//           <DialogTitle>Create invitation code</DialogTitle>

//           <DialogContent>
//             <TextField
//               fullWidth
//               label="Expiration time (days)"
//               type="number"
//               margin="dense"
//               value={expireTime}
//               onChange={(e) => setExpireTime(Number(e.target.value))}
//             />

//             {code && (
//               <Stack
//                 sx={{ mt: 2 }}
//                 spacing={1}
//                 direction="row"
//                 width="100%"
//                 alignItems="center"
//               >
//                 <Typography variant="body1">Invitation code:</Typography>

//                 <Typography variant="h6" color="green">
//                   {code}
//                 </Typography>
//               </Stack>
//             )}
//           </DialogContent>

//           <DialogActions sx={{ justifyContent: 'flex-end' }}>
//             <Button variant="outlined" onClick={() => modal.hide()}>
//               Cancel
//             </Button>

//             <Button variant="outlined" onClick={handleSubmit}>
//               OK
//             </Button>
//           </DialogActions>
//         </Container>
//       )}
//     </Dialog>
//   );
// });

// export default CreateInvitationDialog;
