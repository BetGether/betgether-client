import { useState, useEffect } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasCloseButton?: boolean; // 내부 닫기 버튼 존재 여부 (옵션)
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 검은색 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // 다른 요소들보다 위에 위치, 향후 Theme을 사용하여 관리하는게

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;

const ModalContainer = styled.div`
  border-radius: 12px;
  background: #fff;
  width: 400px;
  height: 440px;

  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // 약간의 그림자 추가
  position: relative; // 닫기 버튼 위치를 위해
  overflow-y: auto; // 내용이 넘칠 경우 스크롤

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

const BetGetherModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  hasCloseButton = true,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isBrowser) return null;

  const modalContent = (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer onClick={handleContainerClick}>
        {hasCloseButton && <CloseButton onClick={onClose}>&times;</CloseButton>}
        {children}
      </ModalContainer>
    </Overlay>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default BetGetherModal;
