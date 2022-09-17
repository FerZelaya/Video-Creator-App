import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FiHome, FiUser, FiLogOut, FiPlus } from "react-icons/fi";

import "./footer.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { postNewVideo, PostVideoProps } from "../../services/videos.services";
import { Video } from "../../types/returnTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Footer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [videoInputs, setVideoInputs] = useState<PostVideoProps>({
    title: "",
    videoUrl: "",
  });
  const Navigate = useNavigate();

  const handleChange = (event: any) => {
    setVideoInputs({ ...videoInputs, [event.target.name]: event.target.value });
  };

  const onClickPostVideo = async (e: any) => {
    if (videoInputs.title === "" || videoInputs.videoUrl === "") {
      toast.error("Empty Fields!");
    } else {
      const video: Video = await postNewVideo(videoInputs);
      if (video) {
        window.location.reload();
      } else {
        toast.error("Error posting video");
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <FiHome size="2em" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <FiUser size="2em" />
            </NavLink>
          </li>
          <li onClick={handleClickOpen}>
            <FiPlus size="2em" />
          </li>
          <li>
            <NavLink to="/signout">
              <FiLogOut size="2em" />
            </NavLink>
          </li>
        </ul>
      </nav>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Video</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
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
            autoFocus
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onClickPostVideo}>Post</Button>
        </DialogActions>
      </Dialog>
    </footer>
  );
};
