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
export interface VerifyConfirmResponse {
  nickname: string;
  earnedPoint: number;
  totalPoint: number;
  totalGethers: number;
  totalParticipation: number;
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
      json: { verifyToken },
    })
    .json<VerifyScanResponse>();
};
export const verifyConfirm = async (
  getherId: number
): Promise<VerifyConfirmResponse> => {
  return await client
    .get(`gethers/${getherId}/verify/confirm`)
    .json<VerifyConfirmResponse>();
};
