import NiceModal, { NiceModalHocProps, muiDialogV5, useModal } from '@ebay/nice-modal-react'
import { Dialog, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServerRoles } from '../../redux-saga/reducers/ServerRole/GetAllServerRoles/actions'
import { State } from '../../redux-saga/reducers'
import { getAllUserBelongToRole } from '../../redux-saga/reducers/ServerRole/GetAllUserBelongToRole/actions'
type CreateTableDialogProps = {
    serverId: string

}
const Tablee = NiceModal.create<CreateTableDialogProps & NiceModalHocProps>(
    ({ serverId }) => {
      const modal = useModal();
      const dispatch = useDispatch();
  
      useEffect(() => {
        dispatch(getAllServerRoles({ serverId: serverId }));
      }, [serverId]);
  
      const getAllServerRoless = useSelector((state: State) => state.getAllServerRolesResult);
      console.log(getAllServerRoless);
  
      const roles = [
        { name: "admin", title: "admin" },
        { name: "owner", title: "owner" },
        { name: "everyone", title: "everyone" }
      ];
      const getAllUserBelongToRolee = useSelector((state: State) => state.getAllUserBelongToRoleResult);
      console.log(getAllUserBelongToRolee);
      useEffect(() => {
        if (getAllServerRoless?.success) {
          roles.forEach((role) => {
            const foundRole = getAllServerRoless?.response && Array.isArray(getAllServerRoless.response) && getAllServerRoless.response.find((item: any) => item.name === role.name);
            if (foundRole) {
              const roleId = foundRole._id;
              console.log(roleId)
              dispatch(getAllUserBelongToRole({ serverId: serverId, roleId: roleId }));
            }
          });
        }
      }, [getAllUserBelongToRolee]);
      return (
        <Dialog fullScreen {...muiDialogV5(modal)}>
          {roles.map((role, index) => (
            <React.Fragment key={index}>
              <div>{role.title}</div>
              { getAllUserBelongToRolee?.response &&
                Array.isArray(getAllUserBelongToRolee.response) &&
                getAllUserBelongToRolee.response
                // .filter((namee: any) => namee.role === role.name)
                  .map((namee: any, index: any) => (
                    <div key={index}>{namee.userId}</div>
                  ))}
            </React.Fragment>
          ))}
  
          <button onClick={() => modal.hide()}>close</button>
        </Dialog>
      );
    }
  );
  
  export default Tablee;
  