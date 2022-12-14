import { Tokens } from "../App";
import { routes } from "../routes/routes";
import { naxios, paxios, setJWT, setLocalStorage } from "../utilities/axios";

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

export const getUserById = async (userId: number) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;
  return await paxios.get(routes.CreatorProfile(userId), {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const loggedUserProfile = async () => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;
  return await paxios.get(routes.LoggedUserProfile, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const followCreator = async (creatorId: number) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.FollowCreator(creatorId), {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const unFollowCreator = async (creatorId: number) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.UnFollowCreator(creatorId), {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const logoutUser = async () => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.LogOut, {
    headers: {
      Authorization: accessToken,
    },
  });
};

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
  const newTokens = await refreshTokensForUser();
  setLocalStorage("accessToken", newTokens.accessToken);
  setLocalStorage("refreshToken", newTokens.refreshToken);
  setJWT(newTokens.accessToken);
};
