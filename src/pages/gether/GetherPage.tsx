import BetGetherHeader from "@/components/BetGetherHeader";
import styled from "styled-components";
import {
  GetherDeleteIcon,
  GetherGoBackIcon,
  GetherMemberIcon,
  GetherSettingIcon,
  GetherShareIcon,
} from "@/components/BetGetherIcons";
import { useEffect, useRef, useState } from "react";
import { getMessage, type Message, type MessageSendRequest } from "@/apis/chat";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble, { MyChatBubble } from "@/components/gether/ChatBubble";
import SockJS from "sockjs-client";
import { Client, type IMessage } from "@stomp/stompjs";
import BetGetherModal from "@/components/BetGetherModal";
import AddPointImg from "@/assets/gether/getpoint.png";
import BetGetherBtn from "@/components/BetGetherBtn";

const GetherPage = () => {
  //TODO : Gether 참여자가 아니면 다른 페이지 보여주기
  const { getherId } = useParams<{ getherId: string }>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [chatData, setChatData] = useState<Message[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const client = useRef<Client | null>(null);

  const navigator = useNavigate();

  const handleSendMessage = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      //Message 보내기
      sendMessageHandler();
    }
  };

  const onShareClick = () => {
    //TODO : 공유 클립보드
  };
  const onSettingClick = () => {
    //TODO : 설정으로 이동
    navigator(`/gether/${getherId}/setting`);
  };
  const onResultClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    connect();
    return () => disconnect(); // 언마운트 시 연결 해제
  }, [getherId]);

  const connect = () => {
    client.current = new Client({
      // SockJS를 사용하기 위한 설정
      webSocketFactory: () => new SockJS(`${import.meta.env.VITE_API_URL}/ws`),
      connectHeaders: {
        userId: localStorage.getItem("userId") ?? "1",
      },
      // 자동 재연결 지연 시간
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 연결 성공 시 (onConnected와 동일)
      onConnect: () => {
        setIsConnected(true);
        console.log("STOMP Connected");

        // 3. 구독 설정 (Subscription)
        client.current?.subscribe(
          `/sub/chat/room/${getherId}`,
          (message: IMessage) => {
            if (message.body) {
              const newMessage: Message = JSON.parse(message.body);
              setChatData((prev) => [...prev, newMessage]);
            }
          }
        );
      },

      // 에러 발생 시 (onError와 동일)
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        setIsConnected(false);
      },

      onDisconnect: () => {
        setIsConnected(false);
        console.log("STOMP Disconnected");
      },
    });

    // 4. 클라이언트 활성화
    client.current.activate();
  };

  const disconnect = () => {
    console.log("STOMP DISCONNECTED");
    client.current?.deactivate();
  };

  // 5. 메시지 전송 (sendMessage와 동일)
  const sendMessageHandler = () => {
    if (!isConnected) alert("서버가 연결되지 않았습니다");
    if (!inputText.trim()) return;

    if (client.current && client.current.connected) {
      const chatMessage: MessageSendRequest = {
        content: inputText,
        type: "TALK",
        userId: 1, // 실제 유저 ID (전역 상태에서 가져오기)
        getherId: Number(getherId),
      };

      client.current.publish({
        destination: "/pub/chat/message/1",
        body: JSON.stringify(chatMessage),
      });

      setInputText(""); // 입력창 초기화
    } else {
      alert("서버와 연결되어 있지 않습니다.");
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await getMessage(Number(getherId));
        setChatData(data.items);
      } catch (err) {
        console.error("상세 정보 로드 실패:", err);
      }
    })();
  }, []);

  return (
    <GetherChatContainer>
      <BetGetherModal isOpen={isModalOpen} onClose={closeModal}>
        <PointImg src={AddPointImg} />
        <PointAmountDiv>
          {"하드코딩"}, {"하드코딩"} P 획득!
        </PointAmountDiv>
        <PointBalanceDiv>총 베팅 포인트 {"하드코딩"} P</PointBalanceDiv>
        <PointParticipantDiv>
          <GetherMemberIcon color="#757575" size={16} clickable={false} />
          <div>
            {"하드코딩"} / {"하드코딩"}
          </div>
        </PointParticipantDiv>
        <BetGetherBtn onClick={closeModal}>포인트 획득</BetGetherBtn>
      </BetGetherModal>
      <BetGetherHeader>
        <GetherRowFlexDiv>
          <GetherGoBackIcon color="#757575" />
          {/* TODO : 야매 방식, 실제로는 다른 방식으로 center를 맞춰야 */}
          {/* TODO : user-select none 전체에 걸고, 필요한 건 해제 */}
          <GetherGoBackIcon color="#fff" />
        </GetherRowFlexDiv>
        <GetherTitleDiv>채팅</GetherTitleDiv>
        <GetherRowFlexDiv>
          <GetherShareIcon onClick={onShareClick} color="#757575" />
          <GetherSettingIcon onClick={onSettingClick} color="#757575" />
        </GetherRowFlexDiv>
      </BetGetherHeader>
      <GetherChatContentContainer>
        {chatData.map((value, index) => {
          const isSameAsPrevious =
            index > 0 &&
            chatData[index - 1].senderNickname === value.senderNickname;
          if (value.senderNickname === localStorage.getItem("nickname"))
            return (
              <MyChatBubble
                messageData={value}
                key={value.messageId}
                skipChatterName={isSameAsPrevious}
                openModal={onResultClick}
              />
            );
          else
            return (
              <ChatBubble
                messageData={value}
                key={value.messageId}
                skipChatterName={isSameAsPrevious}
                openModal={onResultClick}
              />
            );
        })}
      </GetherChatContentContainer>
      <GetherChatInputContainer>
        <GetherChatInput
          placeholder="메세지 입력"
          onKeyDown={handleSendMessage}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></GetherChatInput>
        <GetherDeleteIcon />
      </GetherChatInputContainer>
    </GetherChatContainer>
  );
};

const GetherRowFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const GetherTitleDiv = styled.div`
  overflow: hidden;
  color: var(--Font-02_black, #111);
  text-align: center;
  text-overflow: ellipsis;

  /* MO/Title/KR/T2_KR_Sb */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px; /* 140% */
  letter-spacing: -0.5px;
`;
const GetherChatContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const GetherChatContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 16px 0 16px;
  gap: 10px;
  flex: 1;
  overflow-y: auto;
`;
const GetherChatInputContainer = styled.div`
  height: 52px;
  margin: 10px 16px 32px 16px;
  display: flex;
  flex-direction: row;
  padding: 7px 15px;
  background: #f8f8f8;
  border-radius: 12px;
  align-items: center;
`;
const GetherChatInput = styled.input`
  padding: 10px;
  width: 100%;
  outline: none;
  border: none;
  background: none;
  &::placeholder {
    color: #adadad;
  }
`;

const PointImg = styled.img``;
const PointAmountDiv = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.6px;
`;
const PointBalanceDiv = styled.div`
  color: var(--Font-04_Gray, #767676);
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 27px */
  letter-spacing: -0.45px;
  margin-bottom: 16px;
`;
const PointParticipantDiv = styled.div`
  color: #757575;
  text-align: center;
  font-family: var(--Static-Body-Small-Font, Roboto);
  font-size: 15.75px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px; /* 133.333% */
  letter-spacing: -0.2px;
  margin-bottom: 21px;

  display: flex;
  align-items: center;
  gap: 4px;
`;
export default GetherPage;
