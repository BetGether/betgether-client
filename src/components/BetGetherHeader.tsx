import styled from "styled-components";

type BetGetherHeaderPropsType = {
  children?: React.ReactNode;
};
const BetGetherHeader = ({ children }: BetGetherHeaderPropsType) => {
  return <GetherHeader>{children}</GetherHeader>;
};

const GetherHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 56px 16px 0 16px;
  height: 56px;
`;

export default BetGetherHeader;
