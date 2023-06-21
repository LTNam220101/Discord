import * as React from "react"
import { Container, Dialog } from "@mui/material"
import { ReactComponent as Loading } from "../../assets/loading.svg"
import NiceModal, { useModal, muiDialogV5 } from "@ebay/nice-modal-react"

const LoadingModal = NiceModal.create(() => {
  const modal = useModal()

  return (
    <Dialog {...muiDialogV5(modal)}>
      <Container sx={{ position: "relative" }}>
        {/* <img src={Loading} alt="loading" /> */}
      </Container>
    </Dialog>
  )
})

export default LoadingModal
