/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  followCreator,
  getUserById,
  loggedUserProfile,
  setNewTokens,
  unFollowCreator,
} from "../../services/users.services";
import { CreatorProfileProp, FullUser } from "../../types/returnTypes";
import { Page } from "../Page/Page";
import VideoCardForCreatorProfile from "../Videos/VideoCardForCreatorProfile";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import "./profile.css";
import { AxiosError } from "axios";

const CreatorProfile: React.FC = () => {
  const [isAlreadyFollowd, setIsAlreadyFollowd] = useState<boolean>(false);
  const [userData, setUserData] = useState<CreatorProfileProp>({
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      photoUrl: "",
      followers: [],
      likedVideos: [],
    },
    videos: [],
  });
  //   const [loggedUserData, setLoggedUserData] = useState<CreatorProfileProp>({
  //     user: {
  //       id: 0,
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //       photoUrl: "",
  //       followers: [],
  //       likedVideos: [],
  //     },
  //     videos: [],
  //   });

  const { userId } = useParams();

  const followersCount = userData.user.followers
    ? userData.user.followers.length
    : 0;

  const creatorFullName = `${userData?.user.firstName} ${userData?.user.lastName}`;
  const GetUserData = async () => {
    if (!userId) {
      toast.error("Error getting user ID param!");
    } else {
      const userDetails = await getUserById(parseInt(userId))
        .then((response) => response.data)
        .catch((error: AxiosError) => {
          if (error.response?.status === 401) {
            toast.success("Refreshing token. Please reload page.");
            setNewTokens();
          } else {
            toast.error("Error with httprequest");
          }
        });
      setUserData(userDetails);
      GetLoggedUserData(userDetails.user);
    }
  };

  const GetLoggedUserData = async (creator: FullUser) => {
    const loggedUser = await loggedUserProfile()
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          toast.success("Refreshing token. Please reload page.");
          setNewTokens();
        } else {
          toast.error("Error with httprequest");
        }
      });

    if (creator.followers) {
      setIsAlreadyFollowd(
        creator.followers.some((e) => parseInt(e) === loggedUser.user.id),
      );
    }
  };

  const onClickFollowCreator = async (creatorId: number) => {
    const result = await followCreator(creatorId)
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          toast.success("Refreshing token. Please reload page.");
          setNewTokens();
        } else {
          toast.error("Error with follow creator http request");
        }
      });
    if (result === true) {
      toast.success("Creator followed successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      toast.error("Error following creator");
    }
  };

  const onClickUnFollowCreator = async (creatorId: number) => {
    const result = await unFollowCreator(creatorId)
      .then((response) => response.data)
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          toast.success("Refreshing token. Please reload page.");
          setNewTokens();
        } else {
          toast.error("Error with unfollow creator http request");
        }
      });
    if (result === true) {
      toast.success("Creator unfollowed successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      toast.error("Error unfollowing creator");
    }
  };

  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <Page showFooter={true}>
      {userData ? (
        <Container
          maxWidth="xl"
          sx={{
            padding: 1,
            display: "flex",
            backgroundColor: "#484d57",
            height: "80vh",
            width: 2000,
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#fff",
            borderRadius: 5,
            flexDirection: "column",
            boxShadow: "0px 0px 22px 0px rgba(0,0,0,0.61)",
            position: "relative",
          }}
        >
          <Divider className="divider" sx={{ marginTop: 1, width: "100%" }}>
            <Chip sx={{ color: "#fff" }} label="Information" />
          </Divider>
          <Grid
            container
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            spacing={2}
          >
            <Grid item>
              <h1 className="display-flex">{creatorFullName}</h1>
            </Grid>
            <Grid item>
              <Avatar alt={creatorFullName} src={userData.user.photoUrl} />
            </Grid>
            <Grid
              item
              width={200}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <h4>{followersCount} Followers</h4>
              <IconButton
                onClick={() =>
                  isAlreadyFollowd
                    ? onClickUnFollowCreator(userData.user.id)
                    : onClickFollowCreator(userData.user.id)
                }
                color="primary"
              >
                {isAlreadyFollowd ? (
                  <RiUserUnfollowFill />
                ) : (
                  <RiUserFollowFill />
                )}
              </IconButton>
            </Grid>
          </Grid>

          <Divider className="divider" sx={{ marginTop: 4, width: "100%" }}>
            <Chip sx={{ color: "#fff" }} label="Videos" />
          </Divider>
          <Grid
            container
            justifyContent={"center"}
            spacing={2}
            sx={{ marginTop: 3 }}
            className="videos-container"
          >
            {userData.videos.length > 0 ? (
              userData.videos.map((video, index) => {
                return <VideoCardForCreatorProfile key={index} video={video} />;
              })
            ) : (
              <div>No videos</div>
            )}
          </Grid>
        </Container>
      ) : (
        <h1>No Details</h1>
      )}
    </Page>
  );
};

export default CreatorProfile;
