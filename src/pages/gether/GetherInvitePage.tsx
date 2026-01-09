import { joinGetherByCode } from "@/apis/gethers";
import BetGetherSpinner from "@/components/BetGetherSpinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const GetherInvitePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { inviteCode } = useParams<{ inviteCode: string }>();
  // console.log(inviteCode);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await joinGetherByCode({
          inviteCode: inviteCode ?? "",
        });
        // console.log(result);
        setIsLoading(false);
        navigate(`/gether/${result.getherId}`);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    })();
  }, []);
  return (
    <Container>
      {isLoading ? (
        <>
          <BetGetherSpinner />
          <InviteText>초대 받는 중</InviteText>
        </>
      ) : (
        <></>
      )}
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
