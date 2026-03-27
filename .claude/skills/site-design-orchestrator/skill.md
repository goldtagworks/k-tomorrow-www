---
name: site-design-orchestrator
description: "K-Tomorrow 사이트 디자인 전체 워크플로우를 조율하는 오케스트레이터. 벤치마킹 → 디자인 토큰 → HTML/CSS 구현 → 신뢰성 검증의 파이프라인을 관리한다. 트리거: 사이트 디자인 전체 실행, 파이프라인 실행, 팀 실행, 전체 빌드, 처음부터 끝까지"
---

# Site Design Orchestrator — 팀 워크플로우 조율

K-Tomorrow 홍보 사이트의 디자인 시스템 분석·설계·구현·검증 파이프라인을 조율합니다.

## 팀 구성

| 에이전트 | 역할 | 사용 스킬 |
|---------|------|----------|
| **site-researcher** | 교육/공공 사이트 벤치마킹 | `lms-benchmark` |
| **design-system-architect** | 디자인 토큰 & 가이드 설계 | `design-token-system`, `frontend-rules` |
| **frontend-builder** | HTML/CSS/JS 페이지 구현 | `page-builder`, `frontend-rules` |
| **trust-reviewer** | 신뢰성·접근성 검증 | `trust-audit` |

## 실행 워크플로우

### Phase 1: 벤치마킹 (site-researcher)
```
입력: 분석 범위 & 포커스 영역
├── LMS 플랫폼 홍보 사이트 분석 (3+개)
├── 공공 교육 플랫폼 분석 (2+개)
├── 다문화/사회통합 기관 분석 (2+개)
└── 패턴 종합 & 디자인 방향 제안
출력: docs/benchmark-report.md
```

### Phase 2: 디자인 시스템 (design-system-architect)
```
입력: benchmark-report.md + 브랜드 에셋 (logo.svg, theme-color)
├── 컬러 팔레트 설계 (teal 기반 확장)
├── 타이포그래피 스케일 & 서체 선정
├── 스페이싱·그림자·반응형 토큰
├── 컴포넌트 패턴 가이드
└── WCAG AA 명암비 검증
출력: docs/design-tokens.css + docs/design-guide.md
```

### Phase 3: 페이지 구현 (frontend-builder)
```
입력: design-tokens.css + design-guide.md + backup/ (기존 콘텐츠 참조)
├── HTML5 시맨틱 구조 작성
├── CSS 스타일링 (토큰 기반)
├── 반응형 레이아웃 (모바일 퍼스트)
├── 바닐라 JS 인터랙션
└── SEO & 성능 최적화
출력: index.html + site.css
```

### Phase 4: 검증 (trust-reviewer)
```
입력: index.html + site.css
├── 신뢰성 감사 (T1~T6)
├── 접근성 감사 (A1~A7)
├── 프론트엔드 하드룰 감사 (F1~F8)
├── 기술 품질 감사 (D1~D4)
└── 이슈 리포트 작성
출력: docs/trust-review.md
```

### Phase 4.5: 수정 루프 (조건부)
```
trust-reviewer 결과가 "needs_fixes"인 경우:
├── Critical/Major 이슈 목록 → frontend-builder에게 전달
├── frontend-builder 수정 수행
├── trust-reviewer 재검증 (recheck)
└── 최대 2회 루프 후 사용자 확인 요청
```

## 데이터 흐름

```
site-researcher                    design-system-architect
     │                                      │
     │  docs/benchmark-report.md            │
     └────────────────────────────────────→  │
                                            │  docs/design-tokens.css
                                            │  docs/design-guide.md
                                            └────────────────────────→  frontend-builder
                                                                              │
                                  backup/ (기존 콘텐츠)  ─────────────────→   │
                                  logo.svg, favicon.ico  ─────────────────→   │
                                                                              │
                                                                              │  index.html
                                                                              │  site.css
                                                                              └──────────→  trust-reviewer
                                                                                                 │
                                                                              ←── 수정 요청 ─────┘
                                                                                    (루프)
```

## 시나리오별 구성

### A. 전체 실행 (처음부터 끝까지)
1. site-researcher 실행 → benchmark-report.md
2. design-system-architect 실행 → design-tokens.css + design-guide.md
3. frontend-builder 실행 → index.html + site.css
4. trust-reviewer 실행 → trust-review.md
5. 수정 루프 (필요 시)

### B. 디자인만 갱신 (벤치마킹 생략)
1. design-system-architect 실행 (기존 benchmark-report.md 참조)
2. frontend-builder 실행
3. trust-reviewer 실행

### C. 구현만 갱신 (디자인 유지)
1. frontend-builder 실행 (기존 토큰 유지)
2. trust-reviewer 실행

### D. 검증만 실행
1. trust-reviewer 실행 (기존 HTML/CSS 검증)

### E. 단일 에이전트 실행
- 각 에이전트를 개별 호출 가능
- 예: "벤치마킹만 다시 해줘" → site-researcher만 실행

## 에러 핸들링

| 실패 에이전트 | 대응 전략 |
|-------------|----------|
| site-researcher | 기존 backup/index.html의 구조를 참조하여 Phase 2로 진행 |
| design-system-architect | backup/site.css에서 기존 토큰을 추출하여 Phase 3로 진행 |
| frontend-builder | 이슈 리포트 생성 후 사용자에게 수동 개입 요청 |
| trust-reviewer | 기본 체크리스트 기반 셀프 검증 후 사용자 확인 요청 |

## 프로젝트 컨텍스트

- **사이트**: K-Tomorrow 홍보/회사 소개 사이트
- **도메인**: 다문화 가족 지원 + 교육 LMS 플랫폼
- **타겟**: 공공기관, 다문화센터, 노인, 외국인
- **핵심 가치**: 신뢰, 접근성, 전문성
- **기술 스택**: 순수 HTML/CSS/JS, Cloudflare Workers 배포
- **파일 구조**: 단일 페이지 (index.html + site.css)
- **브랜드 컬러**: teal (#115E59 ~ #2DD4BF)
- **기존 에셋**: logo.svg, favicon.ico, og-image.svg, privacy.html, terms.html
