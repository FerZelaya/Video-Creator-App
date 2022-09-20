/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FiUploadCloud, FiDownloadCloud, FiEdit } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Video } from "../../types/returnTypes";
import "./video.css";
import {
  editVideo,
  PostVideoProps,
  publishOrUnpublishVideo,
} from "../../services/videos.services";
import { toast } from "react-toastify";
import { setNewTokens } from "../../services/users.services";

export interface VideoCardProps {
  video: Video;
  userId?: number;
}

const VideoCardForCreatorProfile: React.FC<VideoCardProps> = ({
  video,
  userId,
}) => {
  const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);
  const [minCardWidth, setMinCardWidth] = useState<number>(330);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [videoInputs, setVideoInputs] = useState<PostVideoProps>({
    title: video.title,
    videoUrl: video.videoUrl,
    videoId: video.id,
  });
  const videoDetailsURL = `/video-details/${video.id}`;

  const publishVideo = async (videoId: number) => {
    const result = await publishOrUnpublishVideo(videoId)
      .then((response) => response.data)
      .catch(() => {
        toast.success("Refreshing token. Please reload page.");
        setNewTokens();
      });
    if (result === true) {
      toast.success("Video published successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      toast.error("Error publishing video");
    }
  };

  const unPublishVideo = async (videoId: number) => {
    const result = await publishOrUnpublishVideo(videoId)
      .then((response) => response.data)
      .catch(() => {
        toast.success("Refreshing token. Please reload page.");
        setNewTokens();
      });
    if (result === true) {
      toast.success("Video unpublished successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      toast.error("Error unpublishing video");
    }
  };

  const handleClickOpen = (open: boolean) => {
    setOpenEdit(open);
  };

  const onClickEditVideo = async (videoId: number) => {
    if (videoInputs.title === "" || videoInputs.videoUrl === "") {
      toast.error("Empty Fields!");
    } else {
      const video: Video = await editVideo(videoInputs);
      if (video) {
        handleClickOpen(false);
        toast.success("Video edited successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Error editing video");
      }
    }
  };
  const handleChange = (event: any) => {
    setVideoInputs({ ...videoInputs, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (userId && video.User.id === userId) {
      setIsLoggedUser(true);
      setMinCardWidth(450);
    }
  }, []);

  return (
    <Grid item>
      <Card
        sx={{
          minWidth: minCardWidth,
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

          {isLoggedUser && (
            <>
              <IconButton
                onClick={() =>
                  video.published
                    ? unPublishVideo(video.id)
                    : publishVideo(video.id)
                }
              >
                {video.published ? (
                  <FiDownloadCloud color="red" />
                ) : (
                  <FiUploadCloud color="#fff" />
                )}
              </IconButton>
              <IconButton onClick={() => handleClickOpen(true)}>
                <FiEdit color="#fff" />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
      <Dialog open={openEdit} onClose={() => handleClickOpen(false)}>
        <DialogTitle>Edit Video</DialogTitle>
        <DialogContent>
          <TextField
            focused
            margin="dense"
            id="title"
            label="Title"
            name="title"
            type="text"
            fullWidth
            required
            variant="filled"
            value={videoInputs.title}
            onChange={handleChange}
          />
          <TextField
            focused
            margin="dense"
            id="videoUrl"
            label="Video URL"
            name="videoUrl"
            type="text"
            fullWidth
            required
            variant="filled"
            value={videoInputs.videoUrl}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClickOpen(false)}>Cancel</Button>
          <Button onClick={() => onClickEditVideo(video.id)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default VideoCardForCreatorProfile;
