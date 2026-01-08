import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../apis/auth";

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
            await postLogin({ nickname: nickname.trim() });
            //백엔드에서 세션이나 쿠키로 유저 데이터 관리하면 필요없음
            // localStorage.setItem("nickname", response.nickname);
            // localStorage.setItem("userId", response.userId.toString());
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
            <Landing>
                <LandingTitle>
                    <TitleText>
                        Bet:Gether
                    </TitleText>
                    <CatchPhraseText>
                        의지는 돈에서 나온다
                    </CatchPhraseText>
                </LandingTitle>
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
                    <StartButton>
                        {isLoading ? "로그인 중.." : "시작하기"}
                    </StartButton>
                </StartForm>
            </Landing>
        </PageWrapper>
    );
};

const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Landing = styled.div`
    width: 440px;
    height: 100dvh;

    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 180px;
`;

const LandingTitle = styled.div`
    display: flex;
    width: 263px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
`;

const TitleText = styled.span`
    color: #6155F5;
    text-align: center;
    font-family: Pretendard;
    font-size: 50px;
    font-weight: 700;
    letter-spacing: -1.5px;
`;

const CatchPhraseText = styled.span`
    color: #6155F5;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.04px;
`;

const StartForm = styled.form`
    display: flex;
    width: 365px;
    height: 140px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
`;

const NicknameInput = styled.input`
    display: flex;
    height: 50px;
    padding: 10px 22px;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
    align-self: stretch;

    border-radius: 12px;
    border: 1px solid #D9D9D9;
    background: #FFF;

    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 400;

    &::placeholder {
        color: #B0B0B0;
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

    color: #EF4444;
    font-family: Pretendard;
    font-size: 14px;
`;

const StartButton = styled.button`
    margin-top: 10px;
    display: flex;
    height: 70px;
    padding: 17px 94px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border: none;
    border-radius: 12px;
    background: #6155F5;

    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;

    &:disabled {
        background: #D1D5DB;
    }
`;


export default LandingPage;