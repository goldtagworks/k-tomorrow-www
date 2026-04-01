---
name: design-system
description: "LMS 홍보 사이트의 디자인 시스템 설계 스킬. CSS Custom Properties 기반 디자인 토큰, 시니어 모드/일반 모드 전환 변수, 반응형 브레이크포인트, 공공 신뢰 색상 체계를 정의한다. '디자인 토큰', 'CSS 변수', '시니어 모드', '디자인 시스템', '테마 설계' 요청 시 사용."
---

# Design System — CSS 변수 기반 디자인 토큰

## 워크플로우

1. **색상 토큰 정의** — Horizon 팔레트 기반 CSS Custom Properties
   ```
   :root {
     /* Base Neutrals */
     --color-bg-primary: ...;
     --color-bg-secondary: ...;
     --color-bg-accent: ...;
     
     /* Text */
     --color-text-primary: ...;
     --color-text-secondary: ...;
     --color-text-muted: ...;
     
     /* Accent (공공 신뢰 블루 or 따뜻한 앰버) */
     --color-accent: ...;
     --color-accent-hover: ...;
     --color-accent-subtle: ...;
     
     /* Trust Elements */
     --color-trust-bg: ...;
     --color-trust-border: ...;
     
     /* Status */
     --color-success: ...;
     --color-warning: ...;
     --color-error: ...;
   }
   ```

2. **시니어 모드 토큰** — `[data-mode="senior"]` 선택자로 오버라이드
   ```
   [data-mode="senior"] {
     --font-size-base: 20px;     /* 일반: 16px → 시니어: 20px */
     --font-size-lg: 24px;       /* 일반: 18px → 시니어: 24px */
     --font-size-heading: 32px;  /* 일반: 24px → 시니어: 32px */
     --spacing-button-y: 16px;   /* 버튼 패딩 증가 */
     --spacing-button-x: 24px;
     --min-touch-target: 56px;   /* 일반: 48px → 시니어: 56px */
     /* 대비비 AAA 수준 (7:1) */
     --color-text-primary: ...;
     --color-bg-primary: ...;
   }
   ```

3. **타이포그래피 토큰**
   ```
   :root {
     --font-family-body: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
     --font-family-display: '{Display Font}', var(--font-family-body);
     --font-size-xs: 12px;
     --font-size-sm: 14px;
     --font-size-base: 16px;
     --font-size-lg: 18px;
     --font-size-xl: 20px;
     --font-size-2xl: 24px;
     --font-size-3xl: 30px;
     --font-size-4xl: 36px;
     --font-size-hero: clamp(2.5rem, 5vw, 4rem);
     --line-height-tight: 1.2;
     --line-height-snug: 1.375;
     --line-height-normal: 1.5;
     --line-height-relaxed: 1.75;
     --letter-spacing-tight: -0.02em;
   }
   ```

4. **스페이싱 토큰** — 8pt 그리드
   ```
   :root {
     --space-1: 4px;
     --space-2: 8px;
     --space-3: 12px;
     --space-4: 16px;
     --space-6: 24px;
     --space-8: 32px;
     --space-10: 40px;
     --space-12: 48px;
     --space-16: 64px;
     --space-20: 80px;
     --space-24: 96px;
     --section-padding-y: var(--space-24);
     --container-max-width: 1280px;
     --container-padding-x: var(--space-4);
   }
   ```

5. **반응형 브레이크포인트**
   ```
   /* Mobile First */
   --bp-sm: 640px;
   --bp-md: 768px;
   --bp-lg: 1024px;
   --bp-xl: 1280px;
   ```

6. **접근성 유틸리티**
   ```
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   
   @media (prefers-contrast: high) {
     :root { /* AAA 대비비 적용 */ }
   }
   ```

## 도구 사용법

- `Read`: docs/creative-brief.md 참조하여 Horizon 팔레트 상세 확인
- `Write`: 디자인 토큰 문서를 docs/ 디렉토리에 저장

## 출력 규칙

- 산출물: `docs/design-tokens.md` + 실제 CSS 변수 코드
- 모든 색상 조합에 대비비 검증 결과 포함 (AA: 4.5:1, AAA: 7:1)
- 시니어 모드/일반 모드 토큰 비교 테이블 포함
- 토큰 네이밍 규칙: `--{category}-{property}-{variant}` (예: `--color-text-primary`)

## 에러 처리

- 색상 대비비 미달 시: 자동으로 명도 조정하여 AA 기준 충족
- Horizon 팔레트 정보 부족 시: 벤치마크 리포트의 공공기관 색상 패턴 기반으로 제안
