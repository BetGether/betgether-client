// src/components/ranking/RankingCard.tsx
import styled from "styled-components";
import type { Ranker } from "../../apis/ranking";
import Point from "../../assets/Icon/point.svg";

interface RankingCardProps {
  ranker: Ranker;
  isTop3?:boolean;
  isMyRank?:boolean;
}

const RankingCard = ({ ranker, isTop3=false, isMyRank=false }: RankingCardProps) => {
    return (
        <Card $isTop3={isTop3} $isMyRank={isMyRank}>
            <RankerInfo>
                <RankNumber>{ranker.rank}</RankNumber>
                <Nickname>{ranker.nickname}</Nickname>
            </RankerInfo>
            <PointInfo>
                <PointAmount>
                    {ranker.point.toLocaleString()}
                </PointAmount>
                <img src={Point} alt="point"/>
            </PointInfo>
        
        </Card>
    );
};

const Card = styled.div<{$isTop3: boolean; $isMyRank: boolean}>`
    display: flex;
    width: 100%;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;

    background: ${props => props.$isTop3 ? 'linear-gradient(0deg, #F2F0FF 0%, #F2F0FF 100%), #FFF' : 'linear-gradient(0deg, #F8F8F8 0%, #F8F8F8 100%), #FFF'};
    border: ${props => props.$isMyRank ? '1px solid #E1E1E1;' : 'none'};

    &:not(:last-child) {
        border-bottom: 1px solid #F3F4F6;
    }
`;

const RankerInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const RankNumber = styled.span`
    display: flex;
    width: 40px;
    height: 48px;
    padding: 10px;
    justify-content: center;
    align-items: center;

    color: #000;
    text-align: center;

    font-family: var(--Static-Title-Large-Font, Roboto);
    font-size: var(--Static-Title-Large-Size, 22px);
    font-weight: 500;
    line-height: var(--Static-Title-Large-Line-Height, 28px);
    letter-spacing: var(--Static-Title-Large-Tracking, 0);
`;

const Nickname = styled.span`
    height: 44px;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
`;

const PointInfo = styled.span`
    display: flex;
    align-items: center;
`;

const PointAmount = styled.span`
    height: 48px;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;

    color: #000;
    text-align: center;

    font-family: var(--Static-Title-Large-Font, Roboto);
    font-size: var(--Static-Title-Large-Size, 22px);
    font-weight: 500;
    line-height: var(--Static-Title-Large-Line-Height, 28px);
    letter-spacing: var(--Static-Title-Large-Tracking, 0);
`;

export default RankingCard;