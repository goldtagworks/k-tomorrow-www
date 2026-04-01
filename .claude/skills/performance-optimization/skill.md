---
name: performance-optimization
description: "LMS 홍보 사이트의 성능 최적화 스킬. Lighthouse Performance 90+, Accessibility 90+, Best Practices 90+를 목표로 성능과 접근성을 동시에 최적화한다. '성능 최적화', 'Lighthouse', '로딩 속도', '성능 감사', '최적화' 요청 시 사용."
---

# Performance Optimization — 성능 & 접근성 최적화

## 워크플로우

1. **Lighthouse 감사 실행** — 4개 카테고리 점수 목표
   - Performance: 90+ (LCP < 2.5s, FID < 100ms, CLS < 0.1)
   - Accessibility: 90+ (WCAG 2.2 AA)
   - Best Practices: 90+
   - SEO: 90+

2. **성능 최적화 체크리스트**
   - [ ] 이미지 최적화: `loading="lazy"`, `width`/`height` 명시, WebP 형식 권장
   - [ ] 폰트 최적화: `font-display: swap`, preload 힌트
   - [ ] CSS 최적화: 사용하지 않는 Tailwind 클래스 제거 (또는 CDN JIT 모드)
   - [ ] JavaScript 최적화: `defer` 또는 `type="module"`, 인라인 스크립트 최소화
   - [ ] Critical CSS: Above-the-fold 스타일을 `<head>`에 인라인
   - [ ] 리소스 힌트: `<link rel="preconnect">`, `<link rel="dns-prefetch">`
   - [ ] CLS 방지: 이미지/비디오에 `aspect-ratio` 명시, 폰트 FOUT 방지

3. **접근성 최적화 체크리스트**
   - [ ] 색상 대비: 모든 텍스트-배경 조합 4.5:1 이상
   - [ ] 키보드 접근: 모든 인터랙티브 요소 `Tab` 키로 접근 가능
   - [ ] 포커스 표시: `:focus-visible` 스타일 명확히 보임
   - [ ] alt 속성: 모든 이미지에 의미 있는 대체 텍스트
   - [ ] ARIA: 동적 콘텐츠에 적절한 aria 속성
   - [ ] heading 계층: h1 → h2 → h3 순서 유지, 건너뛰기 없음
   - [ ] 랜드마크: header, nav, main, footer 시맨틱 태그 사용
   - [ ] 언어 속성: `<html lang="ko">`
   - [ ] 시니어 모드: `data-mode="senior"` 전환 시 모든 토큰 올바르게 적용

4. **SEO 체크리스트**
   - [ ] `<title>` 태그 (60자 이내)
   - [ ] `<meta name="description">` (160자 이내)
   - [ ] Open Graph 메타 태그
   - [ ] 구조화 데이터 (Organization, WebPage)
   - [ ] canonical URL

5. **결과 보고서 생성**

## 도구 사용법

- `Read`: index.html 읽어서 분석
- `Edit`: 최적화 수정 적용
- `Bash`: Lighthouse CLI 실행 (가능한 경우)

## 출력 규칙

- 산출물: 최적화된 `index.html` + `docs/lighthouse-report.md`
- 각 최적화 항목에 before/after 명시
- Lighthouse 점수 변화 기록
- 해결하지 못한 이슈가 있으면 원인과 대안 명시

## 에러 처리

- Lighthouse CLI 미설치 시: 수동 체크리스트 기반 검증으로 대체
- 성능 점수 90 미달 시: 병목 분석 → 상위 3개 개선점 우선 적용
- 접근성 점수 90 미달 시: axe-core 규칙 기반 이슈 나열 → 우선순위 순으로 수정
