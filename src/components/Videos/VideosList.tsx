/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loggedUserProfile, setNewTokens } from "../../services/users.services";
import { getAllPublishedVideos } from "../../services/videos.services";
import { CreatorProfileProp, Video } from "../../types/returnTypes";
import VideoCard from "./VideoCard";

const VideoList: React.FC = () => {
  const [listVideos, setListVideos] = useState<Video[]>([]);
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  const GetAllPublishedVideos = async () => {
    const publishedVideos = await getAllPublishedVideos()
      .then((response) => response.data)
      .catch(() => {
        toast.success("Refreshing token. Please reload page.");
        setNewTokens();
      });
    setListVideos(publishedVideos);
    GetUserLikedVideos();
  };
  const GetUserLikedVideos = async () => {
    const userDetails: CreatorProfileProp = await loggedUserProfile()
      .then((response) => response.data)
      .catch((error: Error) => {
        console.log(error.message);
        toast.success("Refreshing token. Please reload page.");
        setNewTokens();
      });
    setLikedVideos(userDetails.user.likedVideos);
  };

  useEffect(() => {
    GetAllPublishedVideos();
  }, []);

  return (
    <Container maxWidth="xl">
      <Container component="main">
        <Grid container justifyContent={"center"} spacing={2}>
          {listVideos && Array.isArray(listVideos) ? (
            listVideos.map(
              (video: Video, index: React.Key | null | undefined) => {
                return (
                  <VideoCard
                    key={index}
                    video={video}
                    likedVideos={likedVideos}
                  />
                );
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
