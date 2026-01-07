import { client } from "./kyClient";

// 요청 데이터 타입
export interface LoginRequest {
  nickname: string;
}

// 응답 데이터 타입
export interface LoginResponse {
  userId: number;
  nickname: string;
  accessToken: string;
}

export const postLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  return await client.post("auth/login", { json: data }).json<LoginResponse>();
};
