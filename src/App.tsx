import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  setJWT,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "./utilities/axios";
import "./App.css";
import Home from "./components/Home/Home";
import ProtectedRoute from "./utilities/ProtectedRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoDetails from "./components/Videos/VideoDetails";
import CreatorProfile from "./components/Profile/CreatorProfile";
import Profile from "./components/Profile/Profile";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
export interface LogoutProp {
  setLogout?: () => void;
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState({
    isLogged: false,
    loading: false,
    accessToken: getLocalStorage("accessToken") || "",
    refreshToken: getLocalStorage("refreshToken") || "",
  });

  const setLogin = (tokens: Tokens) => {
    if (!tokens.accessToken) {
      toast.error("Error completing the request!");
      return;
    }

    setAuthState({
      ...authState,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isLogged: true,
    });
    setLocalStorage("accessToken", tokens.accessToken);
    setLocalStorage("refreshToken", tokens.refreshToken);
    setJWT(authState.accessToken);
  };

  const setLogout = () => {
    setAuthState({
      ...authState,
      accessToken: "",
      refreshToken: "",
      isLogged: false,
    });
    removeLocalStorage("accessToken");
    removeLocalStorage("refreshToken");
    setJWT("");
  };

  const setAuthLoggedIn = () => {
    setAuthState({
      ...authState,
      isLogged: authState.accessToken !== "" ? true : false,
    });
  };

  useEffect(() => {
    setAuthLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setLogin={setLogin}
                isLogged={authState.accessToken !== ""}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setLogin={setLogin}
                isLogged={authState.accessToken !== ""}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loading={authState.loading}
                isLoggedIn={authState.accessToken !== ""}
              >
                <Home setLogout={setLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-details/:videoId"
            element={
              <ProtectedRoute
                loading={authState.loading}
                isLoggedIn={authState.accessToken !== ""}
              >
                <VideoDetails setLogout={setLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creator-profile/:userId"
            element={
              <ProtectedRoute
                loading={authState.loading}
                isLoggedIn={authState.accessToken !== ""}
              >
                <CreatorProfile setLogout={setLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loading={authState.loading}
                isLoggedIn={authState.accessToken !== ""}
              >
                <Profile setLogout={setLogout} />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer autoClose={2000} position="top-right" />
      </Router>
    </div>
  );
};

export default App;
