import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface SpinnerProps {
  size?: string; // 스피너 크기 (기본값: 40px)
  thickness?: string; // 선 두께 (기본값: 4px)
}

const StyledSpinner = styled.div<SpinnerProps>`
  width: ${(props) => props.size || "200px"};
  height: ${(props) => props.size || "200px"};

  /* 배경이 되는 연한 테두리 */
  border: ${(props) => props.thickness || "12px"} solid rgba(97, 85, 245, 0.1);

  /* 실제 돌아가는 강조 색상 부분 (#6155F5) */
  border-top: ${(props) => props.thickness || "12px"} solid #6155f5;

  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
  display: inline-block;
`;

const BetGetherSpinner = ({ size, thickness }: SpinnerProps) => {
  return <StyledSpinner size={size} thickness={thickness} role="status" />;
};

export default BetGetherSpinner;
