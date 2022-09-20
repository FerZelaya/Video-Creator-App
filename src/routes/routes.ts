const BASE_URL = process.env.REACT_APP_API_URL;

export const routes = {
  LoginRoute: `${BASE_URL}/users/sign-in`,
  SignUpRoute: `${BASE_URL}/users/sign-up`,
  LogOut: `${BASE_URL}/users/logout`,
  RefreshToken: `${BASE_URL}/users/refresh`,
  GetUserByEmail: (email: string) => `${BASE_URL}/users/get/email/${email}`,
  GetUserById: (userId: number) => `${BASE_URL}/users/${userId}`,
  FollowCreator: (creatorId: number) => `${BASE_URL}/users/follow/${creatorId}`,
  UnFollowCreator: (creatorId: number) =>
    `${BASE_URL}/users/unfollow/${creatorId}`,
  GetAllPublishedVideos: `${BASE_URL}/videos/`,
  GetAllVideosFromUser: `${BASE_URL}/videos/getAll`,
  PostVideo: `${BASE_URL}/videos/`,
  VideoDetails: (videoId: number) => `${BASE_URL}/videos/details/${videoId}`,
  EditVideo: (videoId: number) => `${BASE_URL}/videos/edit/${videoId}`,
  PublishOrUnpublishVideo: (videoId: number) =>
    `${BASE_URL}/videos/publish/${videoId}`,
  LikeVideo: (videoId: number) => `${BASE_URL}/videos/like/${videoId}`,
  CreatorProfile: (userId: number) =>
    `${BASE_URL}/videos/creatorProfile/${userId}`,
  LoggedUserProfile: `${BASE_URL}/videos/userCreatorProfile`,
};
