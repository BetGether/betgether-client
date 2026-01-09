import type { ComponentProps } from "react";
import styled from "styled-components";

interface BetGetherBtnPropsType extends ComponentProps<"button"> {
  isEnabled?: boolean;
  children: React.ReactNode;
}

type ButtonProps = {
  $isEnabled?: boolean;
};

const BetGetherBtn = ({
  isEnabled = true,
  children,
  ...rest
}: BetGetherBtnPropsType) => {
  return (
    <GetherBtn $isEnabled={isEnabled} {...rest}>
      {children}
    </GetherBtn>
  );
};
const GetherBtn = styled.button<ButtonProps>`
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 12px;
  background: ${(props) => (props.$isEnabled ? "#6155F5" : "#B0B0B0")};

  outline: none;
  border: none;
  stroke: none;

  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export default BetGetherBtn;
