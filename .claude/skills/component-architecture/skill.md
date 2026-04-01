---
name: component-architecture
description: "LMS 홍보 사이트의 컴포넌트 아키텍처 스킬. 고대비 카드, 48px 터치 타겟 버튼, 공공기관 신뢰 요소 컴포넌트, 시니어 모드 대응 반응형 컴포넌트를 정의한다. '컴포넌트 설계', '카드 디자인', '버튼 스펙', 'UI 컴포넌트', '반응형 설계' 요청 시 사용."
---

# Component Architecture — 접근성 강화 컴포넌트 설계

## 워크플로우

1. **Trust Card 컴포넌트** — 공공기관 신뢰 요소용
   - 기관 로고 카드: `aspect-ratio: 3/2` + `object-fit: contain` + 소프트 보더
   - 실적 카운터 카드: 큰 숫자 (Hero 수준) + 설명 라벨 + 카운트업 애니메이션
   - 인증 마크 뱃지: `inline-flex gap-2 items-center` + 아이콘 + 텍스트
   - 추천사 카드: 인용문 + 실명 + 직함 + 기관명 (사진은 선택)

2. **Feature Card 컴포넌트** — LMS 기능 소개용
   - Bento Grid 카드: 다양한 span 크기 (`col-span-1`, `col-span-2`)
   - 아이콘 + 제목 + 설명 구조
   - 호버: `scale-[1.02]` + 섀도 증가 (시니어 모드에서 비활성)
   - 반응형: 모바일에서 모든 카드 `col-span-1`

3. **CTA Button 컴포넌트** — 접근성 강화
   - Primary: `rounded-xl px-8 py-4 text-lg font-semibold` + 액센트 배경
   - Secondary: `rounded-xl px-8 py-4 text-lg font-semibold` + 아웃라인
   - Tertiary: 텍스트 링크 + 밑줄 + 화살표 아이콘
   - 최소 터치 타겟: 48×48px (시니어 모드: 56×56px)
   - 호버: `scale-[1.02]`, Active: `scale-[0.98]`
   - Focus: `ring-2 ring-offset-2 ring-accent` (키보드 접근성)
   - 모든 CTA에 `aria-label` 포함

4. **Navigation 컴포넌트**
   - 데스크톱: 고정 상단 바 + 시니어 모드 토글 + 언어 선택 드롭다운
   - 모바일: 햄버거 → 풀스크린 오버레이 + 큰 메뉴 항목 (56px 높이)
   - 스크롤 시: `backdrop-blur-xl bg-white/80` (또는 테마에 맞는 반투명)
   - Skip Navigation: 페이지 최상단에 숨겨진 "본문 바로가기" 링크

5. **Language Selector 컴포넌트** — 14개 언어 대응
   - 드롭다운: 현재 언어 표시 + 클릭 시 14개 언어 목록
   - 국기 아이콘 없이 텍스트만 (한국어/Korean, English, Tiếng Việt...)
   - `aria-expanded`, `aria-haspopup` 속성 필수

6. **Senior Mode Toggle 컴포넌트**
   - 접근성 아이콘 (눈 또는 A+ 아이콘) + "크게 보기" 라벨
   - 클릭 시 `document.documentElement.dataset.mode = 'senior'` 토글
   - localStorage에 설정 저장

7. **반응형 붕괴 규칙**
   - `md:` 이상의 비대칭 레이아웃 → `768px` 미만에서 `w-full px-4 py-8`
   - `min-h-[100dvh]` 사용 (`h-screen` 금지 — iOS Safari 호환)
   - 모든 `col-span` → 모바일에서 `col-span-1` 리셋

## 도구 사용법

- `Read`: docs/visual-design.md, docs/design-tokens.md 참조
- `Write`: 컴포넌트 스펙시트를 docs/ 디렉토리에 저장

## 출력 규칙

- 산출물: `docs/component-specs.md`
- 각 컴포넌트에 포함: HTML 구조 + CSS 클래스 + ARIA 속성 + 반응형 규칙
- 일반 모드 / 시니어 모드 비교 스펙 포함
- 모든 인터랙티브 요소에 키보드 네비게이션 스펙 포함

## 에러 처리

- 터치 타겟 48px 미만 발견 시: 즉시 패딩 조정
- ARIA 속성 누락 시: 해당 컴포넌트에 필수 ARIA 추가
