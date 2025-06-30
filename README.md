# KFE3-e2e-Chwee-up-hajah 프로젝트 시스템 가이트

이 문서는 KFE3-e2e-Chwee-up-hajah 프로젝트의 구조, 기술, 개발 가이드라인에 대한 상세한 개요를 제공합니다.

## 1. 핵심 기술 및 원칙

### 프론트엔드
- **프레임워크**: 개발을 위해 Turbopack과 함께 Next.js 15+ (React 19+)를 사용합니다.
- **스타일링**: Tailwind CSS v4를 사용합니다. `packages/tailwind-config`에서 중앙 집중식으로 설정을 활용합니다.
- **디자인 시스템**: `packages/ui`에 커스텀 디자인 시스템이 구현되어 있습니다. 핵심 디자인 토큰(색상, 타이포그래피, 간격)은 `packages/ui/src/theme.css`에 CSS 변수로 정의되어 있습니다. 이 변수들은 Tailwind 클래스에서 `bg-[var(--color-primary-500)]`와 같은 임의 값 구문(arbitrary value syntax)을 사용하여 활용해야 합니다.
- **상태 관리**: 전역 클라이언트 측 상태 관리를 위해 Zustand를 사용합니다.
- **데이터 페칭**: 서버 상태 관리(캐싱, 재페칭 등)를 위해 Tanstack Query를 사용합니다.
- **PWA**: `apps/web` 애플리케이션은 `next-pwa`로 구성된 프로그레시브 웹 앱(Progressive Web App)입니다.

### 백엔드 및 배포
- **데이터베이스 및 인증**: 데이터베이스 및 사용자 인증을 위해 Supabase를 사용합니다. SSR(Server-Side Rendering) 호환 클라이언트는 `apps/web/lib/supabase`에 설정되어 있습니다.
- **API 설계**: API 엔드포인트는 Next.js App Router의 `route.ts`를 사용하여 구현되며, 일반적으로 RESTful 원칙을 따릅니다. 주요 API 경로는 `apps/web/app/api/` 아래에 정의됩니다 (예: `api/auction`, `api/auth`).
- **인증 및 인가**: 사용자 인증은 Supabase Auth를 통해 처리됩니다. API 라우트 및 데이터베이스 접근에 대한 인가는 Supabase의 Row Level Security (RLS) 및 서버 측 로직을 통해 구현됩니다. Supabase 클라이언트 설정은 `apps/web/lib/supabase/supabase.ts`에서 관리됩니다.
- **배포**: 프로젝트는 Vercel에 배포됩니다. `main` 브랜치에 변경 사항이 푸시되면 자동 배포가 트리거됩니다.

## 2. 모노레포 프로젝트 구조 (Turborepo)

이 프로젝트는 Turborepo 모노레포입니다. 구조는 `apps`와 `packages`로 나뉩니다.

### `apps` (애플리케이션)
- **`apps/web`**: 최종 사용자에게 서비스를 제공하는 메인 Next.js 애플리케이션입니다. Feature-Sliced Design (FSD) 아키텍처를 따릅니다.
- **`apps/docs`**: `packages/ui`의 UI 컴포넌트를 문서화하고 테스트하기 위한 Storybook 인스턴스로도 사용되는 Next.js 애플리케이션입니다.

### `packages` (패키지)
- **`packages/ui`**: 재사용 가능한 UI 컴포넌트(예: Button, Card, Input)와 핵심 디자인 시스템(`theme.css`)을 포함하는 공유 패키지입니다.
- **`packages/eslint-config`**: 모노레포 전체에서 일관된 코드 스타일을 위한 공유 ESLint 설정입니다.
- **`packages/tailwind-config`**: 공유 Tailwind CSS 설정입니다.
- **`packages/typescript-config`**: 공유 TypeScript `tsconfig.json` 파일입니다.

## 3. `apps/web` - 애플리케이션 아키텍처 (FSD)

`web` 애플리케이션은 확장 가능하고 유지보수하기 쉬운 방식으로 코드를 구성하기 위해 Feature-Sliced Design 방법론을 따릅니다.

- **`app/`**: Next.js App Router 디렉토리입니다. 레이아웃, 페이지, API 라우트를 포함합니다.

- **`features/`**: 사용자 대면 기능으로, 각 기능은 특정 기능을 캡슐화합니다.
    - `authentication`: 로그인, 회원가입, 로그아웃 기능입니다.
    - `chat-list`: 사용자 채팅방 목록을 표시합니다.
    - `chat-room`: 특정 대화를 위한 실제 채팅 인터페이스입니다.
    - `product-list`: 필터링 및 정렬을 포함하여 제품을 표시합니다.
- **`widgets/`**: 기능(features)과 엔티티(entities)를 조합하여 구성된 UI의 구성 블록입니다.
    - `header`, `footer`: 사이트 전체의 헤더 및 푸터입니다.
    - `auction-listings`: 경매 목록을 표시하는 위젯입니다.
    - `auction-detail-card`: 단일 경매의 상세 보기 카드입니다.
    - `image-banner`: 프로모션 콘텐츠를 위한 배너입니다.
- **`hooks/`**: 재사용 가능한 로직을 위한 커스텀 React 훅입니다 (예: `useLogin`, `useCreateAuction`).
- **`lib/`**: 유틸리티 함수, Supabase 클라이언트 설정, 유효성 검사기(validators)를 포함합니다.
- **`stores/`**: Zustand 스토어 정의입니다 (예: `auth.ts`, `modal.ts`).

## 4. `packages/ui` - 디자인 시스템 및 컴포넌트

이 패키지는 프로젝트 UI의 기반입니다.

