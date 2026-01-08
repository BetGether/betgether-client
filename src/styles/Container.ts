import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 640px;
  min-height: 100vh; // 전체 높이 확보
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 */
  justify-content: flex-start; /* 세로는 위에서부터 시작 */
  padding-top: 50px; /* 상단 여백만 살짝 추가 */
`;

export default Container;
