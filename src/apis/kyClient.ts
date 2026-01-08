import ky from "ky";

export const client = ky.create({
  prefixUrl: "/api",
  hooks: {
    beforeRequest: [
      (request) => {
        console.log(request);
        /*
         필요 시 사용, Auth Token을 사용하지 않기 때문에 필요 X. 
         API 요청 전에 항상 해야하는 작업을 기입
         */
        //   const token = localStorage.getItem("token");
        //   if (token) {
        //     request.headers.set("Authorization", `Bearer ${token}`);
        //   }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 500) {
          // 서버 에러 등 에러를 잡을 때 사용
        }
      },
    ],
  },
});
