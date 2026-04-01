---
name: lms-web-orchestrator
description: "k-tomorrow LMS 홍보 사이트 에이전트 팀 오케스트레이터. strategy-agent, design-agent, production-agent, quality-agent를 조율하여 공공기관 대상 LMS 랜딩페이지를 제작한다. 'LMS 사이트 만들어줘', '랜딩페이지 제작', '홍보 사이트 시작', '팀 실행', '워크플로우 시작' 요청 시 사용."
---

# k-tomorrow LMS Web Orchestrator

k-tomorrow LMS 홍보 사이트의 에이전트 팀을 조율하여 공공기관 대상 접근성 강화 랜딩페이지를 제작한다.

## 팀 구성

| 에이전트 | 역할 | 사용 스킬 | 호출 조건 |
|---------|------|----------|----------|
| `strategy-agent` | 리서치 & 전략 총괄 | `site-research`, `creative-direction`, `ux-strategy`, `conversion-optimization` | 항상 (Phase 1) |
| `design-agent` | 디자인 시스템 & 비주얼 | `design-system`, `visual-design`, `component-architecture` | 항상 (Phase 2) |
| `production-agent` | 카피 & HTML & 성능 | `korean-copywriting`, `html-development`, `performance-optimization` | 항상 (Phase 3) |
| `quality-agent` | 신뢰성 & 디자인 & 접근성 감사 | `trust-review`, `design-audit`, `accessibility-audit` | 항상 (Phase 4) |

## 실행 워크플로우

### Phase 1: Strategy & Research (파이프라인 + 팬아웃)

실행 방식: 순차 → 병렬 → 순차
에이전트: `strategy-agent`

**Step 1**: `site-research` 실행
- 기존 벤치마크 데이터 확인 (docs/benchmark-report.md)
- 없거나 업데이트 필요 시: 공공기관/LMS 사이트 벤치마킹 수행
- 산출물: docs/benchmark-report.md

**Step 2**: `creative-direction` + `ux-strategy` 병렬 실행
- creative-direction: Horizon 팔레트 기반 크리에이티브 브리프 작성
- ux-strategy: 접근성 퍼스트 페이지 구조 설계
- 산출물: docs/creative-brief.md, docs/ux-strategy.md

**Step 3**: `conversion-optimization` 실행
- B2G 전환 퍼널 + CTA 전략 확정
- 산출물: docs/conversion-strategy.md

완료 조건: 4개 전략 문서 모두 생성됨

### Phase 2: Design System (팬아웃 + 파이프라인)

실행 방식: 병렬 → 순차
에이전트: `design-agent`
의존: Phase 1 완료

전달 데이터:
- Phase 1의 creative-brief → design-agent
- Phase 1의 ux-strategy (페이지 구조 맵) → design-agent
- Phase 1의 benchmark-report (디자인 인사이트) → design-agent

**Step 1**: `design-system` + `visual-design` 병렬 실행
- design-system: CSS 변수 기반 디자인 토큰 + 시니어 모드 토큰 정의
- visual-design: 색상 팔레트, 타이포, 레이아웃, 아크 모티프 설계
- 산출물: docs/design-tokens.md, docs/visual-design.md

**Step 2**: `component-architecture` 실행
- design-system + visual-design 결과를 통합하여 컴포넌트 스펙 정의
- 산출물: docs/component-specs.md

완료 조건: 3개 디자인 문서 모두 생성됨

### Phase 3: Production (파이프라인)

실행 방식: 순차
에이전트: `production-agent`
의존: Phase 1 + Phase 2 완료

전달 데이터:
- Phase 1의 conversion-strategy → korean-copywriting
- Phase 1의 creative-brief + ux-strategy → korean-copywriting
- Phase 2의 component-specs + design-tokens → html-development

**Step 1**: `korean-copywriting` 실행
- 공공기관 톤앤매너 섹션별 카피 작성
- 산출물: docs/copy-content.md

**Step 2**: `html-development` 실행
- 카피 + 디자인 스펙 기반 단일 HTML 파일 구현
- 산출물: index.html

**Step 3**: `performance-optimization` 실행
- Lighthouse 감사 + 성능/접근성 최적화
- 산출물: 최적화된 index.html + docs/lighthouse-report.md

완료 조건: index.html 생성 + Lighthouse 점수 보고

### Phase 4: Quality Assurance (팬아웃 + 생성-검증 루프)

실행 방식: 병렬 → 수정 루프
에이전트: `quality-agent` ↔ `production-agent`
의존: Phase 3 완료

전달 데이터:
- Phase 3의 index.html → quality-agent

**Step 1**: 3개 감사 병렬 실행
- `trust-review`: 공공기관 신뢰성 검증
- `design-audit`: AI 안티패턴 + 디자인 품질 감사
- `accessibility-audit`: WCAG 2.2 AA + 시니어 모드 검증
- 산출물: docs/trust-review-report.md, docs/design-audit-report.md, docs/accessibility-audit-report.md

**Step 2**: 감사 결과 통합 → 수정 필요 여부 판단
- P0/P1 이슈가 있으면: production-agent에 수정 지시서 전달
- P0/P1 이슈가 없으면: 최종 승인

