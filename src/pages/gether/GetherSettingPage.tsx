import BetGetherHeader from "@/components/BetGetherHeader";
import {
  GetherCreateIcon,
  GetherEditIcon,
  GetherGoBackIcon,
} from "@/components/BetGetherIcons";
import BetGetherModal from "@/components/BetGetherModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";
import { verifyStart } from "@/apis/verify";
import BetGetherBtn from "@/components/BetGetherBtn";

const GetherSettingPage = () => {
  const { getherId } = useParams<{ getherId: string }>();

  const navigator = useNavigate();
  const INITIAL_TIME = 10;
  const [timeLeft, setTimeLeft] = useState<number>(INITIAL_TIME);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (isModalOpen && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // 시간 만료 시 처리 (필요하다면)
      console.log("인증 시간이 만료되었습니다.");
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isModalOpen, timeLeft]);

  useEffect(() => {
    // 모달이 열려 있다가 false로 변하는 순간을 포착
    if (!isModalOpen) {
      setTimeLeft(INITIAL_TIME);
    }
  }, [isModalOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };
  const onBackClick = () => {
    navigator(-1);
  };
  const onVerifyClick = () => {
    (async () => {
      try {
        const result = await verifyStart(Number(getherId));
        setShareUrl(
          window.location.origin +
            "/verify/" +
            (result.verifyToken ?? "") +
            "?getherId=" +
            getherId
        );
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsModalOpen(true);
      }
    })();
  };
  const onEditClick = () => {
    //TODO
  };
  const onModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      <BetGetherModal isOpen={isModalOpen} onClose={onModalClose}>
        <QRCodeSVG
          value={shareUrl}
          size={256} // 크기 (기본값 128)
          bgColor="#ffffff" // 배경색
          fgColor="black" // QR 코드 색상 (프로젝트 메인 컬러 사용 가능)
          level="H" // 오류 복구 수준 (L, M, Q, H)
        />
        <TimerText isUrgent={timeLeft <= 30}>
          {timeLeft > 0 ? formatTime(timeLeft) : "만료됨"}
        </TimerText>
        <BetGetherBtn onClick={onModalClose}>인증 종료</BetGetherBtn>
      </BetGetherModal>
      <BetGetherHeader>
        <div onClick={onBackClick}>
          <GetherGoBackIcon color="black" />
        </div>
        <SettingTitle>설정</SettingTitle>
        <GetherGoBackIcon color="fff" />
      </BetGetherHeader>
      <SettingRow onClick={onVerifyClick}>
        <GetherCreateIcon />
        <div>게더 인증 생성</div>
      </SettingRow>
      <SettingRow onClick={onEditClick}>
        <GetherEditIcon />
        <div>게더 편집</div>
      </SettingRow>
    </Container>
  );
};
const TimerText = styled.div<{ isUrgent: boolean }>`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
  color: ${(props) => (props.isUrgent ? "#FF4D4D" : "black")};
  transition: color 0.3s ease;
  margin-bottom: 10px;
`;
const SettingRow = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  align-items: center;
  gap: 14px;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 52px; /* 325% */
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;

  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard */
`;
const SettingTitle = styled.div`
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

export default GetherSettingPage;
