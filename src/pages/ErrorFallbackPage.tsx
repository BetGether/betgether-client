import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ErrorFallbackPage = () => {
  const navigator = useNavigate();
  const onHomeClick = () => {
    navigator("/members/my");
  };
  return (
    <Container>
      <ErrorTitle>Oops!</ErrorTitle>
      <ErrorDesc1>일시적인 오류입니다</ErrorDesc1>
      <ErrorDesc2>잠시 후에 다시 시도해주세요</ErrorDesc2>
      <GoHomeLink onClick={onHomeClick}>홈으로 돌아가기</GoHomeLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard */
`;
const ErrorTitle = styled.div`
  color: #6155f5;
  font-family: PyeongChang;
  font-size: 68.85px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-bottom: 39px;
`;
const ErrorDesc1 = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const ErrorDesc2 = styled.div`
  color: #656565;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 59px;
`;
const GoHomeLink = styled.div`
  color: var(--Colors-gray-400, #767676);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration: underline solid #767676;

  cursor: pointer;
`;
export default ErrorFallbackPage;
