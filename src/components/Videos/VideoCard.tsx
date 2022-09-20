import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setNewTokens } from "../../services/users.services";
import { likeVideo } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import { FiThumbsUp } from "react-icons/fi";
import "./video.css";

export interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoDetailsURL = `/video-details/${video.id}`;

  const onClickLikeVideo = async (videoId: number) => {
    const result = await likeVideo(videoId)
      .then((response) => response.data)
      .catch(() => {
        toast.success("Refreshing token. Please reload page.");
        setNewTokens();
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
  useEffect(() => {}, []);
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
          <IconButton onClick={() => onClickLikeVideo(video.id)}>
            <FiThumbsUp color="#fff" />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default VideoCard;
