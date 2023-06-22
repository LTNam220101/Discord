import NiceModal, { muiDialogV5, useModal } from "@ebay/nice-modal-react"
import { Close as CloseIcon } from "@mui/icons-material"
import React, { useEffect, useState } from "react"
import instance from "../redux-saga/sagas/BaseApi"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Container,
  IconButton,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack
} from "@mui/material"
import LoadingModal from "../commons/LoadingModal"

type CreateInvitationDialogProps = {
  serverId: string
  ownerId: string
}

const CreateInvitationDialog = NiceModal.create<CreateInvitationDialogProps>(
  ({ serverId, ownerId }) => {
    const modal = useModal()

    const [server, setServer] = useState<any>(null)
    const [expireTime, setExpireTime] = useState<number>(7)
    const [code, setCode] = useState<string>("")

    const handleSubmit = () => {
      NiceModal.show(LoadingModal)

      instance
        .post(
          "http://localhost:3000/invite",
          { serverId, expireTime, ownerId },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          }
        )
        .then((res) => {
          setCode(res.data.data.inviteCode)
          NiceModal.hide(LoadingModal)
        })
        .catch(() => {
          NiceModal.hide(LoadingModal)
        })
    }

    useEffect(() => {
      NiceModal.show(LoadingModal)
    }, [])

    return (
      <Dialog {...muiDialogV5(modal)}>
        {
          <Container sx={{ position: "relative", width: 500 }}>
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                top: 8,
                right: 16,
                color: (theme) => theme.palette.grey[500]
              }}
              onClick={() => modal.hide()}
            >
              <CloseIcon />
            </IconButton>
            <DialogTitle>Create invitation code</DialogTitle>

            <DialogContent>
              <TextField
                fullWidth
                label="Expiration time (days)"
                type="number"
                margin="dense"
                value={expireTime}
                onChange={(e) => setExpireTime(Number(e.target.value))}
              />

              {code && (
                <Stack
                  sx={{ mt: 2 }}
                  spacing={1}
                  direction="row"
                  width="100%"
                  alignItems="center"
                >
                  <Typography>Invitation code:</Typography>

                  <Typography variant="h6" color="green">
                    {code}
                  </Typography>
                </Stack>
              )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={() => modal.hide()}>
                Cancel
              </Button>

              <Button variant="outlined" onClick={handleSubmit}>
                OK
              </Button>
            </DialogActions>
          </Container>
        }
      </Dialog>
    )
  }
)
export default CreateInvitationDialog
