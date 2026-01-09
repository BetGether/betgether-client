import ky, { type NormalizedOptions } from "ky";
import { getToken, removeToken } from "../utils/token";

export const client = ky.create({
  prefixUrl: `${import.meta.env.VITE_API_URL}/api`,
  hooks: {
    beforeRequest: [
      (request) => {
        console.log(request);
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (
        _request: Request,
        _options: NormalizedOptions,
        response: Response
      ) => {
        if (response.status === 401) {
          removeToken();
          const currentPath = window.location.pathname + window.location.search;
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
        if (!response.ok) {
          window.location.href = "/error";
        }
        return response;
      },
    ],
  },
});
