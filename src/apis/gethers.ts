import { client } from "./kyClient";

export type GetherStatus = "CREATED" | "UPDATED" | "JOIN_SUCCESS";
export type MyChallengeStatus = "OPEN" | "CLOSE";

export interface Gether {
    getherId: number;
    title: string;
    imageUrl: string;
    participantCount: number;
}

export interface MyGether extends Gether {
    joinedAt: string;
    challengeStatus: MyChallengeStatus;
}

export interface SearchGether extends Gether {
    description: string;
    createdAt: string;
    challengeTitle?: string;
}

export interface SearchGetherParam {
    keyword?:string;
    [key: string]: string | undefined;
}

export interface GetherRequest {
    title: string;
    description: string;
    imageUrl: string;
    isPublic: boolean;
    challenge: {
        title: string;
        betPoint: number;
    }
}

export interface GetherResponse {
    getherId: number;
    status: GetherStatus;
}

export interface GetherInviteCode {
    inviteCode: string;
}

export interface GetherDetail extends Gether, GetherInviteCode{
    description: string;
    isHost: boolean;
    challengeTitle: string;
    challengeBetBoint: number;
}


export const getMyGether = async (): Promise<MyGether[]> => {
  return await client.get("gethers/my").json<MyGether[]>();
};

export const getSearchingGether = async (params: SearchGetherParam): Promise<SearchGether[]> => {
    return await client.get("gethers", {searchParams: params}).json<SearchGether[]>();
};

export const createGether = async (data: GetherRequest): Promise<GetherResponse> => {
    return await client.post("gethers", {json: data}).json<GetherResponse>();
};

export const editGether = async (getherId: number, data: GetherRequest): Promise<GetherResponse> => {
    return await client.patch(`gethers/${getherId}`, {json: data}).json<GetherResponse>();
}

export const getGetherDetail = async (getherId: number): Promise<GetherDetail> => {
    return await client.get(`gethers/${getherId}`).json<GetherDetail>();
}

export const joinGether = async (getherId: number): Promise<GetherResponse> => {
    return await client.post(`gethers/${getherId}/join`).json<GetherResponse>();
}

export const joinGetherByCode = async (data: GetherInviteCode): Promise<GetherResponse> => {
    return await client.post("gethers/join", {json: data}).json<GetherResponse>();
}
