import { Avatar, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserById, setNewTokens } from "../../services/users.services";
import { User } from "../../types/returnTypes";
import { Page } from "../Page/Page";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoUrl: "",
  });
  const { userId } = useParams();
  const creatorFullName = `${userData?.firstName} ${userData?.lastName}`;
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
          <h1 className="display-flex">
            {creatorFullName}
            <Avatar alt={creatorFullName} src={userData.photoUrl} />
          </h1>
        </Container>
      ) : (
        <h1>No Details</h1>
      )}
    </Page>
  );
};

export default Profile;
