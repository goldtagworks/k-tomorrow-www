---
name: design-token-system
description: "CSS Custom Properties 기반 디자인 토큰 시스템 설계 스킬. 컬러 팔레트, 타이포그래피 스케일, 스페이싱, 그림자, 반응형 브레이크포인트를 정의한다. 트리거: 디자인 토큰, CSS 변수, 컬러 시스템, 타이포그래피 스케일, 디자인 시스템 구축"
---

# Design Token System — CSS 디자인 토큰 설계

## 워크플로우

### 1. 브랜드 분석
기존 브랜드 에셋에서 기본 값을 추출한다:
- `logo.svg` → 주색 #115E59(teal-800), 보조색 #2DD4BF(teal-300)
- `<meta name="theme-color" content="#0f766e">` → teal-700
- 기존 `site.css`의 색상/서체 사용 패턴

### 2. 컬러 팔레트 설계

```css
:root {
  /* ── Primary (Teal) ── */
  --color-primary-50:  /* 가장 밝은 tint */;
  --color-primary-100: ;
  --color-primary-200: ;
  --color-primary-300: #2DD4BF;  /* accent, 로고 그라데이션 끝 */
  --color-primary-400: ;
  --color-primary-500: ;         /* 기본 primary */
  --color-primary-600: #0f766e;  /* theme-color */
  --color-primary-700: ;
  --color-primary-800: #115E59;  /* 로고 그라데이션 시작 */
  --color-primary-900: ;         /* 가장 어두운 shade */

  /* ── Neutral ── */
  --color-neutral-50 ~ 900: /* 따뜻한 그레이 (공공기관 신뢰감) */;

  /* ── Semantic ── */
  --color-success: ;
  --color-warning: ;
  --color-error: ;
  --color-info: ;

  /* ── Surface ── */
  --color-surface-default: ;     /* 페이지 배경 */
  --color-surface-elevated: ;    /* 카드/팝업 */
  --color-surface-sunken: ;      /* 인셋 영역 */

  /* ── Text ── */
  --color-text-primary: ;        /* 본문 */
  --color-text-secondary: ;      /* 보조 텍스트 */
  --color-text-muted: ;          /* 비활성 */
  --color-text-inverse: ;        /* 어두운 배경 위 텍스트 */
}
```

**컬러 설계 원칙:**
- teal 계열을 주색으로 — 신뢰, 안정, 교육의 의미
- 따뜻한 뉴트럴(warm gray) — 차가운 느낌 방지, 친근함
- WCAG AA 명암비 4.5:1 이상 필수 확인
- 보라색, 과도한 네온, 어두운 배경 편향 금지

### 3. 타이포그래피 설계

```css
:root {
  /* ── Font Family ── */
  --font-heading: ;              /* 한글 + 영문 헤딩 서체 (예: Pretendard, Noto Sans KR 등) */
  --font-body: ;                 /* 본문 서체 */

  /* ── Font Size (최소 16px, 접근성 기본 18px) ── */
  --text-xs:   0.875rem;         /* 14px — 캡션, 각주 */
  --text-sm:   1rem;             /* 16px — 보조 텍스트 */
  --text-base: 1.125rem;         /* 18px — 본문 기본 (접근성) */
  --text-lg:   1.25rem;          /* 20px */
  --text-xl:   1.5rem;           /* 24px */
  --text-2xl:  1.875rem;         /* 30px */
  --text-3xl:  2.25rem;          /* 36px */
  --text-4xl:  3rem;             /* 48px — 히어로 헤드라인 */

  /* ── Font Weight ── */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* ── Line Height ── */
  --leading-tight:   1.25;
  --leading-normal:  1.6;
  --leading-relaxed: 1.8;

  /* ── Letter Spacing ── */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.02em;
}
```

**타이포그래피 원칙:**
- 한글 최적화 서체 필수 (Pretendard, Noto Sans KR, Wanted Sans 등)
- Inter, Roboto, Arial, system 기본 스택 사용 금지
- 본문 최소 18px — 노인·외국인 접근성
- 헤딩은 표현적이고 명확한 계층 구조

### 4. 스페이싱 & 레이아웃

```css
:root {
  /* ── Spacing (4px base) ── */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* ── Border Radius ── */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-full: 9999px;

  /* ── Shadow ── */
  --shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg:  0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl:  0 20px 25px rgba(0,0,0,0.1);

  /* ── Container ── */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1200px;

  /* ── Breakpoints (참조용) ── */
  /* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
}
```

### 5. 모션

```css
:root {
  --duration-fast:   150ms;
  --duration-normal: 300ms;
  --duration-slow:   500ms;
  --easing-default:  cubic-bezier(0.4, 0, 0.2, 1);
  --easing-in:       cubic-bezier(0.4, 0, 1, 1);
  --easing-out:      cubic-bezier(0, 0, 0.2, 1);
  --easing-bounce:   cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 6. 검증
- 모든 컬러 조합의 WCAG AA 명암비 확인
- 모바일(360px)에서 타이포 스케일 가독성 확인
- 기존 브랜드 에셋(logo.svg, theme-color)과 일관성 확인

## 도구 사용법
- **Read**: 기존 site.css, logo.svg, backup/ 파일 분석
- **Write**: `docs/design-tokens.css` 토큰 파일 생성
- **Write**: `docs/design-guide.md` 사용 가이드 생성
- **WebSearch**: 서체 후보 조사, 컬러 접근성 도구 참조

## 출력 규칙
- `docs/design-tokens.css` — 순수 CSS Custom Properties 파일 (즉시 import 가능)
- `docs/design-guide.md` — 토큰 사용법, 컬러 조합 예시, 컴포넌트 패턴
- 모든 토큰에 주석으로 용도 설명 포함
- 명암비 검증 결과 포함

## 에러 처리
- 브랜드 컬러 충돌 시: 기존 로고/theme-color 기준으로 조정
- 서체 로딩 실패 대비: fallback 서체 체인 필수 포함
- 접근성 기준 미달 시: 대비가 높은 대체 컬러 제안
