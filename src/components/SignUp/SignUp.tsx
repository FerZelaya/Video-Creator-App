import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import "../Login/login.css";
import { signUp, UserSignUpProps } from "../../services/users.services";
import { Tokens } from "../../App";
import { useNavigate } from "react-router-dom";
import { FailedHTTPResponse } from "../../types/returnTypes";

interface SignUpFCProps {
  setLogin: (tokens: Tokens) => void;
  isLogged: boolean;
}

const SignUp: React.FC<SignUpFCProps> = ({ setLogin, isLogged }) => {
  const [signUpInfo, setsignUpInfo] = useState<UserSignUpProps>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
  });
  const Navigate = useNavigate();

  const handleChange = (event: any) => {
    setsignUpInfo({ ...signUpInfo, [event.target.name]: event.target.value });
  };

  const onClickSignUp = async (e: any) => {
    e.preventDefault();
    const keys: Tokens = await signUp(signUpInfo);
    setLogin(keys);
    Navigate("/");
  };

  useEffect(() => {
    if (isLogged) {
      Navigate("/");
    }
  }, [Navigate, isLogged]);

  return (
    <Container maxWidth="md">
      <Container component="main" maxWidth="md">
        <Grid container justifyContent={"center"}>
          <div className="paper">
            <Typography variant="h4">Login</Typography>

            <form className="loginForm">
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First name"
                  name="firstName"
                  type="text"
                  color="primary"
                  focused
                  value={signUpInfo.firstName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  color="primary"
                  focused
                  value={signUpInfo.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  color="primary"
                  focused
                  value={signUpInfo.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  color="primary"
                  focused
                  value={signUpInfo.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="photoUrl"
                  label="Photo URL"
                  name="photoUrl"
                  type="text"
                  color="primary"
                  focused
                  value={signUpInfo.photoUrl}
                  onChange={handleChange}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onClickSignUp}
                disabled={
                  signUpInfo.email === "" ||
                  signUpInfo.password === "" ||
                  signUpInfo.firstName === "" ||
                  signUpInfo.lastName === "" ||
                  signUpInfo.photoUrl === ""
                }
              >
                Sign Up
              </Button>

              <Grid container justifyContent={"center"}>
                <Grid item>
                  <Typography marginTop={2} variant="h6">
                    <Link className="links" href="/login">
                      Log In Instead
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Container>
    </Container>
  );
};

export default SignUp;
