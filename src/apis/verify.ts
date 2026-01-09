import { client } from "./kyClient";

export interface VerifyToken {
  verifyToken: string;
}

export interface VerifyStartResponse extends VerifyToken {
  expiredAt: string;
}
export interface VerifyScanRequest {
  verifyToken: string;
}
export interface VerifyScanResponse {
  message: string;
  earnedPoint: number;
  totalPoint: number;
}

export const verifyStart = async (
  getherId: number
): Promise<VerifyStartResponse> => {
  return await client
    .post(`gethers/${getherId}/verify/start`)
    .json<VerifyStartResponse>();
};

export const verifyScan = async (
  getherId: number,
  verifyToken: string
): Promise<VerifyScanResponse> => {
  return await client
    .post(`gethers/${getherId}/verify/scan`, {
      json: { verifyToken }, // 이 부분이 Request Body입니다.
    })
    .json<VerifyScanResponse>();
};
