---
name: page-builder
description: "단일 HTML/CSS/JS 페이지 구현 스킬. 디자인 토큰 기반으로 정적 웹 페이지를 빌드한다. React, npm, 빌드 도구 없이 순수 HTML/CSS/바닐라 JS만 사용. 트리거: 페이지 구현, HTML 작성, CSS 스타일링, 반응형 구현, 인터랙션 구현, 섹션 추가, 마크업"
---

# Page Builder — 단일 HTML/CSS/JS 페이지 구현

## 워크플로우

### 1. 사전 확인
구현 전 반드시 확인:
- `docs/design-tokens.css` 또는 site.css 내 토큰 정의 확인
- `docs/design-guide.md` 컴포넌트 패턴 확인
- `backup/` 기존 구현 참조 (구조, 콘텐츠, 메타 정보)
- `logo.svg`, `favicon.ico`, `og-image.svg` 에셋 존재 확인
- `wrangler.jsonc` 배포 설정 확인 (루트 디렉토리 기준)

### 2. HTML 구조 작성
시맨틱 HTML5 기본 구조:

```html
<!doctype html>
<html lang="ko">
<head>
  <!-- 메타, OG, 구조화 데이터, CSS 링크 -->
</head>
<body>
  <a class="skip-link" href="#main">본문으로 건너뛰기</a>
  <header><!-- 네비게이션 --></header>
  <main id="main">
    <section id="hero"><!-- 히어로 --></section>
    <section id="..."><!-- 각 섹션 --></section>
  </main>
  <footer><!-- 푸터 --></footer>
  <!-- JS (프로그레시브 인핸스먼트) -->
</body>
</html>
```

### 3. 섹션별 구현
K-Tomorrow 사이트 기본 섹션 구성:

| 순서 | 섹션 | 역할 |
|------|------|------|
| 1 | Header/Nav | 브랜드 로고 + 메뉴 + CTA |
| 2 | Hero | 브랜드 + 헤드라인 + 서브카피 + CTA + 비주얼 |
| 3 | 다문화 지원 서비스 | 다문화 가족 지원 소개 |
| 4 | LMS 플랫폼 소개 | 교육 운영 플랫폼 기능 소개 |
| 5 | 특장점/차별점 | 접근성, 다국어, 다중기관 등 핵심 가치 |
| 6 | 도입 절차 | 문의 → 상담 → 커스터마이징 → 운영 |
| 7 | 신뢰 요소 | 파트너, 실적, 인증 등 |
| 8 | 소개/문의 | 회사 소개 + 연락처 + CTA |
| 9 | Footer | 법적 고지, 링크, 연락처 |

### 4. CSS 구현
```css
/* 1. 디자인 토큰 (또는 import) */
:root { /* --token-name: value; */ }

/* 2. Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; }

/* 3. 타이포그래피 */
body { font-family: var(--font-body); font-size: var(--text-base); }

/* 4. 레이아웃 */
.shell { max-width: var(--container-xl); margin: 0 auto; padding: 0 var(--space-6); }

/* 5. 컴포넌트 */
/* 섹션별 스타일 */

/* 6. 반응형 (모바일 퍼스트) */
@media (min-width: 768px) { }
@media (min-width: 1024px) { }

/* 7. 모션 */
@media (prefers-reduced-motion: no-preference) {
  .reveal-up { /* scroll animation */ }
}
```

### 5. JS 인터랙션
바닐라 JS로 구현할 인터랙션:

- **모바일 메뉴 토글**: 햄버거 메뉴 열기/닫기
- **스크롤 리빌 애니메이션**: IntersectionObserver 기반 요소 등장
- **스무스 스크롤**: 앵커 링크 부드러운 이동
- **헤더 스크롤 효과**: 스크롤 시 헤더 배경 변경
- **prefers-reduced-motion 존중**: 모션 감소 설정 시 애니메이션 비활성화

```javascript
// 프로그레시브 인핸스먼트: JS 로드 후에만 실행
document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver for scroll reveal
  // Mobile menu toggle
  // Smooth scroll for anchor links
});
```

### 6. 성능 & SEO 확인
- `<meta>` 태그 완비 (description, OG, Twitter Card)
- 구조화 데이터 (JSON-LD) 포함
- 이미지 lazy loading (loading="lazy")
- Critical CSS 인라인 고려
- `<noscript>` 폴백

## 도구 사용법
- **Read**: 기존 파일 참조 (backup/, docs/, logo.svg 등)
- **Write**: 새 index.html, site.css 생성
- **Edit**: 기존 파일 수정
- **Bash**: 파일 존재 확인, 디렉토리 구조 확인

## 출력 규칙
- `index.html` — 단일 HTML 파일 (루트 디렉토리)
- `site.css` — 스타일시트 (루트 디렉토리)
- 디자인 토큰은 site.css 상단 `:root` 블록에 포함
- 모든 색상/크기/간격은 `var(--token)` 사용 — 하드코딩 금지
- HTML 유효성 주요 에러 없음
- 모바일(360px) ~ 데스크톱(1440px) 정상 표시

## 에러 처리
- 디자인 토큰 미정의 시: design-system-architect에게 요청 또는 임시 값 사용 후 주석 표시
- 이미지 에셋 부재 시: SVG 인라인 또는 CSS 그라데이션으로 대체, 주석으로 교체 필요 명시
- 외부 폰트 로딩 실패 대비: fallback 서체 체인 필수
