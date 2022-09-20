/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Chip, Container, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, setNewTokens } from "../../services/users.services";
import { CreatorProfileProp } from "../../types/returnTypes";
import { Page } from "../Page/Page";
import VideoCardForCreatorProfile from "../Videos/VideoCardForCreatorProfile";
import "./profile.css";

const CreatorProfile: React.FC = () => {
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
        .catch((error) => {
          toast.success("Refreshing token. Please reload page.");
          setNewTokens();
        });
      setUserData(userDetails);
    }
  };
  useEffect(() => {
    GetUserData();
  }, []);
  return (
    <Page showFooter={true}>
      {userData ? (
        <Container
          maxWidth="lg"
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
          }}
        >
          <Divider className="divider" sx={{ marginTop: 1, width: "100%" }}>
            <Chip sx={{ color: "#fff" }} label="Information" />
          </Divider>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid item>
              <h1 className="display-flex">{creatorFullName}</h1>
            </Grid>
          </Grid>
          <Grid item>
            <Avatar alt={creatorFullName} src={userData.user.photoUrl} />
          </Grid>
          <Grid item>
            <h4>{followersCount} Followers</h4>
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
