import NiceModal, { NiceModalHocProps, muiDialogV5, useModal } from "@ebay/nice-modal-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServerInfo } from "../../redux-saga/reducers/Server/GetServerById/actions";
import { Dialog } from "@mui/material";
import { State } from "../../redux-saga/reducers";
import { responseRequest } from "../../redux-saga/reducers/Server/ResponseRequest/actions";


interface DialogProps {
    serverId: string,
}

const RequestJoinServer = NiceModal.create<DialogProps & NiceModalHocProps>(({ serverId }) => {
    const modal = useModal();
    const dispatch = useDispatch();
    const acceptTrue = true;
    const NoAccept=false;
    useEffect(() => {
        dispatch(getServerInfo({ serverId: serverId }))
    }, [serverId])
    const getServerInfor = useSelector((state: State) => state.getServerByIdResult)
    console.log(getServerInfor)
    const handleAccept = ({booleann,request}: { booleann: boolean, request: any }) => {
        console.log({userIdRequest:request,serverId:serverId,acceptJoined:booleann})
        dispatch(responseRequest({userIdRequest:request,serverId:serverId,acceptJoin:booleann}))
    }
    return (
        <Dialog {...muiDialogV5(modal)}>
            <div>Request Join Server</div>;
            <Dialog {...muiDialogV5(modal)}>
                <div>Request Join Server</div>
                {Array.isArray(getServerInfor?.response?.requestJoinUsers) ? (
                    getServerInfor?.response?.requestJoinUsers.map((request: any, index: any) => {
                        return (<div key={index}>
                            {request}
                            <button onClick={() => handleAccept({booleann:acceptTrue,request})}>True</button>
                            <button onClick={() => handleAccept({booleann:NoAccept,request})}>False</button>
                        </div>)
                    })
                ) : null}
                <button onClick={() => modal.hide()}>close</button>
            </Dialog>

        </Dialog>
    )
}
)
export default RequestJoinServer