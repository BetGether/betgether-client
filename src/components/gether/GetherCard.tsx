import styled from "styled-components";
import type { MyGether } from "../../apis/gethers";
import { useNavigate } from "react-router-dom";
import Person from "../../assets/Icon/person.svg";
import TrackingOn from "../../assets/Icon/trackingOn.svg";

interface GetherCardProps {
  gether: MyGether;
}

const GetherCard = ({ gether }: GetherCardProps) => {
  const navigate = useNavigate();

    return (
        <Card onClick={() => navigate(`/gether/${gether.getherId}`)}>
            <ImageWapper>
                <CardImage src={gether.imageUrl} alt={gether.title}/>
                <Overlay/>
            </ImageWapper>
            
            {gether.challengeStatus === "OPEN" && 
                <BettingOverlay>
                    <img src={TrackingOn} alt="challengeOpen"/>
                    <BettingInfo>베팅 중</BettingInfo>
                </BettingOverlay> 
            }

      <CardContent>
        <CardTitle>{gether.title}</CardTitle>
        <ParticipantInfo>
          <img src={Person} alt="personIcon" />
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
  &:hover {
    cursor: pointer;
  }
`;

const ImageWapper = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
`;

const CardImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

const BettingOverlay = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;

  display: inline-flex;
  padding: 5px 9px;
  justify-content: center;
  align-items: center;
  gap: 6px;

  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(2.5px);
`;

const BettingInfo = styled.span`
  color: #fff;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;

  font-family: "SF Pro";
  font-size: 12px;
  font-weight: 510;
  line-height: 16px;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;

  display: flex;
  width: 100%;
  height: 45px;
  margin: 10px 0;
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

  color: #fff;
  text-align: center;
  font-feature-settings: "liga" off, "clig" off;

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

  color: #fff;
  text-align: center;

  font-family: var(--Static-Body-Small-Font, Roboto);
  font-size: var(--Static-Body-Small-Size, 12px);
  font-weight: 500;
  line-height: var(--Static-Body-Small-Line-Height, 16px);
  letter-spacing: var(--Static-Body-Small-Tracking, 0.4px);
`;

export default GetherCard;
