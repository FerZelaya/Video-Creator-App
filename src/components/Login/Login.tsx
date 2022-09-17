import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import "./login.css";
import { login, UserLoginProps } from "../../services/users.services";
import { Tokens } from "../../App";
import { useNavigate } from "react-router-dom";

interface LoginFCProps {
  setLogin: (tokens: Tokens) => void;
  isLogged: boolean;
}

const Login: React.FC<LoginFCProps> = ({ setLogin, isLogged }) => {
  const [loginInfo, setLoginInfo] = useState<UserLoginProps>({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const handleChange = (event: any) => {
    setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
  };

  const onClickLogin = async (e: any) => {
    e.preventDefault();
    const keys: Tokens = await login(loginInfo);
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
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={loginInfo.email}
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
                  value={loginInfo.password}
                  onChange={handleChange}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={onClickLogin}
                disabled={loginInfo.email === "" || loginInfo.password === ""}
              >
                Login
              </Button>

              <Grid container justifyContent={"center"}>
                <Grid item>
                  <Typography marginTop={2} variant="h6">
                    <Link className="links" href="/signup">
                      Create an account!
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

export default Login;
