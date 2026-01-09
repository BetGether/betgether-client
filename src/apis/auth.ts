import { client } from "./kyClient";
import { saveToken } from "../utils/token";

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
  const response = await client.post("auth/login", { json: data }).json<LoginResponse>();
  saveToken(response.accessToken);
  return response;
};
