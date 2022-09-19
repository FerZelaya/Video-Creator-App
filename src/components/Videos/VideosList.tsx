import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { setNewTokens } from "../../services/users.services";
import { getAllPublishedVideos } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import VideoCard from "./VideoCard";

const VideoList: React.FC = () => {
  const [listVideos, setListVideos] = useState<Video[]>([]);

  const GetAllPublishedVideos = async () => {
    const publishedVideos = await getAllPublishedVideos()
      .then((response) => response.data)
      .catch((error) => {
        setNewTokens();
        // window.location.reload();
      });
    setListVideos(publishedVideos);
  };

  useEffect(() => {
    GetAllPublishedVideos();
    console.log(listVideos);
  }, []);

  return (
    <Container maxWidth="lg">
      <Container component="main">
        <Grid container justifyContent={"center"} spacing={2}>
          {listVideos && Array.isArray(listVideos) ? (
            listVideos.map(
              (video: Video, index: React.Key | null | undefined) => {
                return <VideoCard key={index} video={video} />;
              },
            )
          ) : (
            <div>No videos, reload page</div>
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default VideoList;
