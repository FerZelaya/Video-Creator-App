import React from "react";
import { LogoutProp } from "../../App";
import { Page } from "../Page/Page";
import VideoList from "../Videos/VideosList";

const Home: React.FC<LogoutProp> = ({ setLogout }) => {
  return (
    <Page showFooter={true} setLogout={setLogout}>
      <VideoList></VideoList>
    </Page>
  );
};

export default Home;
