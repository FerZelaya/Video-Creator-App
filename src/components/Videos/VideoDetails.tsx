import { Avatar, Button, Chip, Container, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoutProp } from "../../App";
import { setNewTokens } from "../../services/users.services";
import { getVideoDetails } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import { Page } from "../Page/Page";
import "./video.css";

const VideoDetails: React.FC<LogoutProp> = ({ setLogout }) => {
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
    <Page showFooter={true} setLogout={setLogout}>
      {videoDetails?.id ? (
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            backgroundColor: "#484d57",
            height: "45vh",
            width: 600,
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#fff",
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <Divider className="divider" sx={{ marginTop: 2, width: "100%" }}>
            <Chip sx={{ color: "#fff" }} label="Information" />
          </Divider>
          <h1>{videoDetails?.title}</h1>
          <h4 className="display-flex">
            Creator: {creatorFullName}{" "}
            <Avatar alt={creatorFullName} src={videoDetails.User.photoUrl} />
          </h4>
          <Link
            className="viewLink"
            to={`/creator-profile/${videoDetails.User.id}`}
          >
            <Button size="small" variant="contained">
              View Profile
            </Button>
          </Link>
          <Divider className="divider" sx={{ marginTop: 4, width: "100%" }}>
            <Chip sx={{ color: "#fff" }} label="Video" />
          </Divider>
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
