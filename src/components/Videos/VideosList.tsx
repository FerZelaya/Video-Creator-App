import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllPublishedVideos } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import VideoCard from "./VideoCard";

const VideoList: React.FC = () => {
  const [listVideos, setListVideos] = useState<Video[]>([]);

  const GetAllPublishedVideos = async () => {
    const publishedVideos: Video[] = await getAllPublishedVideos();
    setListVideos(publishedVideos);
  };

  useEffect(() => {
    GetAllPublishedVideos();
  }, []);

  return (
    <Container maxWidth="lg">
      <Container component="main">
        <Grid container justifyContent={"center"} spacing={2}>
          {listVideos ? (
            listVideos.map((video, index) => {
              return <VideoCard key={index} video={video} />;
            })
          ) : (
            <div>No videos</div>
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default VideoList;
