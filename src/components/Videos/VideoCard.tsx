import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setNewTokens } from "../../services/users.services";
import { likeVideo } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import { FiThumbsUp, FiCheckCircle } from "react-icons/fi";
import "./video.css";
import { AxiosError } from "axios";

export interface VideoCardProps {
  video: Video;
  likedVideos: Video[];
}

const VideoCard: React.FC<VideoCardProps> = ({ video, likedVideos }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const videoDetailsURL = `/video-details/${video.id}`;

  const onClickLikeVideo = async (videoId: number) => {
    const result = await likeVideo(videoId)
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          toast.success("Refreshing token. Please reload page.");
          setNewTokens();
        } else {
          toast.error("Error Liking this video");
        }
      });
    if (result === true) {
      toast.success("Video liked successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      toast.error("Error liking video");
    }
  };
  useEffect(() => {
    setIsLiked(likedVideos.some((e) => e.id === video.id));
  }, [likedVideos, video.id]);
  return (
    <Grid item>
      <Card
        sx={{
          minWidth: 370,
          minHeight: 170,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        style={{ backgroundColor: "#102565", color: "#fff" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            Creator: {video.User.firstName} {video.User.lastName}
          </Typography>
          <Typography variant="h5" component="div">
            {video.title}
          </Typography>
        </CardContent>
        <CardActions className="cardButtonsContainer">
          <a
            className="viewLink"
            target="_blank"
            href={video.videoUrl}
            rel="noopener noreferrer"
          >
            <Button variant={"contained"} size="small">
              View Video
            </Button>
          </a>
          <Link className="viewLink" to={videoDetailsURL}>
            <Button size="small">Learn More</Button>
          </Link>
          {!isLiked ? (
            <IconButton onClick={() => onClickLikeVideo(video.id)}>
              <FiThumbsUp color="#fff" />
            </IconButton>
          ) : (
            <IconButton disabled>
              <FiCheckCircle color="#fff" />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default VideoCard;
