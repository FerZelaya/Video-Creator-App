import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Video } from "../../types/returnTypes";
import "./video.css";

export interface VideoCardProps {
  video: Video;
}

const VideoCardForCreatorProfile: React.FC<VideoCardProps> = ({ video }) => {
  const videoDetailsURL = `/video-details/${video.id}`;
  useEffect(() => {}, []);
  return (
    <Grid item>
      <Card
        sx={{
          minWidth: 330,
          minHeight: 170,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
        style={{ backgroundColor: "#102565", color: "#fff" }}
      >
        <CardContent>
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
        </CardActions>
      </Card>
    </Grid>
  );
};

export default VideoCardForCreatorProfile;
