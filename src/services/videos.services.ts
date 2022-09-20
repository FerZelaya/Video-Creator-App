import { routes } from "../routes/routes";
import { Video } from "../types/returnTypes";
import { paxios } from "../utilities/axios";
import { setNewTokens } from "./users.services";

export interface PostVideoProps {
  title: string;
  videoUrl: string;
  videoId?: number;
}

export const getAllPublishedVideos = async () => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.GetAllPublishedVideos, {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const getVideoDetails = async (videoId: number) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.VideoDetails(videoId), {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const publishOrUnpublishVideo = async (videoId: number) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.PublishOrUnpublishVideo(videoId), {
    headers: {
      Authorization: accessToken,
    },
  });
};

export const postNewVideo = async ({
  title,
  videoUrl,
}: PostVideoProps): Promise<Video> => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  const response = await paxios
    .post(
      routes.PostVideo,
      { title, videoUrl, published: false },
      {
        headers: {
          Authorization: accessToken,
        },
      },
    )
    .then((response) => response);
  console.log(response);

  if (response.status === 401) {
    await setNewTokens();
  }

  return response.data;
};

export const editVideo = async ({
  title,
  videoUrl,
  videoId,
}: PostVideoProps): Promise<Video> => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.put(
    routes.EditVideo(videoId ?? 0),
    { title, videoUrl, published: false },
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );
};

export const likeVideo = async (videoId: number) => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  return await paxios.get(routes.LikeVideo(videoId), {
    headers: {
      Authorization: accessToken,
    },
  });
};
