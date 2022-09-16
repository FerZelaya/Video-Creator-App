const BASE_URL = process.env.REACT_APP_API_URL;

export const routes = {
  LoginRoute: `${BASE_URL}users/sign-in`,
  SignUpRoute: `${BASE_URL}users/sign-up"`,
  LogOut: `${BASE_URL}users/logout`,
  RefreshToken: `${BASE_URL}users/refresh`,
  GetUserById: (userId: number) => `${BASE_URL}users/get/email/${userId}`,
  FollowCreator: (creatorId: number) => `${BASE_URL}users/follow/${creatorId}`,
  UnFollowCreator: (creatorId: number) =>
    `${BASE_URL}users/unfollow/${creatorId}`,
};
