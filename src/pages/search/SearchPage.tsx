import styled from "styled-components";
import type { SearchGether } from "../../apis/gethers";
import { getSearchingGether } from "../../apis/gethers";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/gether/SearchCard";
import SearchGray from "../../assets/Icon/searchGray.svg"
import Cancel from "../../assets/Icon/cancel.svg";
import Back from "../../assets/Icon/back.svg"

const SearchPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchGether[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchKeyword.trim()) return;

        setIsLoading(true);
        setHasSearched(true);
        
        try {
            const data = await getSearchingGether({ keyword: searchKeyword.trim() });
            setSearchResults(data || []);
        } catch (error) {
            console.error("검색 실패:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchKeyword("");
        setSearchResults([]);
        setHasSearched(false);
    };

    return (
        <Container>
            <TopBar>
                <BackImg src={Back} alt="back" onClick={() => navigate(-1)} />
                <Title>검색</Title>
            </TopBar>
            <SearchBarContainer>
                <SearchBar>
                    <img src={SearchGray} alt="searchIcon"/>
                    <SearchInput
                        type="text"
                        name="search"
                        placeholder="어떤 게더를 찾으시나요?"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    {searchKeyword && (
                        <CancelButton onClick={handleClearSearch}>
                            <img src={Cancel} alt="cancelIcon"/>
                        </CancelButton>
                    )}
                </SearchBar>
            </SearchBarContainer>
            <SearchGetherList>
                {!hasSearched ? (
                    <EmptyState>
                        <EmptyMessage>검색어를 입력하고 Enter를 눌러주세요</EmptyMessage>
                    </EmptyState>
                ) : isLoading ? (
                    <EmptyState>
                        <EmptyMessage>검색 중...</EmptyMessage>
                    </EmptyState>
                ) : searchResults.length > 0 ? (
                    searchResults.map((gether) => (
                        <SearchCard key={gether.getherId} gether={gether}/>
                    ))
                ) : (
                    <EmptyState>
                        <EmptyMessage>검색 결과가 없습니다</EmptyMessage>
                    </EmptyState>
                )}
            </SearchGetherList>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    margin-top: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const TopBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const BackImg = styled.img`
    position: absolute;
    left: 26px;
    padding: 0 6px;
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

const SearchBarContainer = styled.div`
    width: 100%;
    padding: 0 80px;
`;

const SearchBar = styled.div`
    width: 100%;
    display: flex;
    padding: 5px 15px;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border-radius: 12px;
    background: #F8F8F8;
`;

const SearchInput = styled.input`
    width: 320px;
    border: none;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex: 1;
    background: #F8F8F8;

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
`;

const CancelButton = styled.button`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    &:hover {cursor: pointer;}
`;

const SearchGetherList = styled.div`
    margin-top: 12px;
    width:100%;
    padding: 0 80px;
`;

const EmptyState = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const EmptyMessage = styled.span`
    color: #9ca3af;
    font-family: var(--Static-Body-Medium-Font, Roboto);
    font-size: var(--Static-Body-Medium-Size, 16px);
    font-weight: 400;
    line-height: var(--Static-Body-Medium-Line-Height, 20px);
    letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;



export default SearchPage;