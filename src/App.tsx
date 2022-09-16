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

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState({
    isLogged: false,
    loading: false,
    accessToken: getLocalStorage("accessToken") || "",
    refreshToken: getLocalStorage("refreshToken") || "",
  });

  const setLogin = (tokens: Tokens) => {
    setAuthState({
      ...authState,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      isLogged: true,
    });
    setLocalStorage("accessToken", tokens.accessToken);
    setLocalStorage("refershToken", tokens.refreshToken);
    setJWT(authState.accessToken);
  };

  const setAuthLoggedIn = () => {
    if (authState.accessToken !== "") {
      setAuthState({ ...authState, isLogged: true });
    }
    console.log(authState);
  };

  useEffect(() => {
    setAuthLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login setLogin={setLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loading={authState.loading}
                isLoggedIn={authState.isLogged}
              >
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
