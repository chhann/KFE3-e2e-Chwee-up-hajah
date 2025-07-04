# API 호출 시나리오 명세서

이 문서는 Next.js App Router를 사용하여 구현된 백엔드 API 엔드포인트들의 호출 시나리오를 명세합니다. 각 API는 RESTful 원칙을 따르며, Supabase를 통한 인증 및 인가 로직을 포함합니다.

## 기본 정보

- **Base URL**: `/api` (Next.js App Router의 상대 경로)
- **인증**: Supabase Auth를 통한 JWT 토큰 기반 인증 (필요시 `Authorization: Bearer <token>` 헤더 사용)
- **인가**: Supabase Row Level Security (RLS) 및 서버 측 로직을 통해 처리

---

## API 엔드포인트 목록

### 1. 인증 (Authentication)

- **경로**: `/api/auth`
- **설명**: 사용자 인증 및 세션 관리를 위한 엔드포인트. Supabase Auth와 연동됩니다.
- **하위 경로**:
  - `/api/auth/signup`: 회원가입
    - **메서드**: `POST`
    - **요청 바디**:
      ```json
      {
        "email": "user@example.com",
        "password": "your_password",
        "username": "your_username"
      }
      ```
    - **응답**:
      - 성공: `200 OK` (사용자 정보 또는 성공 메시지)
      - 실패: `400 Bad Request`, `409 Conflict` 등 (에러 메시지)
  - `/api/auth/login`: 로그인
    - **메서드**: `POST`
    - **요청 바디**:
      ```json
      {
        "email": "user@example.com",
        "password": "your_password"
      }
      ```
    - **응답**:
      - 성공: `200 OK` (세션 정보 또는 성공 메시지)
      - 실패: `401 Unauthorized` 등 (에러 메시지)
  - `/api/auth/logout`: 로그아웃
    - **메서드**: `POST`
    - **요청 바디**: 없음
    - **응답**: `200 OK` (성공 메시지)

### 2. 경매 (Auction)

- **경로**: `/api/auction`
- **설명**: 경매 목록 조회, 상세 조회, 생성, 입찰 등 경매 관련 기능을 제공합니다.
- **하위 경로**:
  - `/api/auction`: 경매 목록 조회 및 생성
    - **메서드**: `GET` (목록 조회), `POST` (경매 생성)
    - **GET 요청 쿼리**: `?status=active&category=electronics` 등 필터링 옵션
    - **POST 요청 바디**: (경매 생성에 필요한 데이터)
  - `/api/auction/[auctionId]`: 특정 경매 상세 조회 및 입찰
    - **메서드**: `GET` (상세 조회), `POST` (입찰)
    - **POST 요청 바디**:
      ```json
      {
        "bid_price": 10000
      }
      ```

### 3. 채팅 (Chat)

- **경로**: `/api/chat`
- **설명**: 사용자 간 채팅 메시지 전송 및 채팅방 관리를 위한 엔드포인트.
- **하위 경로**:
  - `/api/chat/rooms`: 채팅방 목록 조회
    - **메서드**: `GET`
  - `/api/chat/messages/[roomId]`: 특정 채팅방 메시지 조회 및 전송
    - **메서드**: `GET`, `POST`
    - **POST 요청 바디**:
      ```json
      {
        "content": "안녕하세요!"
      }
      ```

### 4. 상품 (Product)

- **경로**: `/api/product`
- **설명**: 상품 정보 조회 및 관리를 위한 엔드포인트.
- **하위 경로**:
  - `/api/product`: 상품 목록 조회 및 생성
    - **메서드**: `GET`, `POST`
  - `/api/product/[productId]`: 특정 상품 상세 조회
    - **메서드**: `GET`

### 5. 프로필 (Profile)

- **경로**: `/api/profile`
- **설명**: 사용자 프로필 정보 조회 및 업데이트를 위한 엔드포인트.
- **하위 경로**:
  - `/api/profile`: 내 프로필 조회 및 업데이트
    - **메서드**: `GET`, `PUT`
    - **PUT 요청 바디**: (업데이트할 프로필 정보)
  - `/api/profile/[userId]`: 특정 사용자 프로필 조회
    - **메서드**: `GET`

---

**참고**: 각 API의 정확한 요청/응답 스키마는 해당 `route.ts` 파일의 구현을 참조하십시오.
