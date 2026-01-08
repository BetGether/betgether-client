import styled from "styled-components";
import type { MyGether } from "../../apis/gethers";
import { useNavigate } from "react-router-dom";
import Person from "../../assets/Icon/person.svg"
import TrackingOn from "../../assets/Icon/trackingOn.svg"
import TrackingOff from "../../assets/Icon/trackingOff.svg"


interface GetherCardProps {
    gether: MyGether;
}

const GetherCard = ({gether}: GetherCardProps) => {
    const navigate = useNavigate();
    const isBettingNow: boolean = true;

    return (
        <Card onClick={() => navigate(`/gethers/${gether.getherId}`)}>
            <ImageWapper>
                <CardImage src={gether.imageUrl} alt={gether.title}/>
                <Overlay/>
            </ImageWapper>
            
            {isBettingNow ? 
                <BettingOverlay>
                    <TrackingOn/>
                    <BettingInfo>베팅 중</BettingInfo>
                </BettingOverlay> 
                : 
                <BettingOverlay>
                    <TrackingOff/>
                    <BettingInfo>베팅 종료</BettingInfo>
                </BettingOverlay>
            }

            <CardContent>
                <CardTitle>
                    {gether.title}
                </CardTitle>
                <ParticipantInfo>
                    <Person/>
                    {gether.participantCount}
                </ParticipantInfo>
            </CardContent>

        </Card>
    );
};

const Card = styled.div`
    position: relative;
    width: 408px;
    height: 141px;
    border-radius: 10px;
    overflow: hidden;
`;

const ImageWapper = styled.div`
    position: relative;
    width: 100%
    height: 100%
`;

const CardImage = styled.img`
    width: 100%
    height: 100%
    object-fit: cover;
`;

const Overlay = styled.div`
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%);
`;

const BettingOverlay = styled.div`
    display: inline-flex;
    padding: 5px 9px;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.30);
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(2.5px);
`;

const BettingInfo = styled.span`
    color: #FFF;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: "SF Pro";
    font-size: 12px;
    font-weight: 510;
    line-height: 16px;
`;

const CardContent = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    padding: 0 18px 0 6px;
    align-items: center;
`;

const CardTitle = styled.div`
    display: flex;
    width: 354px;
    height: 100%;
    padding: 10px;
    align-items: center;
    flex: 1;

    color: #FFF;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: "SF Pro";
    font-size: 20px;
    font-weight: 590;
    line-height: 25px;
    letter-spacing: -0.45px;
`;

const ParticipantInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    color: #FFF;
    text-align: center;

    font-family: var(--Static-Body-Small-Font, Roboto);
    font-size: var(--Static-Body-Small-Size, 12px);
    font-weight: 500;
    line-height: var(--Static-Body-Small-Line-Height, 16px);
    letter-spacing: var(--Static-Body-Small-Tracking, 0.4px);
`;


export default GetherCard;