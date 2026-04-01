---
name: html-development
description: "LMS 홍보 사이트의 HTML 개발 스킬. 단일 HTML 파일로 완전한 랜딩페이지를 구현한다. Tailwind CSS CDN, Pretendard 폰트, 시맨틱 HTML, ARIA 속성, 시니어 모드 토글, 14개 언어 UI를 포함한다. 'HTML 구현', '페이지 빌드', '코딩', '퍼블리싱', '프론트엔드 구현' 요청 시 사용."
---

# HTML Development — 단일 HTML 랜딩페이지 구현

## 워크플로우

1. **HTML 구조 설계** — 시맨틱 마크업
   ```html
   <!DOCTYPE html>
   <html lang="ko" data-mode="normal">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>k-tomorrow LMS — 다중 기관 접근성 강화 학습 관리 시스템</title>
     <!-- SEO 메타 -->
     <!-- OG 메타 -->
     <!-- Tailwind CDN -->
     <!-- Pretendard 폰트 -->
     <!-- CSS Custom Properties (디자인 토큰) -->
   </head>
   <body>
     <a href="#main" class="sr-only focus:not-sr-only">본문 바로가기</a>
     <header><!-- Navigation --></header>
     <main id="main">
       <section id="hero"><!-- Hero --></section>
       <section id="trust"><!-- Trust Strip --></section>
       <section id="features"><!-- Features --></section>
       <section id="accessibility"><!-- Accessibility Showcase --></section>
       <section id="testimonials"><!-- Testimonials --></section>
       <section id="cta"><!-- CTA Section --></section>
     </main>
     <footer><!-- Footer --></footer>
     <!-- JavaScript -->
   </body>
   </html>
   ```

2. **CDN 의존성** (최대 5개)
   - Tailwind CSS CDN (필수)
   - Pretendard 폰트 CDN (필수)
   - 영문 디스플레이 폰트 CDN (선택)
   - Iconify (선택 — 아이콘 필요 시)

3. **CSS Custom Properties 임베드** — design-system 스킬의 토큰을 `<style>` 태그에 포함

4. **섹션별 구현** — component-architecture 스펙 준수
   - 각 섹션의 레이아웃, 색상, 타이포, 간격을 디자인 토큰으로 제어
   - 인접 섹션은 서로 다른 레이아웃 패턴 사용
   - 아크 모티프를 섹션 구분자/배경에 적용

5. **접근성 구현**
   - Skip Navigation 링크
   - 모든 이미지에 `alt` 속성
   - 모든 인터랙티브 요소에 `aria-label`
   - 키보드 네비게이션 (`tabindex`, `:focus-visible` 스타일)
   - 시맨틱 HTML 태그 (header, nav, main, section, article, footer)
   - 적절한 heading 계층 (h1 → h2 → h3, 건너뛰기 금지)

6. **시니어 모드 JavaScript**
   ```javascript
   // 시니어 모드 토글
   // localStorage 저장/복원
   // data-mode 속성 전환
   ```

7. **언어 선택 UI** — 14개 언어 드롭다운 (기능적 UI, 실제 번역은 범위 외)

8. **모션 구현** — 최소한의 모션만
   - `IntersectionObserver` 기반 fade-in (scroll 이벤트 리스너 금지)
   - `prefers-reduced-motion` 미디어 쿼리로 모션 비활성화
   - 트랜지션: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1)` (Supanova 시그니처)
   - GPU-safe 애니메이션만: `transform` + `opacity`

## 도구 사용법

- `Read`: docs/component-specs.md, docs/design-tokens.md, docs/copy-content.md, docs/visual-design.md
- `Write`: HTML 파일을 프로젝트 루트에 저장 (index.html)
- `Bash`: Lighthouse CLI로 성능·접근성 검증 (가능한 경우)

## 출력 규칙

- 산출물: `index.html` (프로젝트 루트)
- `<!DOCTYPE html>`부터 `</html>`까지 완전한 단일 파일
- 플레이스홀더, 스켈레톤, `<!-- ... -->`, `// ...` 생략 패턴 절대 금지
- 최소 8개 섹션: Nav + Hero + Trust Strip + Features + Accessibility + Testimonials + CTA + Footer
- 토큰 한계 접근 시 `</section>` 단위로 중단 후 `[PAUSED]` 마커
- 파일 크기 목표: 50KB 이하 (이미지 제외)

## 에러 처리

- CDN 로드 실패 대비: `<noscript>` 폴백 스타일
- 폰트 로드 실패 대비: 시스템 폰트 폴백 스택
- 토큰 한계 도달 시: 깨끗한 중단점에서 `[PAUSED]` 후 다음 호출에서 이어서 구현
