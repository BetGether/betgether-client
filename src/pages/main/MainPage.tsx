import styled from "styled-components";
import { useState, useEffect } from "react";
import { getMyGether } from "@/apis/gethers";
import { getRanking } from "@/apis/ranking";
import type { MyGether } from "@/apis/gethers";
import type { RankingResponse } from "@/apis/ranking";
import MyGetherList from "@/components/gether/MyGetherList";
import RankingList from "@/components/gether/RankingList";
import SearchWhite from "@/assets/Icon/searchWhite.svg";
import Point from "@/assets/Icon/point.svg";
import { useNavigate } from "react-router-dom";
import BackgroundImg from "@/assets/Image/backgroundImage.png";

type TabType = "gether" | "ranking";

const MainPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<TabType>("gether");
    const [myGethers, setMyGethers] = useState<MyGether[]>([]);
    const [ranking, setRanking] = useState<RankingResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // 랭킹 불러오기 추가
    useEffect(() => {
        const fetchRanking = async () => {
            setIsLoading(true);
            try {
                const data = await getRanking();
                setRanking(data);
            } catch (error) {
                console.error("랭킹 불러오기 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRanking();
    }, []);

    // 나의 게더 불러오기
    useEffect(() => {
        const fetchMyGethers = async () => {
            setIsLoading(true);
            try {
                const data = await getMyGether();
                setMyGethers(data);
            } catch (error) {
                console.error("게더 불러오기 실패:", error);
            } finally {
                setIsLoading(false);
            }
            };
        fetchMyGethers();
    }, []);

    return (
        <Container>
            <BackgroundImage/>
            <Header>
                <Logo>Bet:Gether</Logo>
                <SearchIcon onClick={() => navigate("/gethers/search")}>
                    <img src={SearchWhite} alt="searchIcon"/>
                </SearchIcon>              
            </Header>

            <PointCard>
                <PointLabel>총 포인트</PointLabel>
                <PointInfo>
                    <PointAmount>
                        {ranking?.myRanking.point.toLocaleString() || 0}
                    </PointAmount>
                    <img src={Point} alt="point"/>
                </PointInfo>
            </PointCard>

            <ContentContainer>
                <TabContainer>
                    <Tab 
                        $active={activeTab === "gether"}
                        onClick={() => setActiveTab("gether")}
                    >
                    나의 게더
                    </Tab>
                    <Tab 
                        $active={activeTab === "ranking"}
                        onClick={() => setActiveTab("ranking")}
                    >
                    게더 랭킹
                    </Tab>
                </TabContainer>

                <ContentArea>
                    {isLoading ? (
                    <LoadingState>로딩 중...</LoadingState>
                    ) : activeTab === "gether" ? (
                        <MyGetherList gethers={myGethers}/>
                        ) : (
                            <RankingList ranking={ranking}/>
                        )
                    }
                </ContentArea>
            </ContentContainer>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100dvh;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #201364;
`;

const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: url(${BackgroundImg}) lightgray 50% / cover no-repeat;
    mix-blend-mode: screen;
    filter: blur(3.2px);
    z-index: 1;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    margin-top: 56px;
    margin-bottom: 11px;
    padding: 10px 26px;
    position: relative;
    z-index: 2;
`;

const Logo = styled.span`
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.72px;
`;

const SearchIcon = styled.button`
    background: none;
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    &:hover {cursor: pointer;}
`;

const PointCard = styled.div`
    margin: 0 16px;
    display: flex;
    width: 408px;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;

    border-radius: 15px;
    background: #FFF;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 2;
`;

const PointLabel = styled.span`
    padding: 10px;

    color: #000;
    text-align: center;

    font-family: var(--Static-Body-Large-Font, Roboto);
    font-size: var(--Static-Body-Large-Size, 16px);
    font-style: normal;
    font-weight: 400;
    line-height: var(--Static-Body-Large-Line-Height, 24px);
    letter-spacing: var(--Static-Body-Large-Tracking, 0.5px);
`;

const PointInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 10px;
`;

const PointAmount = styled.span`
    color: #000;
    text-align: center;

    font-family: var(--Static-Title-Large-Font, Roboto);
    font-size: var(--Static-Title-Large-Size, 22px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--Static-Title-Large-Line-Height, 28px); /* 127.273% */
    letter-spacing: var(--Static-Title-Large-Tracking, 0);
`;

const ContentContainer = styled.div`
    margin-top: 18px;
    width: 100%;
    display: flex;
    flex: 1;
    padding-top: 24px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    border-radius: 30px 30px 0 0;
    background: #FFF;
    position: relative;
    z-index: 2;
    min-height: 0;
`;

const TabContainer = styled.div`
    display: flex;
    padding: 7px;
    align-items: center;
    border-radius: 50px;
    background: #F2F0FF;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05) inset;
`;

const Tab = styled.button<{$active: boolean}>`
    display: flex;
    padding: 10px;
    width: 182px;
    height: 54px;
    justify-content: center;
    align-items: center;
    border:none;
    border-radius: 30px;
    background: ${props =>props.$active ? '#FFF' : 'transparent'};
    box-shadow: ${props =>props.$active ? '0 2px 4px 0 rgba(0, 0, 0, 0.10);' : 'none'};
    transition: all 0.2s;

    color: ${props =>props.$active ? '#000' : '#757575'};

    font-family: var(--Static-Title-Medium-Font, Roboto);
    font-size: var(--Static-Title-Medium-Size, 16px);
    font-weight: 500;
    line-height: var(--Static-Title-Medium-Line-Height, 24px); /* 150% */
    letter-spacing: var(--Static-Title-Medium-Tracking, 0.15px);

    &:hover {
        background: ${props => props.$active ? '#F5F5F5' : 'rgba(255, 255, 255, 0.3)'};
        cursor: pointer;
    }

    &:active {
        transform: scale(0.98);
    }
`;

const ContentArea = styled.div`
    background: #fff;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    min-height: 0;
    -ms-overflow-style:none;

    &::-webkit-scrollbar {
    display: none;
}
`;

const LoadingState = styled.div`
    text-align: center;
    padding: 20px;
    color: #9ca3af;
`;

export default MainPage;