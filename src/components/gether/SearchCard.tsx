import styled from "styled-components";
import type { SearchGether} from "@/apis/gethers";
import { useNavigate } from "react-router-dom";
import PersonGray from "@/assets/Icon/personGray.svg"
import TrackingOn from "@/assets/Icon/trackingOn.svg"


interface GetherCardProps {
    gether: SearchGether;
}

const SearchCard = ({gether}: GetherCardProps) => {
    const navigate = useNavigate();

    return (
        <CardLayout>
            <Card onClick={() => navigate(`/gethers/${gether.getherId}`)}>
                <GetherImage src={gether.imageUrl} alt={gether.title}/>
                <CardContent>
                    <GetherTitle>
                        {gether.title}
                    </GetherTitle>
                    <GetherDescription>
                        {gether.description}
                    </GetherDescription>
                    <GetherDetail>
                        <ChallengeInfo>
                            <img src={TrackingOn} alt="onIcon"/>
                            {gether.challengeTitle}
                        </ChallengeInfo>
                        <ParticipantInfo>
                            <img src={PersonGray} alt="personIcon"/>
                            {gether.participantCount}
                        </ParticipantInfo>
                    </GetherDetail>
                </CardContent>
            </Card>
        </CardLayout>
    );
};

const CardLayout = styled.div`
    height: 132px;
    width: 100%;
    margin-bottom: 8px;
    min-width: 408px;
`;

const Card = styled.div`
    display: flex;
    gap: 19px;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    padding: 10px;
    align-items: center;
    box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.05);
    &:hover {cursor: pointer;}
`;

const GetherImage = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 10px;
    object-fit: cover;
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    justify-content: center;
    flex: 1;
`;

const GetherTitle = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    flex: 1;
    padding-right: 20px;

    color: #000;
    font-family: var(--Static-Title-Medium-Font, Roboto);
    font-size: var(--Static-Title-Medium-Size, 16px);
    font-weight: 500;
    line-height: var(--Static-Title-Medium-Line-Height, 24px); /* 150% */
    letter-spacing: var(--Static-Title-Medium-Tracking, 0.15px);
`;

const GetherDescription = styled.div`
    padding-right: 20px;
    height: 40px;

    color: #000;

    font-family: var(--Static-Body-Medium-Font, Roboto);
    font-size: var(--Static-Body-Medium-Size, 14px);
    font-weight: 400;
    line-height: var(--Static-Body-Medium-Line-Height, 20px);
    letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;

const GetherDetail = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ChallengeInfo = styled.div`
    display: flex;
    gap: 7px;
    color: #6155F5;

    font-family: var(--Static-Body-Medium-Font, Roboto);
    font-size: var(--Static-Body-Medium-Size, 14px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--Static-Body-Medium-Line-Height, 20px);
    letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;

const ParticipantInfo = styled.div`
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    color: #757575;
    text-align: center;

    font-family: var(--Static-Body-Small-Font, Roboto);
    font-size: var(--Static-Body-Small-Size, 12px);
    font-style: normal;
    font-weight: 500;
    line-height: var(--Static-Body-Small-Line-Height, 16px);
    letter-spacing: var(--Static-Body-Small-Tracking, 0.4px);
`;


export default SearchCard;