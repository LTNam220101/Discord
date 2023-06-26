import NiceModal, { NiceModalHocProps } from '@ebay/nice-modal-react'
import React from 'react'
type CreateTableDialogProps = {
    serverId: string
  
  }
const Table = NiceModal.create<CreateTableDialogProps & NiceModalHocProps>(
    ({ serverId }) => {
    return (
        <div>
            Table
        </div>
    )
}
)
export default Table