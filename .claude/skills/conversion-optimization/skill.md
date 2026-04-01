---
name: conversion-optimization
description: "LMS 홍보 사이트의 B2G 전환 최적화 스킬. 기관 도입 문의 퍼널, 제안서 다운로드, 데모 체험 CTA 전략, 신뢰 요소 배치를 설계한다. '전환 최적화', 'CTA 전략', 'B2G 전환', '도입 문의 퍼널', '리드 생성', '전환율' 요청 시 사용."
---

# Conversion Optimization — B2G 전환 최적화

## 워크플로우

1. **B2G 전환 퍼널 설계** — 기관 의사결정자의 전환 경로
   - Primary CTA: "도입 문의하기" (이메일/전화 연결)
   - Secondary CTA: "제안서 다운로드" (PDF — 리드 캡처 없이 즉시 다운로드)
   - Tertiary CTA: "데모 체험하기" (데모 환경 접속)
   - 퍼널 단계: 인지(Hero) → 이해(Features) → 신뢰(Trust/Testimonials) → 전환(CTA Section)

2. **CTA 전략 확정**
   - CTA 카피 방향:
     - Primary: "도입 문의하기", "상담 신청하기" (직접적, 공공기관 톤)
     - Secondary: "제안서 받기", "소개자료 다운로드"
     - Tertiary: "무료 데모 체험", "3분 둘러보기"
   - CTA 배치:
     - Hero: Primary + Secondary
     - Features 섹션 후: Primary
     - 전용 CTA 섹션: Primary + Secondary + Tertiary (3단 경로)
     - Sticky Bottom (모바일): Primary
   - CTA 시각적 계층:
     - Primary: 강조 색상 + 큰 사이즈 (`px-8 py-4 text-lg`)
     - Secondary: 아웃라인 스타일
     - Tertiary: 텍스트 링크 스타일

3. **신뢰 요소 배치** — 공공기관 특화
   - 도입 기관 로고 월 (파트너 기관)
   - 실적 카운터: "도입 기관 수", "총 수강 완료율", "지원 언어 14개" (유기적 수치 사용)
   - 기관 담당자 추천사 (실명 + 직함 + 기관명)
   - 인증 마크: 웹접근성 인증, 개인정보보호 인증
   - 전화번호/이메일 직접 노출 (공공기관 신뢰의 핵심)

4. **긴급성/사회적 증거 요소** — 공공기관 맥락에 맞게
   - "현재 N개 기관이 사용 중" 실시간 카운터 (라운드 넘버 금지)
   - "2026년 상반기 도입 기관 모집 중" 시기 한정
   - 최근 도입 사례 타임라인

## 도구 사용법

- `Read`: docs/creative-brief.md, docs/ux-strategy.md, docs/benchmark-report.md 참조
- `Write`: 전환 전략 문서를 docs/ 디렉토리에 저장

## 출력 규칙

- 산출물: `docs/conversion-strategy.md`
- 포함 항목:
  - B2G 전환 퍼널 다이어그램
  - CTA 전략 (카피 + 배치 + 시각적 계층)
  - 신뢰 요소 배치 맵
  - 섹션별 설득 요소 매핑
- CTA 버튼 최소 `px-8 py-4 text-lg`, 모바일 탭 타겟 48px
- 라운드 넘버 금지, AI 클리셰 카피 금지

## 에러 처리

- 실적 데이터 부족 시: "출시 예정" 포지셔닝으로 전환, 기술 스펙 중심 신뢰 요소로 대체
- 파트너 로고가 없을 경우: "도입 예정 기관" 또는 기술 파트너 로고로 대체
