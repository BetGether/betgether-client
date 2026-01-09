import styled from "styled-components";

type BetGetherBtnPropsType = {
  isEnabled?: boolean;
  children: React.ReactNode;
};

type ButtonProps = {
  $isEnabled?: boolean;
};

const BetGetherBtn = ({
  isEnabled = true,
  children,
}: BetGetherBtnPropsType) => {
  return <GetherBtn $isEnabled={isEnabled}>{children}</GetherBtn>;
};
const GetherBtn = styled.button<ButtonProps>`
  display: flex;
  height: 60px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 12px;
  background: ${(props) => (props.$isEnabled ? "#6155F5" : "#B0B0B0")};

  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default BetGetherBtn;
