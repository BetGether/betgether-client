import { verifyScan } from "@/apis/verify";
import BetGetherBtn from "@/components/BetGetherBtn";
import BetGetherModal from "@/components/BetGetherModal";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const VerifyPage = () => {
  const { verifyToken } = useParams<{ verifyToken: string }>();
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const getherId = searchParams.get("getherId");
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    navigate(`/gether/${getherId}`);
  };

  useEffect(() => {
    if (!verifyToken || !getherId) return;

    (async () => {
      try {
        await verifyScan(Number(getherId), verifyToken);
        openModal();
      } catch (err) {
        console.error("상세 정보 로드 실패:", err);
      }
    })();
  }, [getherId]);
  return (
    <BetGetherModal isOpen={isModalOpen} onClose={closeModal}>
      <ModalImage />
      <ModalTitle>인증이 완료되었습니다</ModalTitle>
      <BetGetherBtn onClick={closeModal}>확인</BetGetherBtn>
    </BetGetherModal>
  );
};

const ModalImage = styled.img``;
const ModalTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 36px */
  letter-spacing: -0.6px;

  margin-bottom: 12px;
`;

export default VerifyPage;
