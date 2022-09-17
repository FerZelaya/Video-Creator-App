import React from "react";
import { Page } from "../Page/Page";
import VideoList from "../Videos/VideosList";

const Home = () => {
  return (
    <Page showFooter={true}>
      <VideoList></VideoList>
    </Page>
  );
};

export default Home;
