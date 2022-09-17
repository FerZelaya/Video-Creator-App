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
}
