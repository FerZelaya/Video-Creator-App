import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { Video } from "../../types/returnTypes";
import "./video.css";

export interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Grid key={video.id} item>
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
          <a className="viewLink" href={`/video-details/${video.id}`}>
            <Button size="small">Learn More</Button>
          </a>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default VideoCard;
