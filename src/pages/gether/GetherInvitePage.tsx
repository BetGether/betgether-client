import BetGetherSpinner from "@/components/BetGetherSpinner";
import styled from "styled-components";

const GetherInvitePage = () => {
  return (
    <Container>
      <BetGetherSpinner />
      <InviteText>초대 받는 중</InviteText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 50px;
  height: 100vh;
`;

const InviteText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.6px;

  margin-top: 20px;
`;
export default GetherInvitePage;
