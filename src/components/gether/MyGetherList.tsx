import styled from "styled-components";
import type { MyGether } from "../../apis/gethers";
import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import GetherCard from "./GetherCard";
import ArrowDown from "../../assets/Icon/arrowDown.svg";
import ArrowUp from "../../assets/Icon/arrowUp.svg";
import SearchGray from "../../assets/Icon/searchGray.svg"
import Cancel from "../../assets/Icon/cancel.svg";

interface MyGetherListProps {
  gethers: MyGether[];
}

type SortOption = "joined" | "latest" | "alphabetical";

const SORT_OPTIONS: Record<SortOption, string> = {
  joined: "가입 순",
  latest: "최신 순",
  alphabetical: "가나다 순"
};

const MyGetherList = ({ gethers }: MyGetherListProps) => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<SortOption>("joined");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 추가
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSortChange = (option: SortOption) => {
        setSortBy(option);
        setIsDropdownOpen(false);
    };

    const handleClearSearch = () => {
        setSearchKeyword("");
    };

    // 검색 + 정렬 로직
    const filteredAndSortedGethers = useMemo(() => {
        //먼저 검색 필터링
        let filtered = gethers;
        if (searchKeyword.trim()) {
        filtered = gethers.filter(gether =>
            gether.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        }

        //정렬
        const sorted = [...filtered];
        switch (sortBy) {
        case "joined":
            return sorted.sort((a, b) =>
            new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()
            );
        case "latest":
            return sorted.sort((a, b) =>
            new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
            );
        case "alphabetical":
            return sorted.sort((a, b) =>
            a.title.localeCompare(b.title, 'ko-KR')
            );
        default:
            return sorted;
        }
    }, [gethers, sortBy, searchKeyword]);

    return (
        <Container>
            <SearchBar>
                <img src={SearchGray} alt="searchIcon"/>
                <SearchInput
                    type="text"
                    placeholder="내 게더를 찾아봐요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                <CancelButton onClick={handleClearSearch}>
                    <img src={Cancel} alt="cancelIcon"/>
                </CancelButton> 
            </SearchBar>

            <Header>
                <SectionTitle>나의 게더</SectionTitle>
                <DropdownWrapper ref={dropdownRef}>
                <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {SORT_OPTIONS[sortBy]}
                    {isDropdownOpen ? 
                    <img src={ArrowUp} alt="arrowUp"/>
                    : 
                    <img src={ArrowDown} alt="arrowDown"/>}
                </DropdownButton>
                
                {isDropdownOpen && (
                    <DropdownMenu>
                    {(Object.keys(SORT_OPTIONS) as SortOption[]).map((option) => (
                        <DropdownItem
                        key={option}
                        $isSelected={sortBy === option}
                        onClick={() => handleSortChange(option)}
                        >
                        {SORT_OPTIONS[option]}
                        </DropdownItem>
                    ))}
                    </DropdownMenu>
                )}
                </DropdownWrapper>
            </Header>

            <GetherList>
                {filteredAndSortedGethers.length > 0 ? (
                    filteredAndSortedGethers.map((gether) => (
                        <GetherCard key={gether.getherId} gether={gether} />
                    ))
                    ) : (
                    <EmptyState>
                        {searchKeyword ? (
                        <EmptyMessage>검색 결과가 없습니다</EmptyMessage>
                        ) : (
                        <EmptyMessage>아직 참여한 게더가 없습니다</EmptyMessage>
                        )}
                    </EmptyState>
                    )}
                <CreateButton onClick={() => navigate("/gethers")}>
                    새로운 게더 만들기
                </CreateButton>
            </GetherList>
        </Container>
    );
};

const Container = styled.div`
    width: 408px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const SearchBar = styled.div`
    width: 100%;
    display: flex;
    width: 408px;
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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SectionTitle = styled.div`
    width: 90px;
    height: 40px;
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: -0.034px;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  overflow: hidden;
  z-index: 10;
`;

const DropdownItem = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${props => props.$isSelected ? '#f3f4f6' : 'white'};
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  text-align: left;
  transition: background 0.2s;
  
  
  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
  }
`;

const GetherList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
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
    font-size: var(--Static-Body-Medium-Size, 14px);
    font-weight: 400;
    line-height: var(--Static-Body-Medium-Line-Height, 20px);
    letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);
`;

const CreateButton = styled.button`
    display: flex;
    height: 60px;
    margin-bottom: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 71px;
    align-self: stretch;
    border-radius: 12px;
    background: #FFF;
    border: none;
    box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.10);

    color: #757575;

    font-family: var(--Static-Body-Medium-Font, Roboto);
    font-size: var(--Static-Body-Medium-Size, 14px);
    font-weight: 400;
    line-height: var(--Static-Body-Medium-Line-Height, 20px);
    letter-spacing: var(--Static-Body-Medium-Tracking, 0.25px);

    &:hover {cursor: pointer;}
`;

export default MyGetherList;