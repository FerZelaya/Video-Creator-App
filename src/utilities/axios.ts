import axios from "axios";

const publicaxios = axios.create();

publicaxios.defaults.headers.common["cache-control"] = "no-cache";
publicaxios.defaults.headers.post["Content-Type"] = "no-cache";
publicaxios.defaults.headers.put["Content-Type"] = "no-cache";
publicaxios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const privateaxios = axios.create();

privateaxios.defaults.headers.common["cache-control"] = "no-cache";
privateaxios.defaults.headers.post["Content-Type"] = "no-cache";
privateaxios.defaults.headers.put["Content-Type"] = "no-cache";

//Set json web token to axios private instance
export const setJWT = (accessToken: any) => {
  privateaxios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
  console.log("jwt set");
};

export const naxios = publicaxios;
export const paxios = privateaxios;

//Auth Interceptor
export const AuthInterceptor = (logouthandler: any) => {
  privateaxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            logouthandler();
            break;
          default:
            console.log(error);
        }
      } else {
        console.log(error);
      }
      return Promise.reject(error);
    },
  );
};

const localStorageAvailable = (() => {
  let s = "s";
  try {
    localStorage.setItem(s, s);
    localStorage.removeItem(s);
    return true;
  } catch (error) {
    return false;
  }
})();

//Set jwt to local storage
export const getLocalStorage = (key: string) => {
  if (localStorageAvailable) {
    return localStorage.getItem(key);
  } else {
    return null;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  if (localStorageAvailable) {
    localStorage.setItem(key, value);
    return true;
  } else {
    return false;
  }
};

export const removeLocalStorage = (key: string) => {
  if (localStorageAvailable) {
    localStorage.removeItem(key);
    return true;
  } else {
    return false;
  }
};
