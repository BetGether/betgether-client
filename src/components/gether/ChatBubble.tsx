import type { Message } from "@/apis/chat";
import styled from "styled-components";
import BetGetherBtn from "../BetGetherBtn";

type ChatBubblePropsType = {
  messageData: Message;
  skipChatterName?: boolean;

  openModal: () => void;
};

type ChatBubbleDivProps = {
  $isVerify: boolean;
};

const formatChatTime = (isoString: string) => {
  const date = new Date(isoString);
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};

const ChatBubble = ({
  openModal,
  messageData,
  skipChatterName = false,
}: ChatBubblePropsType) => {
  return (
    <ChatBubbleContainer>
      {/* 이전이랑 똑같은 화자가 말하고 있으면 ChatterName 스킵 */}
      {skipChatterName ? (
        <></>
      ) : (
        <ChatterName>{messageData.senderNickname}</ChatterName>
      )}
      <ChatBubbleRowDiv>
        {/* 게더 인증인지 단순 채팅인지 */}
        {messageData.type === "VERIFY_START" ? (
          <ChatBubbleDiv $isVerify={true}>
            인증 끝!
            <br />
            결과를 확인해보세요
            <BetGetherBtn onClick={openModal}>결과 확인</BetGetherBtn>
          </ChatBubbleDiv>
        ) : (
          <ChatBubbleDiv $isVerify={false}>{messageData.content}</ChatBubbleDiv>
        )}
        <ChatBubbleDate>{formatChatTime(messageData.createdAt)}</ChatBubbleDate>
      </ChatBubbleRowDiv>
    </ChatBubbleContainer>
  );
};

export const MyChatBubble = ({
  messageData,
  openModal,
}: ChatBubblePropsType) => {
  return (
    <MyChatBubbleContainer>
      <ChatBubbleRowDiv>
        {/* 게더 인증인지 단순 채팅인지 */}
        <ChatBubbleDate>{formatChatTime(messageData.createdAt)}</ChatBubbleDate>
        {messageData.type === "VERIFY_START" ? (
          <MyChatBubbleDiv $isVerify={true}>
            인증 끝!
            <br />
            결과를 확인해보세요
            <BetGetherBtn onClick={openModal}>결과 확인</BetGetherBtn>
          </MyChatBubbleDiv>
        ) : (
          <MyChatBubbleDiv $isVerify={false}>
            {messageData.content}
          </MyChatBubbleDiv>
        )}
      </ChatBubbleRowDiv>
    </MyChatBubbleContainer>
  );
};
const ChatBubbleRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const ChatBubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
`;

const MyChatBubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 0 0 0 auto;
`;
const ChatterName = styled.div`
  margin: 0 0 10px 0;
`;
const ChatBubbleDiv = styled.div<ChatBubbleDivProps>`
  display: flex;
  padding: 17px 14px 15px 14px;
  flex-direction: column;
  justify-content: ${(props) => (props.$isVerify ? "center" : "flex-end")};
  align-items: center;
  gap: 10px;

  border-radius: 15px;
  background: #f8f8f8;

  color: #000;

  /* M3/body/medium */
  font-family: var(--Static-Body-Medium-Font, Roboto);
  font-size: var(--Static-Body-Medium-Size, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Static-Body-Medium-Line-Height, 20px); /* 142.857% */
  letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;

const MyChatBubbleDiv = styled.div<ChatBubbleDivProps>`
  display: flex;
  padding: 17px 14px 15px 14px;
  flex-direction: column;
  justify-content: ${(props) => (props.$isVerify ? "center" : "flex-end")};
  align-items: center;
  gap: 10px;

  border-radius: 15px;
  background: #f2f0ff;

  color: #000;

  /* M3/body/medium */
  font-family: var(--Static-Body-Medium-Font, Roboto);
  font-size: var(--Static-Body-Medium-Size, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Static-Body-Medium-Line-Height, 20px); /* 142.857% */
  letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;
const ChatBubbleDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

  color: #757575;

  /* M3/body/small */
  font-family: var(--Static-Body-Small-Font, Roboto);
  font-size: var(--Static-Body-Small-Size, 12px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Static-Body-Small-Line-Height, 16px); /* 133.333% */
  letter-spacing: var(--Static-Body-Small-Tracking, 0.4px);
`;
export default ChatBubble;
