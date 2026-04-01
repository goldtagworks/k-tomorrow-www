---
name: visual-design
description: "LMS 홍보 사이트의 비주얼 디자인 스킬. 공공 신뢰 색상 팔레트, 접근성 타이포그래피 시스템, 레이아웃 그리드, 섹션별 아크 모티프를 설계한다. '비주얼 디자인', '색상 팔레트', '타이포그래피', '레이아웃 그리드', '아크 모티프', '시각 디자인' 요청 시 사용."
---

# Visual Design — 공공 신뢰 비주얼 시스템

## 워크플로우

1. **색상 시스템 확정** — Horizon 팔레트 기반
   - 베이스 뉴트럴: 웜 화이트 (#FAFAF8 ~ #F5F5F0) + 소프트 그레이 (#E5E5E0 ~ #94948E)
   - 1개 액센트 컬러: 공공 신뢰 블루 또는 따뜻한 앰버 (채도 < 80%)
   - 섹션별 배경색 변주: 밝은↔어두운 리듬
   - warm/cool gray 혼용 금지
   - 순수 #000000 금지 → `#0a0a0a` 또는 `#1a1a1a` 사용
   - 모든 조합에 WCAG AA 대비비 4.5:1 검증

2. **타이포그래피 시스템 확정**
   - 한국어: Pretendard 필수
     - 헤드라인: `font-bold tracking-tight leading-tight`
     - 본문: `text-base md:text-lg leading-relaxed max-w-[65ch]`
     - `word-break: keep-all` 필수 (한국어 줄바꿈)
   - 영문 디스플레이: Outfit 또는 Cabinet Grotesk
   - 폰트 스택: `'Pretendard', '{English Font}', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`
   - 금지 폰트: Inter, Noto Sans KR, Roboto, Arial, Open Sans, Helvetica, Malgun Gothic
   - 시니어 모드: 본문 20px+, 헤드라인 28px+

3. **레이아웃 그리드 정의**
   - 컨테이너: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
   - CSS Grid 우선 사용
   - DESIGN_VARIANCE 5~6: Split Screen / 비대칭 여백 혼용
   - 인접 섹션은 반드시 서로 다른 레이아웃 패턴

4. **아크 모티프 설계** — 섹션별 고유 시각 패턴
   - Hero: 큰 아크(반원) 배경 장식
   - Trust Strip: 수평 아크 구분선
   - Features: 카드 모서리에 미세한 아크 곡선
   - CTA Section: 전체 배경 아크 웨이브
   - 아크 모티프는 CSS `border-radius`, `clip-path`, SVG로 구현

5. **머티리얼리티** — 공공기관에 적합한 수준
   - Glass Effect: 절제된 사용 (네비게이션, 모달에만)
   - 그림자: 부드러운 앰비언트 섀도 (`shadow-sm` ~ `shadow-md` 수준)
   - Grain Texture: 사용하지 않음 (공공기관 맥락에 부적합)
   - 그라디언트: 미세한 선형 그라디언트만 허용 (과도한 mesh gradient 금지)

## 도구 사용법

- `Read`: docs/creative-brief.md, docs/design-tokens.md 참조
- `Write`: 비주얼 디자인 문서를 docs/ 디렉토리에 저장

## 출력 규칙

- 산출물: `docs/visual-design.md`
- 포함 항목:
  - 색상 팔레트 (HEX + HSL + 대비비 검증)
  - 타이포 스케일 (일반 모드 + 시니어 모드)
  - 레이아웃 그리드 스펙
  - 아크 모티프 적용 맵 (섹션별)
  - 머티리얼리티 가이드
- gradient text 페이지당 최대 1개
- 카드 shadow는 배경 hue로 tint

## 에러 처리

- 색상 대비비 AA 미달: 자동으로 명도 조정 후 재검증
- 아크 모티프 과다 시: 섹션당 1개 아크 요소로 제한
