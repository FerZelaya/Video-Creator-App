import { routes } from "../routes/routes";
import { Video } from "../types/returnTypes";
import { naxios, paxios } from "../utilities/axios";
import { setNewTokens } from "./users.services";

export interface PostVideoProps {
  title: string;
  videoUrl: string;
}

export const getAllPublishedVideos = async (): Promise<Video[]> => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  const response = await paxios
    .get(routes.GetAllPublishedVideos, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((response) => response);

  if (response.status === 401) {
    await setNewTokens();
    return [];
  }

  return response.data;
};

export const postNewVideo = async ({
  title,
  videoUrl,
}: PostVideoProps): Promise<Video> => {
  const accessToken = `Bearer ${localStorage.getItem("accessToken")!}`;

  const response = await paxios
    .post(
      routes.PostVideo,
      { title, videoUrl, published: true },
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
