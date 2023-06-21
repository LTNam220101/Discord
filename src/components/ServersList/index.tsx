import React, { useEffect } from "react";
import { Stack, useTheme } from "@mui/material";
import LazyLoadComponent from 'react-lazyload';
import ServerItem from "../ServerItem";
import AddServerBtn from "../AddServerBtn/AddServerOnColumn";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux-saga/reducers";
import { LISTJOINSERVER } from "../../redux-saga/actions";

const ServersList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const listJoinedServer = useSelector(
    (state: State) => state.createServer.listJoinedServer[0]?.response?.data
  );
  console.log(listJoinedServer)

  useEffect(() => {
    dispatch({ type: LISTJOINSERVER });
  }, [dispatch]);

  return (
    <Stack
  direction="column"
  height="100%"
  py={1}
  spacing={2}
  bgcolor="rgba(30,31,34,255)"
>
  <ServerItem isDirect={true} name="Direct Messages" />

  {listJoinedServer &&
  listJoinedServer.map((server: any) => (
    <div key={server._id} style={{ height: "100px" }}>
      <LazyLoadComponent>
        <ServerItem
          serverId={server._id}
          name={server.name}
          imgUrl={
            server.avatarUrl ||
            `https://ui-avatars.com/api/?name=${server.name
              ?.split(" ")
              .join()}&background=313338&color=d6d9dc&font-size=0.33`
          }
        />
      </LazyLoadComponent>
    </div>
  ))}


  <AddServerBtn />
</Stack>

  );
};

export default ServersList;
