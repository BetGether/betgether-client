import { useEffect, useState } from "react";
import styled from "styled-components";
import { type GetherDetail, getGetherDetail } from "@/apis/gethers";
import { useParams } from "react-router-dom";
import BetGetherBtn from "@/components/BetGetherBtn";
import BetGetherHeader from "@/components/BetGetherHeader";
import {
  GetherGoBackIcon,
  GetherMemberIcon,
  GetherPointIcon,
  GetherSettingIcon,
} from "@/components/BetGetherIcons";

const GetherJoinPage = () => {
  const { getherId } = useParams<{ getherId: string }>();
  const [gether, setGether] = useState<GetherDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!getherId) return;

    (async () => {
      try {
        setIsLoading(true);
        const data = await getGetherDetail(Number(getherId));
        setGether(data);
      } catch (err) {
        console.error("상세 정보 로드 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getherId]);

  //TODO : 에러핸들링
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!gether) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <BackgroundContainer $thumbnail={gether.imageUrl}>
      <BetGetherHeader>
        <GetherGoBackIcon />
        <GetherSettingIcon />
      </BetGetherHeader>
      <GetherInfoContainer>
        <GetherNameDiv>{gether.title}</GetherNameDiv>
        <GetherDescDiv>{gether.description}</GetherDescDiv>
      </GetherInfoContainer>
      <GetherBetContainer>
        <GetherBetInfoDiv>{"하드코딩"}</GetherBetInfoDiv>
        <GetherBetPointDiv>
          {"100하드코딩"}
          <GetherPointIcon />
        </GetherBetPointDiv>
      </GetherBetContainer>
      <GetherFooter>
        <GetherDate>{"2025.09.09하드코딩"}</GetherDate>
        <GetherMemberCount>
          <GetherMemberIcon />
          {" " + gether.participantCount}
        </GetherMemberCount>
      </GetherFooter>
      <BetGetherBtn isEnabled={true}>참여 하기</BetGetherBtn>
      {/* <GetherJoinBtn>참여 하기</GetherJoinBtn> */}
    </BackgroundContainer>
  );
};
// const GetherDate = styled.div``;
// const GetherMemberCount = styled.div``;
// const GetherMemberIcon = styled(MemberIcon)`
//   width: 24px;
//   height: 24px;
// `;
// const GetherJoinBtn = styled.button``;
interface BackgroundContainerProps {
  $thumbnail: string; // Transient Prop을 위해 앞에 $를 붙임
}

const BackgroundContainer = styled.div<BackgroundContainerProps>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0) 100%),
    url(${(props) => props.$thumbnail});
  background-position: center;
  background-size: cover;

  color: #fff;
`;

const GetherInfoContainer = styled.div`
  margin: auto 0 25px 25px;
`;
const GetherNameDiv = styled.div`
  color: #fff;
  font-family: var(--Static-Headline-Medium-Font, Roboto);
  font-size: var(--Static-Headline-Medium-Size, 28px);
  font-style: normal;
  font-weight: 700;
  line-height: var(--Static-Headline-Medium-Line-Height, 36px); /* 128.571% */
  letter-spacing: var(--Static-Headline-Medium-Tracking, 0);
`;
const GetherDescDiv = styled.div`
  color: #fff;

  /* M3/body/large */
  font-family: var(--Static-Body-Large-Font, Roboto);
  font-size: var(--Static-Body-Large-Size, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Static-Body-Large-Line-Height, 24px); /* 150% */
  letter-spacing: var(--Static-Body-Large-Tracking, 0.5px);
`;
const GetherBetContainer = styled.div`
  display: flex;
  padding: 7px 25px;

  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 8px;
`;
const GetherBetInfoDiv = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  align-items: center;
  flex-grow: 8;
`;
const GetherBetPointDiv = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  align-items: center;
  flex-grow: 1;
`;
const GetherFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 36px 10px 36px;
  margin-top: 17px;
  margin-bottom: 7px;
  align-items: center;
  gap: 10px;
`;
const GetherDate = styled.div`
  color: #fff;

  /* M3/body/medium */
  font-family: var(--Static-Body-Medium-Font, Roboto);
  font-size: var(--Static-Body-Medium-Size, 14px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Static-Body-Medium-Line-Height, 20px); /* 142.857% */
  letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;
const GetherMemberCount = styled.div`
  color: #fff;
  text-align: center;

  /* M3/body/small-emphasized */
  font-family: var(--Static-Body-Small-Font, Roboto);
  font-size: var(--Static-Body-Small-Size, 12px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--Static-Body-Small-Line-Height, 16px); /* 133.333% */
  letter-spacing: var(--Static-Body-Small-Tracking, 0.4px);
`;

export default GetherJoinPage;
