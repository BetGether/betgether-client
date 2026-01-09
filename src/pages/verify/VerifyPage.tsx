import { verifyScan } from "@/apis/verify";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const VerifyPage = () => {
  const { verifyToken } = useParams<{ verifyToken: string }>();
  const [searchParams] = useSearchParams();
  const getherId = searchParams.get("getherId");
  useEffect(() => {
    if (!verifyToken || !getherId) return;

    (async () => {
      try {
        await verifyScan(Number(getherId), verifyToken);
      } catch (err) {
        console.error("상세 정보 로드 실패:", err);
      } finally {
        alert("인증이 완료되었습니다");
      }
    })();
  }, [getherId]);
  return <div></div>;
};

export default VerifyPage;
