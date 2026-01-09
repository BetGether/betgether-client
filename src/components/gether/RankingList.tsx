import styled from "styled-components";
import type{ RankingResponse } from "../../apis/ranking";
import RankingCard from "./RankingCard";

interface RankingListProps {
    ranking: RankingResponse | null;
}

const RankingList = ({ ranking }: RankingListProps) => {
    if (!ranking) {
        return <LoadingState>로딩 중...</LoadingState>;
    }

    return (
        <Container>
            <MyRankCard>
                <SectionTitle>내 순위</SectionTitle>
                    <RankingCard key={ranking.myRanking.rank} ranker={ranking.myRanking}
                    isMyRank={true}/>
            </MyRankCard>

            <AllRankCard>
                <SectionTitle>전체 순위</SectionTitle>
                
                <RankList>
                {ranking.allRanking.map((ranker) => (
                    <RankingCard key={ranker.rank} ranker={ranker} 
                    isTop3={ranker.rank <=3 } isMyRank={ranker.rank === ranking.myRanking.rank}/>
                ))}
                </RankList>
            </AllRankCard>
        </Container>
    );
};

const Container = styled.div`
    width: 408px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #9ca3af;
`;

const MyRankCard = styled.div`
    display: flex;
    flex-direction: column;
`;

const SectionTitle = styled.span`
    display: flex;
    width: 100%
    height: 40px;
    padding: 10px 16px;
    align-items: center;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.034px;
`;

const AllRankCard = styled.div`
    display: flex;
    flex-direction: column;
`;

const RankList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export default RankingList;