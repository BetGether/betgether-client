import { client } from "./kyClient";

export type MessageType = "TALK" | "VERIFY_START";

export interface MessageRequest {
    content: string;
    type: MessageType;
}

export interface Message extends MessageRequest {
    messageId: number;
    senderNickname: string;
    createdAt: string;
}

export interface MessageItems {
    items: Message[];
}

export type MessageParam = Record<string, number | undefined> & {
    cursor?: number;
    size?: number;
}


export const getMessage = async (getherId: number, params: MessageParam): Promise<MessageItems> => {
    return await client.get(`gethers/${getherId}/chats`, {searchParams: params}).json<MessageItems>();
};

export const sendMessage = async (getherId: number, data: MessageRequest): Promise<Message> => {
    return await client.post(`gethers/${getherId}/chats`, {json: data}).json<Message>();
}
