import { Tokens } from "../App";
import { routes } from "../routes/routes";
import { FailedHTTPResponse } from "../types/returnTypes";
import { naxios, setJWT, setLocalStorage } from "../utilities/axios";

export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserSignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
}

export const login = async ({
  email,
  password,
}: UserLoginProps): Promise<Tokens> => {
  try {
    const { data } = await naxios.post(routes.LoginRoute, {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async ({
  firstName,
  lastName,
  photoUrl,
  email,
  password,
}: UserSignUpProps): Promise<Tokens> => {
  try {
    const { data } = await naxios.post(routes.SignUpRoute, {
      email: email,
      password: password,
      firstName,
      lastName,
      photoUrl,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const refreshTokensForUser = async () => {
  const refreshToken = `Bearer ${localStorage.getItem("refreshToken")!}`;
  const response = await naxios.get(routes.RefreshToken, {
    headers: {
      Authorization: refreshToken,
    },
  });

  if (response.status !== 200) {
    throw Error(response.data);
  }
  return response.data;
};

export const setNewTokens = async () => {
  console.log("here");

  const newTokens = await refreshTokensForUser();
  setLocalStorage("accessToken", newTokens.accessToken);
  setLocalStorage("refreshToken", newTokens.refreshToken);
  setJWT(newTokens.accessToken);
};
