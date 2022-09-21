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
import { logoutUser } from "../../services/users.services";
import { removeLocalStorage, setJWT } from "../../utilities/axios";

interface FooterProps {
  setLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setLogout }) => {
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
        toast.success("Video Posted! Go to your profile to publish it.");
      } else {
        toast.error("Error posting video");
      }
    }
  };

  const onClickLogout = async () => {
    await logoutUser();

    setLogout?.();

    Navigate("/login");
  };

  const handleClickOpen = (open: boolean) => {
    setOpen(open);
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
          <li onClick={() => handleClickOpen(true)}>
            <FiPlus size="2em" />
          </li>
          <li onClick={() => onClickLogout()}>
            <FiLogOut size="2em" />
          </li>
        </ul>
      </nav>
      <Dialog open={open} onClose={() => handleClickOpen(false)}>
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
          <Button onClick={() => handleClickOpen(false)}>Cancel</Button>
          <Button onClick={onClickPostVideo}>Post</Button>
        </DialogActions>
      </Dialog>
    </footer>
  );
};
