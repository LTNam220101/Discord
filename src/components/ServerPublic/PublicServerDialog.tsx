import NiceModal, { muiDialogV5, useModal } from '@ebay/nice-modal-react'
import { Dialog, Grid, Avatar, Typography, styled } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getServersPublic } from '../../redux-saga/reducers/Server/GetServersPublic/actions';
import { State } from '../../redux-saga/reducers';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Thêm hiệu ứng bóng đổ cho hình tròn
}));

const ServerItemWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const PublicServerDialog = NiceModal.create(() => {
  const dispatch = useDispatch()
  const modal = useModal();
  const getServersPublicResult = useSelector((state: State) => state.getServersPublicResult)
  const ListServerPublic = getServersPublicResult?.response?.data

  useEffect(() => {
    dispatch(getServersPublic())
  }, [dispatch])

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Grid container spacing={3}>
        {(ListServerPublic as any)?.map((server: any) => (
          <Grid item key={server.id}>
            <ServerItemWrapper>
              <StyledAvatar alt={server.name} src={server.avatarUrl} />
              <Typography variant="body2" component="div" mt={1}>
                {server.name.slice(0, 3)}
              </Typography>
            </ServerItemWrapper>
          </Grid>
        ))}
      </Grid>
    </Dialog>
  )
})

export default PublicServerDialog
