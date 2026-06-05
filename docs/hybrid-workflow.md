# 하이브리드 워크플로우 전략

k-tomorrow LMS 홍보 사이트 제작 하네스를 **모델 주도 오케스트레이션**과 **결정적 다이나믹 워크플로우**의 하이브리드로 재구성한 설계 문서.

## 왜 하이브리드인가

기존 하네스는 `lms-web-orchestrator` 스킬이 자연어 프롬프트로 "이 순서대로 에이전트를 호출하라"고 지시하면, Claude가 매 실행마다 그 지시를 **해석해서** Agent를 호출하는 **모델 주도(model-driven)** 방식이었다.

| | 모델 주도 오케스트레이션 (기존) | 결정적 다이나믹 워크플로우 |
|---|---|---|
| 제어 흐름 | 모델이 매번 해석 | JS 스크립트로 코드화 |
| 단계 누락 | 가능 (모델이 잊을 수 있음) | 불가능 |
| 병렬 배리어 | 부정확할 수 있음 | `parallel()`/`pipeline()`로 정확 |
| 수정 루프 카운터 | 모델이 추론 (분실 위험) | 실제 `while` 카운터 |
| 구조화 출력 | 프롬프트 규약(깨질 수 있음) | 스키마 강제 검증 |
| 유연성·대화 | 강함 | 약함 (스크립트 고정) |
| 부분/단일 실행 | 자연스러움 | 인자 분기 필요 |

→ **결정적 실행이 유리한 다단계 빌드는 워크플로우로**, **유연성·대화가 필요한 단일 수정·질의는 모델 주도로** 나눈다. 양쪽의 강점만 취한다.

## 아키텍처: 라우터 + 엔진 분리

```
                    ┌─────────────────────────────────────┐
   사용자 요청  →   │  lms-web-orchestrator (라우터, 모델 주도) │
                    │  의도 판별 → 경로 선택                  │
                    └───────────────┬─────────────┬─────────┘
                       다단계 빌드   │             │  단일 수정·대화
                                    ▼             ▼
              ┌──────────────────────────┐   ┌────────────────────┐
              │ Workflow 엔진 (결정적)     │   │ 직접 Agent 호출      │
              │ .claude/workflows/        │   │ (대화 문맥 유지)     │
              │   lms-build.workflow.js   │   └────────────────────┘
              └────────────┬─────────────┘             │
                           │                            │
                           └──────────┬─────────────────┘
                                      ▼
              ┌──────────────────────────────────────────────┐
              │  공유 자산 (single source of truth)             │
              │  .claude/agents/  : strategy/design/production/quality │
              │  .claude/skills/  : 14개 도메인 스킬             │
              └──────────────────────────────────────────────┘
```

핵심: **에이전트 정의(.md)와 스킬(SKILL.md)은 단일 진실 공급원**이다. 워크플로우 엔진은 이들을 `agentType`으로 재사용하고, 라우터의 직접 호출도 동일 자산을 쓴다. 하이브리드로 바꿔도 도메인 지식은 한 곳에만 존재한다.

## 라우팅 규칙

| 요청 | 경로 | 호출 |
|---|---|---|
| 전체 빌드 | Workflow | `lms-build` (phases 전체) |
| 부분 다단계 (디자인+프로덕션 등) | Workflow | `lms-build` (phases 일부) |
| 품질 감사+수정 | Workflow | `lms-build` (`phases:['qa']`) |
| 단일 산출물 국소 수정 | 직접 Agent | 해당 에이전트 1회 |
| 질의·요약·방향 논의 | 직접 응답 | 대화형 |

판별 한 줄: **2단계 이상이 엮이거나 수정 루프가 필요하면 Workflow, 아니면 직접 Agent.**

## Workflow 엔진 구조 (`lms-build`)

```
Phase 1 Strategy   : site-research → (creative-direction ∥ ux-strategy) → conversion-optimization
Phase 2 Design     : (design-system ∥ visual-design) → component-architecture
Phase 3 Production : korean-copywriting → html-development → performance-optimization   [순차 파이프라인]
Phase 4 QA         : (trust-review ∥ design-audit ∥ accessibility-audit)
                     → P0/P1 집계 → 이슈 리포트  [기본 maxRevisions=0: 1회 감사, 자동 수정 없음]
                     → (옵션) maxRevisions>0 일 때만 production-agent 수정 → 재감사 루프
```

> **검증은 비례한다.** 단일 HTML 랜딩페이지에 감사→수정→재감사 다회 루프는 과하다.
> 기본은 **1회 감사 + 리포트**. 수정이 필요하면 사용자가 `maxRevisions`로 명시 요청한다.
> QA 단계 자체도 `phases`에서 빼면 건너뛴다.

- **구조화 출력**: 전략·디자인·프로덕션 단계는 `DOC_SCHEMA`(artifact/status/summary/handoff/issues), QA는 `AUDIT_SCHEMA`(severity/category/description/fix + score)로 강제.
- **컨텍스트 전달**: 각 단계는 선행 단계의 `handoff` 문자열을 프롬프트로 받아 신선한 서브에이전트에 문맥을 주입한다.
- **결정적 수정 루프**: QA의 P0/P1 집계와 재시도 횟수가 코드 카운터로 보장된다 (모델 추론 아님).
- **인자 분기**: `args.phases`로 실행 구간, `args.context`로 맥락, `args.maxRevisions`로 루프 상한 제어.

## 인자(args) 스펙

```js
{
  phases: ['strategy','design','production','qa'],  // 실행 단계, 기본 전체
  context: '<프로젝트 맥락>',                          // 기본값 내장
  maxRevisions: 0                                    // QA 수정 루프 상한, 기본 0(1회 감사·리포트만)
}
```

## 마이그레이션 영향

- **유지**: 4개 에이전트 정의, 14개 스킬 — 변경 없음.
- **변경**: `lms-web-orchestrator` 스킬이 단계 나열식 지시서 → **라우터**로 개편.
- **신규**: `.claude/workflows/lms-build.workflow.js` 결정적 엔진.
- **호환**: 기존 "전체 실행 / 부분 실행 / 단일 에이전트" 시나리오 모두 라우팅 규칙으로 흡수.

## 향후 확장

- 감사 단계에 **적대적 검증**(verify 패널) 추가 — 각 P0 이슈를 복수 검증자가 반증 시도.
- `loop-until-dry` 패턴으로 잔여 이슈 0 수렴까지 라운드 반복(상한 내).
- 단계별 `model` 오버라이드로 비용·품질 튜닝.
