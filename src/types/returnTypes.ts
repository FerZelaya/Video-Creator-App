export interface FailedHTTPResponse {
  message: string;
  statusCode: number;
}

export interface Video {
  title: string;
  published: boolean;
  videoUrl: string;
  User: User;
  id: number;
  created: string;
  updated: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
}

export interface FullUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
  likedVideos: Video[];
  followers: string[];
}

export interface CreatorProfileProp {
  user: FullUser;
  videos: Video[];
}
