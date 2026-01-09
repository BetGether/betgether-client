import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "@/apis/auth";
import BannerImg from "@/assets/Banner.png";
import BackgroundImg from "@/assets/Background.png";
const LandingPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await postLogin({ nickname: nickname.trim() });
      //백엔드에서 세션이나 쿠키로 유저 데이터 관리하면 필요없음
      localStorage.setItem("nickname", response.nickname);
      localStorage.setItem("userId", response.userId.toString());
      navigate("/gethers/my");
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <LandingBannerWrapper>
        <LandingBanner src={BannerImg} />
      </LandingBannerWrapper>
      <StartForm onSubmit={handleSubmit}>
        <NicknameInput
          type="text"
          placeholder="사용자 이름"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isLoading}
          maxLength={20}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StartButton disabled={isLoading}>
          {isLoading ? "로그인 중.." : "시작하기"}
        </StartButton>
      </StartForm>
      <LandingFooter>BET:Gether</LandingFooter>
    </PageWrapper>
  );
};
const LandingFooter = styled.div`
  position: absolute; /* 중앙 정렬 흐름에서 이탈시켜 바닥에 고정 */
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  color: #6155f5;
  text-align: center;
  font-family: Quantico;
  font-size: 25.333px;
  font-weight: 700;
  letter-spacing: -1.013px;
`;
const LandingBannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 60px;
  background: transparent !important;
`;
const LandingBanner = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain; /* 이미지가 잘리지 않고 영역 안에 다 들어오게 함 */
`;
const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  isolation: isolate;
  background: transparent;
  gap: 30px;
  padding-top: 80px;

  /* 배경만 담당하는 레이어 */
  &::before {
    box-shadow: none;
    content: "";
    position: fixed; /* 화면에 고정 */
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-image: url(${BackgroundImg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    /* 콘텐츠 뒤로 보내기 */
    z-index: -1;

    /* (선택 사항) 배경에만 효과를 주고 싶을 때 유용합니다 */
    /* opacity: 0.5; */
    /* filter: blur(5px); */
  }
`;

const StartForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 0px 80px;
`;

const NicknameInput = styled.input`
  display: flex;
  height: 40px;
  padding: 10px 22px;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 12px;
  border: 1px solid #d9d9d9;
  background: #fff;

  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;

  &::placeholder {
    color: #b0b0b0;
    font-size: 16px;
    text-align: center;
  }
`;

const ErrorMessage = styled.span`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #ef4444;
  font-family: Pretendard;
  font-size: 14px;
`;

const StartButton = styled.button`
  margin-top: 10px;
  display: flex;
  height: 60px;
  padding: 17px 94px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border: none;
  border-radius: 12px;
  background: #6155f5;

  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;

  &:disabled {
    background: #d1d5db;
  }
`;

export default LandingPage;
