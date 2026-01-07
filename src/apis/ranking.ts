import { client } from "./kyClient";

// 공통 데이터 구조 (향후 직접적인 프론트엔드 개발에도 사용!)
export interface Ranker {
  rank: number;
  nickname: string;
  point: number;
}

// 전체 응답 구조
export interface RankingResponse {
  top3: Ranker[];
  allRanking: Ranker[];
  myRanking: Ranker;
}

//나중에 바로 함수로 사용 가능하게!
export const getRanking = async (): Promise<RankingResponse> => {
  return await client.get("rankings").json<RankingResponse>();
};
