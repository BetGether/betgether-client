import BetGetherHeader from "@/components/BetGetherHeader";
import {
  GetherCreateIcon,
  GetherEditIcon,
  GetherGoBackIcon,
} from "@/components/BetGetherIcons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GetherSettingPage = () => {
  const navigator = useNavigate();
  const onBackClick = () => {
    navigator(-1);
  };
  const onVerifyClick = () => {
    //TODO
  };
  const onEditClick = () => {
    //TODO
  };
  return (
    <Container>
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
