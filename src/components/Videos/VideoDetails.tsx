import { Avatar, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setNewTokens } from "../../services/users.services";
import { getVideoDetails } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import { Page } from "../Page/Page";
import "./video.css";

interface VideoDetailsProps {}

const VideoDetails: React.FC<VideoDetailsProps> = () => {
  const [videoDetails, setVideoDetails] = useState<Video>();
  const { videoId } = useParams();
  const creatorFullName = `${videoDetails?.User.firstName} ${videoDetails?.User.lastName}`;
  const GetVideoDetails = async () => {
    if (!videoId) {
      toast.error("Error getting video ID param!");
    } else {
      const videoDetails = await getVideoDetails(parseInt(videoId))
        .then((response) => response.data)
        .catch((error) => {
          toast.success("Refreshing token. Please reload page.");
          setNewTokens();
        });
      setVideoDetails(videoDetails);
    }
  };
  useEffect(() => {
    GetVideoDetails();
  }, []);
  return (
    <Page showFooter={true}>
      {videoDetails?.id ? (
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            backgroundColor: "#484d57",
            height: "30vh",
            width: 600,
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#fff",
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <h1>{videoDetails?.title}</h1>
          <h4 className="display-flex">
            Creator: {creatorFullName}{" "}
            <Avatar alt={creatorFullName} src={videoDetails.User.photoUrl} />
            <Link
              className="viewLink"
              to={`/creator-profile/${videoDetails.User.id}`}
            >
              <Button size="small" variant="contained">
                View Profile
              </Button>
            </Link>
          </h4>
          <h4>
            Video URL:{" "}
            <a target="_blank" rel="noreferrer" href={videoDetails.videoUrl}>
              {videoDetails?.videoUrl}
            </a>
          </h4>
        </Container>
      ) : (
        <h1>No Details</h1>
      )}
    </Page>
  );
};

export default VideoDetails;
