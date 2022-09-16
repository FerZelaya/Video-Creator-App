import { routes } from "../routes/routes";
import { naxios } from "../utilities/axios";

export interface LoginProps {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginProps) => {
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
