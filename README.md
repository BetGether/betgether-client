# BetGether

## 프로젝트 소개

BetGether는 함께 목표를 달성하는 챌린지 플랫폼입니다. 사용자들이 그룹(Gether)을 생성하고, 챌린지에 참여하며, 실시간 채팅을 통해 소통할 수 있는 웹 애플리케이션입니다.

## 개발 스택

### Frontend
- **Core**: React 19.2 + TypeScript
- **Build Tool**: Vite 7.2 (SWC 사용)
- **Styling**: styled-components 6.2
- **Routing**: react-router-dom 7.11
- **HTTP Client**: ky 1.14
- **Real-time**: STOMP.js 7.2, SockJS Client
- **Code Quality**: ESLint 9.39, TypeScript ESLint
- **Deployment**: Vercel (자동 배포)
- **Image Storage**: Vercel Blob 2.0

### Additional Libraries
- qrcode.react: QR 코드 생성
- vite-plugin-svgr: SVG 컴포넌트화
- vite-plugin-image-optimizer: 이미지 최적화

## 주요 기능

- 게더(Gether) 생성/편집/검색
- 챌린지 참여 및 관리
- 실시간 채팅
- 랭킹 시스템
- 인증 및 검증 시스템
- QR 코드 기반 초대

## 노력한 점

### 1. 코드 추상화 및 가독성
- **styled-components 활용**: inline style을 자제하고 semantic한 컴포넌트 네이밍을 통해 태그의 의도를 명확하게 표현
```tsx
// 좋은 예시: BetGetherIcons.tsx에서 아이콘 컴포넌트화
const withIconStyle = (Component, defaultSize = 28) => {
  return styled(Component)<IconProps>`
    width: ${({ size }) => size || defaultSize}px;
    height: ${({ size }) => size || defaultSize}px;
    cursor: ${({ clickable = true }) => (clickable ? "pointer" : "default")};
    // ...
  `;
};
```

### 2. 함수형 프로그래밍 패턴
- setState의 함수형 업데이트 패턴을 적극 활용하여 상태 관리의 안정성 확보
- 불변성을 유지하며 예측 가능한 상태 변경 구현

### 3. CI/CD 자동화
- 프로젝트 초기부터 Vercel 자동 배포 파이프라인 구축
- 팀원들과 실시간으로 진척사항 공유 및 빠른 피드백 루프 확립

### 4. Mock Server를 활용한 병렬 개발
- Claude AI를 활용하여 백엔드 API 배포 전에 Express 기반 mock server 구축
- 프론트엔드 개발 속도 향상 및 팀원 간 협업 효율 증대

### 5. 타입 안정성 강화
- 모든 API의 Request/Response 타입 정의 ([gethers.ts](src/apis/gethers.ts))
```typescript
export interface GetherRequest {
    title: string;
    description: string;
    imageUrl: string;
    isPublic: boolean;
    challenge: {
        title: string;
        betPoint: number;
    }
}

export interface GetherResponse {
    getherId: number;
    status: GetherStatus;
}
```
- ky HTTP 클라이언트 사용 시 타입 에러 최소화 및 자동완성 지원

### 6. 아이콘 컴포넌트화
- SVG 아이콘을 재사용 가능한 컴포넌트로 관리 ([BetGetherIcons.tsx](src/components/BetGetherIcons.tsx))
- Props를 통한 size, color, clickable 속성 제어
- 유틸리티 함수처럼 쉽게 사용 가능하도록 설계

### 7. 코드 품질 관리
- ESLint + TypeScript ESLint를 통한 일관된 코드 컨벤션 유지
- React Hooks 규칙 강제 (eslint-plugin-react-hooks)
- 타입 안정성을 위한 strict TypeScript 설정

### 8. HTTP 클라이언트 추상화
- ky 클라이언트를 래핑하여 인증 토큰 자동 주입 ([kyClient.ts](src/apis/kyClient.ts:8-14))
- 401 에러 시 자동 로그아웃 및 리다이렉트
- 에러 핸들링 중앙화

## 아쉬운 점

### 1. 유효성 검사 부재
- 게더 편집/생성 페이지에 입력 유효성 검사가 구현되지 않음
- 시간 부족으로 폼 검증 로직 미구현

### 2. ky 클라이언트 활용 미흡
- `useAsyncEffect` 같은 커스텀 훅을 활용한 더 우아한 비동기 처리 패턴 미적용
- 시간 제약으로 기본적인 async/await 패턴만 사용

### 3. 공용 컴포넌트 활용 부족
- 공용 컴포넌트([BetGetherBtn.tsx](src/components/BetGetherBtn.tsx), [BetGetherModal.tsx](src/components/BetGetherModal.tsx) 등)를 미리 만들어두었으나 팀 내 소통 부족
- 각자 구현에 집중하다 보니 동일한 기능을 서로 다른 컴포넌트로 중복 구현하는 경우 발생
- 컴포넌트 라이브러리 활용에 대한 사전 합의 필요

## 기술적 제약사항 및 해결책

### 이미지 업로드 보안 이슈
**문제상황**: 백엔드 서버에서 S3 연동이 불가능한 상황

**해결방안**:
- 프론트엔드에서 Vercel Blob Storage 직접 사용 ([uploadImage.ts](src/utils/uploadImage.ts))
- 클라이언트 측에서 인증 없이 파일 업로드

**보안 위험**:
```typescript
// VITE_BLOB_READ_WRITE_TOKEN이 클라이언트에 노출됨
const token = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
const newBlob = await put(file.name, file, {
  access: "public",
  token: token,
});
```
- 토큰 노출로 인한 무단 업로드 가능
- Rate limiting 없이 스토리지 남용 가능
- 악성 파일 업로드 위험

**해커톤 한정 허용**:
- 시연 및 평가를 위한 임시 방편
- 실제 프로덕션 환경에서는 반드시 백엔드를 통한 업로드로 전환 필요
- 향후 개선 계획:
  1. 백엔드에 presigned URL 생성 API 구현
  2. 파일 타입/크기 검증
  3. 사용자별 업로드 제한

## 프로젝트 구조

```
src/
├── apis/           # API 클라이언트 및 타입 정의
│   ├── kyClient.ts # ky HTTP 클라이언트 설정
│   ├── auth.ts
│   ├── gethers.ts
│   ├── chat.ts
│   ├── verify.ts
│   └── ranking.ts
├── components/     # 재사용 가능한 컴포넌트
│   ├── BetGetherBtn.tsx
│   ├── BetGetherModal.tsx
│   ├── BetGetherIcons.tsx
│   ├── BetGetherHeader.tsx
│   ├── BetGetherSpinner.tsx
│   └── gether/    # 게더 관련 컴포넌트
├── pages/         # 페이지 컴포넌트
│   ├── landing/
│   ├── main/
│   ├── gether/
│   ├── search/
│   └── verify/
├── utils/         # 유틸리티 함수
│   ├── token.ts
│   └── uploadImage.ts
└── styles/        # 스타일 관련
    └── Container.ts
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 환경 변수

프로젝트 루트에 `.env` 파일 생성:

```env
VITE_API_URL=your_api_url
VITE_BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## 배포

Vercel과 연동되어 main 브랜치에 푸시 시 자동 배포됩니다.

## 팀원

해커톤 프로젝트 - BetGether Team

## 라이선스

MIT License