- **`src/theme.css`**: 모든 디자인 토큰(색상, 글꼴 등)의 진실의 원천(source of truth)입니다. 모든 스타일링은 이 변수들을 참조해야 합니다.
- **`src/styles.css`**: 전역 스타일 및 기본 Tailwind CSS 레이어 정의입니다.
- **`src/design-system/`**: `Button`, `Card`, `Badge`, `Input` 등 개별적이고 재사용 가능한 UI 컴포넌트를 포함합니다.
- **`dist/`**: UI 패키지의 빌드 출력물로, 컴파일된 CSS 및 JavaScript를 포함합니다.

## 5. 개발 가이드라인

- **코드 생성**: 새로운 컴포넌트를 스캐폴딩(자동 생성)하려면 `plop`를 사용합니다 (`pnpm plop ComponentName`).
- **컨벤션**: 기존 코드 스타일, 명명 규칙 및 FSD 아키텍처를 엄격하게 준수해야 합니다.
- **스타일링**: Tailwind의 임의 값 구문을 사용하여 `packages/ui/src/theme.css`의 테마 변수를 항상 사용하는 것을 선호합니다.
- **커밋**: `.github/.gitmessage.txt`에 정의된 컨벤셔널 커밋 메시지 형식을 따릅니다.
- **테스팅**:
    프로젝트의 안정성과 품질을 보장하기 위해 다양한 수준의 테스트를 수행합니다.

    - **UI 컴포넌트 테스트 (Storybook)**:
        - `packages/ui`의 UI 컴포넌트는 `apps/docs` 내 Storybook 환경에서 시각적으로 테스트되고 문서화됩니다.
        - 이는 컴포넌트의 외형과 기본적인 상호작용을 독립적으로 확인하는 데 중점을 둡니다.

    - **단위/통합 테스트 (Vitest)**:
        - **현재 상태**: 현재 프로젝트에는 `hooks`, `features`, `lib` (유틸리티 및 유효성 검사기), `stores` 등 다양한 영역에 단위/통합 테스트 코드가 존재합니다.
        - **목표**: `hooks`, `lib`, `stores`, `features` 등 애플리케이션의 핵심 비즈니스 로직에 대한 단위 및 통합 테스트 작성을 강력히 권장합니다.
        - **도구**: `apps/docs`에서 사용되는 Vitest를 `apps/web`에서도 활용하여 테스트를 작성합니다.
        - **테스트 전략 및 우선순위 (권장 단계)**:
            1.  **`apps/web`에 Vitest 설치 및 설정:**
                *   `apps/web` 디렉토리로 이동하여 Vitest를 개발 의존성으로 설치합니다.
                    ```bash
                    cd apps/web
                    pnpm add -D vitest @vitest/coverage-v8
                    ```
                *   `apps/web` 디렉토리 내에 `vitest.config.ts` 파일을 생성하고, `apps/docs`의 설정을 참고하여 `apps/web`에 맞게 구성합니다.
                *   `apps/web/package.json`에 테스트 실행 스크립트를 추가합니다 (예: `"test": "vitest"`).
            2.  **`stores` (Zustand)에 대한 단위 테스트 작성:**
                *   `apps/web/stores/auth.ts`와 같은 Zustand 스토어 파일에 대해 단위 테스트를 작성합니다.
                *   네트워크 요청 등 외부 의존성을 모의(mock) 처리하여 스토어의 로직 자체를 검증합니다.
            3.  **`lib` (유틸리티, 유효성 검사기)에 대한 단위 테스트 작성:**
                *   `apps/web/lib/utils/` 또는 `apps/web/lib/validators/`와 같은 디렉토리에 있는 순수 함수나 유틸리티 함수에 대한 단위 테스트를 작성합니다.
            4.  **`hooks`에 대한 단위 테스트 작성:**
                *   `apps/web/hooks/` 디렉토리에 있는 커스텀 훅에 대한 단위 테스트를 작성합니다.
            5.  **`features`에 대한 통합 테스트 작성:**
                *   `apps/web/features/` 디렉토리에 있는 복잡한 기능 간의 상호작용에 대한 통합 테스트를 작성합니다.

    - **E2E (End-to-End) 테스트**:
        - **목표**: 사용자가 애플리케이션과 상호작용하는 방식과 동일하게, 애플리케이션의 전체 흐름을 처음부터 끝까지 테스트합니다. 프론트엔드, 백엔드, 데이터베이스 등 모든 시스템 구성 요소가 실제 환경처럼 함께 작동하는지 검증합니다.
        - **필요성**: 단위/통합 테스트가 개별 로직의 정확성을 보장한다면, E2E 테스트는 실제 사용자 시나리오에서 시스템 전체가 예상대로 동작하는지 확인하여 최종 사용자 경험을 보장합니다.
        - **도구**: Playwright 또는 Cypress와 같은 전용 E2E 테스트 프레임워크를 사용하여 사용자 시나리오 기반의 테스트 코드를 작성합니다.

    - **코드 품질 검증**: 커밋하기 전에 `pnpm lint` 및 `pnpm check-types`를 실행하여 코드 품질과 타입 안정성을 보장합니다.

## 6. 프로젝트 상호작용 방법

- **프로젝트 실행**: 개발 모드에서 `web` 및 `docs` 애플리케이션을 모두 시작하려면 `pnpm dev`를 사용합니다.
- **UI 컴포넌트**: UI 컴포넌트 작업을 하려면 `packages/ui`로 이동하여 시각화 및 테스트를 위해 `apps/docs` 내의 Storybook을 사용합니다.
- **기능**: 새로운 기능을 추가할 때는 `apps/web/features` 아래에 새 디렉토리를 만들고 FSD 원칙을 따릅니다.
- **데이터베이스/인증**: `apps/web/lib/supabase`에 정의된 클라이언트를 통해 Supabase와 상호작용합니다.