**Step 3** (조건부): 수정 루프 (최대 2회)
- production-agent가 수정 지시 기반으로 index.html 수정
- quality-agent가 수정된 HTML 재감사
- 2회 초과 시: 잔여 이슈와 함께 사용자에게 보고

완료 조건: 모든 P0/P1 이슈 해소 또는 2회 루프 완료

## 데이터 흐름도

```
[strategy(site-research)]           ──{벤치마크 리포트}──────→  [strategy(creative-direction)]
                                                              + [strategy(ux-strategy)]        [병렬]
[strategy(creative-direction)]      ──{크리에이티브 브리프}──→  [strategy(conversion-optimization)]
[strategy(ux-strategy)]             ──{페이지 구조}─────────→  [strategy(conversion-optimization)]
[strategy(conversion-optimization)] ──{전환 퍼널}──────────→  [production(korean-copywriting)]

[strategy 전체 산출물]              ──{전략 브리프}─────────→  [design(design-system)]
                                                              + [design(visual-design)]         [병렬]
[design(design-system)]             ──{디자인 토큰}────────→  [design(component-architecture)]
[design(visual-design)]             ──{비주얼 시스템}───────→  [design(component-architecture)]
[design(component-architecture)]    ──{컴포넌트 스펙}───────→  [production(html-development)]

[production(korean-copywriting)]    ──{섹션별 카피}────────→  [production(html-development)]
[production(html-development)]      ──{완성 HTML}─────────→  [production(performance-optimization)]
[production(performance-optimization)] ──{최적화 HTML}──────→  [quality(trust-review)]
                                                              + [quality(design-audit)]          [병렬]
                                                              + [quality(accessibility-audit)]

[quality 감사 통합]                 ──{수정 지시서}────────→  [production-agent] (수정 루프, 최대 2회)
[quality 최종 승인]                 ──{승인 리포트}────────→  사용자
```

## 시나리오별 실행 구성

### 전체 실행
모든 Phase를 순서대로 실행. 기본 모드.
```
사용자: "LMS 홍보 사이트 만들어줘" / "팀 전체 실행"
→ Phase 1 → Phase 2 → Phase 3 → Phase 4
```

### 전략만 실행
Phase 1만 실행. 전략 문서만 필요할 때.
```
사용자: "전략만 먼저 세워줘" / "벤치마킹하고 브리프 작성해줘"
→ Phase 1만 실행
```

### 디자인 + 프로덕션 실행
Phase 1 산출물이 이미 존재할 때, Phase 2~3만 실행.
```
사용자: "디자인하고 HTML 만들어줘"
→ docs/creative-brief.md, docs/ux-strategy.md 존재 확인 → Phase 2 → Phase 3
```

### 품질 감사만 실행
Phase 3 산출물(index.html)이 이미 존재할 때, Phase 4만 실행.
```
사용자: "품질 검사해줘" / "접근성 감사해줘" / "신뢰성 검증해줘"
→ index.html 존재 확인 → Phase 4
```

### 단일 에이전트 실행
특정 에이전트만 직접 호출. 오케스트레이터를 거치지 않음.
```
사용자: "카피만 다시 작성해줘" → production-agent(korean-copywriting)
사용자: "디자인 토큰 수정해줘" → design-agent(design-system)
```

## 에러 핸들링

| 상황 | 대응 전략 |
|------|----------|
| 에이전트가 "failed" 반환 | 동일 에이전트 1회 재시도. 재실패 시 사용자에게 보고 |
| 에이전트가 "needs_review" 반환 | issues를 해당 에이전트에 전달하여 수정 요청 (최대 2회) |
| Phase 간 산출물 누락 | 누락된 산출물의 원인 Phase를 재실행 |
| quality-agent 수정 루프 2회 초과 | 잔여 이슈 목록과 함께 사용자에게 보고, 수동 개입 요청 |
| 토큰 한계로 HTML 미완성 | `[PAUSED]` 지점부터 이어서 구현 (html-development 재호출) |
| 벤치마크 데이터 오래됨 | site-research 재실행 또는 기존 데이터 활용 여부 사용자에게 확인 |

## 최종 산출물

오케스트레이터가 모든 Phase 완료 후 사용자에게 제공:

### 전략 문서 (Phase 1)
- `docs/benchmark-report.md` — LMS/공공기관 벤치마킹 분석
- `docs/creative-brief.md` — 크리에이티브 브리프
- `docs/ux-strategy.md` — UX 전략 (페이지 구조, 유저 플로우)
- `docs/conversion-strategy.md` — B2G 전환 전략

### 디자인 문서 (Phase 2)
- `docs/design-tokens.md` — CSS 변수 기반 디자인 토큰
- `docs/visual-design.md` — 비주얼 디자인 시스템
- `docs/component-specs.md` — 컴포넌트 스펙시트

### 프로덕션 산출물 (Phase 3)
- `docs/copy-content.md` — 섹션별 한국어 카피
- `index.html` — 완성된 랜딩페이지
- `docs/lighthouse-report.md` — 성능/접근성 보고서

### 감사 리포트 (Phase 4)
- `docs/trust-review-report.md` — 신뢰성 감사
- `docs/design-audit-report.md` — 디자인 감사
- `docs/accessibility-audit-report.md` — 접근성 감사

### 실행 요약
- 각 에이전트의 status
- 발견된 issues 총합
- 최종 점수: 신뢰성 / 디자인 품질 / 접근성
