/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Chip,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LogoutProp } from "../../App";
import { loggedUserProfile, setNewTokens } from "../../services/users.services";
import { CreatorProfileProp } from "../../types/returnTypes";
import { Page } from "../Page/Page";
import TabPanel from "../TabPanel/TabPanel";
import VideoCardForCreatorProfile from "../Videos/VideoCardForCreatorProfile";

const Profile: React.FC<LogoutProp> = ({ setLogout }) => {
  const [tabValue, setTabValue] = useState(0);
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
  const creatorFullName = `${userData?.user.firstName} ${userData?.user.lastName}`;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const GetUserData = async () => {
    const userDetails = await loggedUserProfile()
      .then((response) => response.data)
      .catch((error: Error) => {
        console.log(error.message);
        toast.success("Refreshing token. Please reload page.");
        setNewTokens();
      });
    setUserData(userDetails);
  };
  const followersCount = userData.user.followers
    ? userData.user.followers.length
    : 0;

  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <Page showFooter={true} setLogout={setLogout}>
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

          {/* <Divider className="divider" sx={{ marginTop: 4, width: "100%" }}>
            <Chip sx={{ color: "#fff" }} label="Videos" />
          </Divider> */}
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Videos" />
            <Tab label="Liked Videos" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Grid
              container
              justifyContent={"center"}
              spacing={2}
              sx={{ marginTop: 3 }}
              className="videos-container"
            >
              {userData.videos.length > 0 ? (
                userData.videos.map((video, index) => {
                  return (
                    <VideoCardForCreatorProfile
                      userId={userData.user.id}
                      key={index}
                      video={video}
                    />
                  );
                })
              ) : (
                <div>No videos</div>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Grid
              container
              justifyContent={"center"}
              spacing={2}
              sx={{ marginTop: 3 }}
              className="videos-container"
            >
              {userData.user.likedVideos.length > 0 ? (
                userData.user.likedVideos.map((video, index) => {
                  return (
                    <VideoCardForCreatorProfile
                      userId={userData.user.id}
                      key={index}
                      video={video}
                    />
                  );
                })
              ) : (
                <div>No videos</div>
              )}
            </Grid>
          </TabPanel>
        </Container>
      ) : (
        <h1>No Details</h1>
      )}
    </Page>
  );
};

export default Profile;
