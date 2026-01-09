import { put } from "@vercel/blob";

/**
 * Vercel Blob에 파일을 업로드하고 URL을 반환하는 유틸리티 함수
 * 정말 위험한 방식 (토큰 보안 문제)  이나, 팀 사정상 프론트엔드에서 이미지를 업로드하기로 하였음.
 * @param file 업로드할 파일 객체
 * @returns 업로드된 파일의 CDN URL
 */
export const uploadImageToBlob = async (file: File): Promise<string> => {
  const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error("VITE_BLOB_READ_WRITE_TOKEN이 설정되지 않았습니다.");
  }

  try {
    const newBlob = await put(file.name, file, {
      access: "public",
      token: token,
    });

    return newBlob.url; // 주소만 리턴
  } catch (error) {
    console.error("Blob 업로드 실패:", error);
    throw error; // 에러를 호출부로 전달
  }
};
