import ky from "ky";
import { getToken } from "../utils/token";

export const client = ky.create({
  prefixUrl: `${import.meta.env.VITE_API_URL}/api`,
  hooks: {
    beforeRequest: [
      (request) => {
        console.log(request);
        const token = getToken();
        if (token) {
          request.headers.set("Authorization", `${token}`);
        }
      },
    ],
    // afterResponse: [
    //   async (request, options, response) => {
    //     if (response.status === 500) {
    //       // 서버 에러 등 에러를 잡을 때 사용
    //     }
    //   },
    // ],
  },
});
