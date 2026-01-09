import styled from "styled-components";
import type { GetherResponse, GetherRequest } from "@/apis/gethers";
import { createGether } from "@/apis/gethers";
import { useNavigate } from "react-router-dom";
import Back from "@/assets/Icon/back.svg";
import Cancel from "@/assets/Icon/cancel.svg";
import Point from "@/assets/Icon/point.svg";
import Gallery from "@/assets/Icon/gallery.svg";
import { useState, useRef  } from "react";

const CreateGether = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [challengeName, setChallengeName] = useState("");
    const [betPoint, setBetPoint] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    //파일 선택
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setImageUrl(file.name);
        }
    };

    // 갤러리 버튼 클릭
    const handleGalleryClick = () => {
        fileInputRef.current?.click();
    };

    // 모든 필드가 채워졌는지 확인
    const isFormValid = 
        title.trim() !== "" &&
        description.trim() !== "" &&
        challengeName.trim() !== "" &&
        betPoint.trim() !== "" &&
        imageUrl !== "";

    // 제출
    const handleSubmit = async () => {
        if (!isFormValid || isLoading) return;

        setIsLoading(true);
        try {
            const data: GetherRequest = {
                title: title.trim(),
                description: description.trim(),
                imageUrl: imageUrl,
                isPublic: isPublic,
                challenge: {
                    title: challengeName.trim(),
                    betPoint: parseInt(betPoint)
                }
            };

            const response: GetherResponse = await createGether(data);
            console.log("게더 생성 성공:", response);
            console.log("생성된 게더 ID:", response.getherId);
            console.log("상태:", response.status);
            navigate(`/gether/${response.getherId}`);
        } catch (error) {
            console.error("게더 생성 실패:", error);
            alert("게더 생성에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Container>
            <GetherImg>
                {imagePreview ? (
                    <GetherImgUploaded>
                        <PreviewImage src={imagePreview} alt="preview" />
                    </GetherImgUploaded>
                ) : (
                    <GetherImgUploaded />
                )}
                <HiddenFileInput
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                />
                <GetherImgUploadButton onClick={handleGalleryClick}>
                    <img src={Gallery} alt="gallery"/>
                </GetherImgUploadButton>
            </GetherImg>

            <TopBar>
                <BackImg src={Back} alt="back" onClick={() => navigate(-1)} />
                <Title>게더 만들기</Title>
            </TopBar>

            <CreateGetherContainer>
                <CreateGetherInfo>
                    <GetherName>
                        <InputWhat>이름</InputWhat>
                        <GetherInputBar>
                            <GetherInput
                            type="text"
                            name="title"
                            placeholder="게더의 이름을 입력하세요."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                            <CancelButton onClick={() => setTitle("")}>
                                <img src={Cancel} alt="cancelIcon"/>
                            </CancelButton>
                        </GetherInputBar>
                    </GetherName>

                    <GetherDescription>
                        <InputWhat>설명</InputWhat>
                        <GetherInputBar>
                            <GetherInput
                                type="text"
                                name="description"
                                placeholder="설명을 입력하세요."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <CancelButton onClick={() => setDescription("")}>
                                <img src={Cancel} alt="cancelIcon"/>
                            </CancelButton>
                        </GetherInputBar>
                    </GetherDescription>
                    <GetherDetail>
                        <GetherChallenge>
                            <InputWhat>챌린지</InputWhat>
                            <GetherInputBar>
                                <GetherInput
                                type="text"
                                name="challenge"
                                placeholder="챌린지를 입력하세요."
                                value={challengeName}
                                onChange={(e) => setChallengeName(e.target.value)}
                                />
                                <CancelButton onClick={() => setChallengeName("")}>
                                    <img src={Cancel} alt="cancelIcon"/>
                                </CancelButton>
                            </GetherInputBar>
                        </GetherChallenge>
                        <GetherBetting>
                            <InputWhat>베팅</InputWhat>
                            <GetherInputBar>
                                <GetherInput
                                type="number"
                                name="create"
                                placeholder="0000"
                                value={betPoint}
                                onChange={(e) => setBetPoint(e.target.value)}
                                min="1"
                                />
                                <PointImg src={Point} alt="point"/>
                            </GetherInputBar>  
                        </GetherBetting>
                    </GetherDetail>
                </CreateGetherInfo>
                <GetherDownLayout>
                    <GetherIsPublic>
                        <span>공개여부</span>
                        <IsToggle $isActive={isPublic} onClick={() => setIsPublic(!isPublic)}>
                            <ToggleCircle $isActive={isPublic} />
                        </IsToggle>
                    </GetherIsPublic>
                    <GetherSubmit
                        disabled={!isFormValid || isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? "등록 중..." : "등록"}
                    </GetherSubmit>
                </GetherDownLayout>
            </CreateGetherContainer>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const TopBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 56px;
    background-color: rgb(255 255 255 / 50%);
`;

const BackImg = styled.img`
    position: absolute;
    left: 26px;
    padding: 0 6px;
    &:hover {cursor: pointer;}
`;

const Title = styled.div`
    color: var(--Font-02_black, #111);
    text-align: center;
    text-overflow: ellipsis;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: -0.5px;
`;

const CreateGetherContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 200px;
    padding: 29px 50px 56px 50px;
`;

const CreateGetherInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 19px;
`;

const GetherImg = styled.div`
    width: 100%;
    height: 258px;
    background: #D9D9D9;
    position: relative;
`;

const GetherImgUploaded = styled.div`
    width: 100%;
    height: 100%;
`;

const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const GetherImgUploadButton = styled.button`
    position: absolute;
    bottom: 23px;
    right: 23px;
    border: none;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    width: 24px;
    height: 24px;
    border-radius: 10px;
    
    &:hover {
        cursor: pointer;
    }
`;

const InputWhat = styled.div`
    display: flex;
    padding: 7px 15px;
    align-items: center;

    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.5px;
`;

const GetherInputBar = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    padding: 15px;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #D9D9D9;
`;

const GetherInput = styled.input`
    width: 100%;
    border: none;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex: 1;

    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &::placeholder {
        color: #757575;
    }

    &:focus {
        outline: none;
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const CancelButton = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    &:hover {cursor: pointer;}
`;

const GetherName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const GetherDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const GetherDetail = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

const GetherChallenge = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const GetherBetting = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 180px;
`;

const PointImg = styled.img`
    width: 20px;
    height: 20px;
`;

const GetherDownLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: flex-end;
`;

const GetherIsPublic = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    color: #999;
    text-align: center;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
`;

const IsToggle = styled.div<{$isActive: boolean}>`
    width: 52px;
    height: 28px;
    border-radius: 14px;
    background: ${props => props.$isActive ? '#6366F1' : '#F1F1F5'};
    position: relative;
    cursor: pointer;
    transition: background 0.3s;
`;

const ToggleCircle = styled.div<{ $isActive: boolean }>`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 2px;
    left: ${props => props.$isActive ? '26px' : '2px'};
    transition: left 0.3s;
`;

const GetherSubmit = styled.button<{ disabled: boolean }>`
    display: flex;
    width: 100%;
    height: 60px;
    padding: 17px 94px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: none;
    background: ${props => props.disabled ? '#B0B0B0' : '#6155F5'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: background 0.2s;

    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

export default CreateGether;