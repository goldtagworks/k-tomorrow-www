---
name: lms-web-orchestrator
description: "k-tomorrow LMS 홍보 사이트 하이브리드 오케스트레이터(라우터). 2단계 이상이 엮이는 다단계 빌드를 결정적 Workflow 엔진(lms-build)으로 라우팅한다. 'LMS 사이트 만들어줘', '랜딩페이지 제작', '홍보 사이트 시작', '팀 전체 실행', '전략부터 HTML까지', '만들고 품질까지 감사' 등 여러 단계를 묶는 요청에만 사용. 단일 산출물 국소 수정(카피 한 줄·토큰 하나·오타)은 이 스킬을 거치지 말고 해당 에이전트(production/design/quality/strategy-agent) 또는 직접 편집으로 처리하라."
---

# k-tomorrow LMS Web Orchestrator — 하이브리드 라우터

이 스킬은 **라우터**다. 직접 단계를 일일이 호출하지 않는다.
요청 의도를 판별해 **결정적 실행이 유리한 작업은 Workflow 엔진**(`lms-build`)에 위임하고,
**유연성·대화가 필요한 작업은 직접 Agent 호출**로 처리한다.

> 하이브리드 설계 원칙·근거는 [docs/hybrid-workflow.md](../../../docs/hybrid-workflow.md) 참조.

## 진입 조건 (중요)

**이 라우터는 다단계 작업 전용이다.** 단일 산출물 국소 수정은 애초에 이 스킬로 들어오면 안 된다.
간단한 수정에 오케스트레이터 → (심지어) 워크플로우 전체를 도는 것은 낭비다.

호출 비용 순으로 **4티어**가 있고, 가장 싼 경로를 우선한다:

| 티어 | 경로 | 비용 | 적용 |
|---|---|---|---|
| **T1 인라인** | 메인 루프가 직접 Edit (스킬·에이전트 없음) | 서브에이전트 0 | 오타·문구 한 줄·색상값 하나 등 **전문 방법론 불필요한 기계적 수정** |
| **T2 직접 에이전트** | 에이전트 description 직접 매칭 → Agent 1회 | 서브에이전트 1 | 카피 톤·접근성·디자인 토큰 등 **스킬 방법론이 필요한 단일 산출물 수정** |
| **T3 라우터(이 스킬)** | 의도 판별 → 경로 선택 | 스킬 로드 + 판단 | **다단계이거나 어느 단계인지 모호**할 때만 |
| **T4 워크플로우** | T3 → `lms-build` | 서브에이전트 다수 | 2단계 이상 빌드 |

**T1·T2는 이 라우터를 우회하는 것이 정상이다.** production/design/quality/strategy-agent는 각자 트리거 description을 가지므로, "카피만 수정"·"토큰만 수정"·"접근성만 점검"은 해당 에이전트로 직행한다.

## 1단계: 의도 판별 (라우터에 도달한 경우)

라우터까지 왔다는 것은 보통 다단계이거나 모호한 요청이다. 다음으로 분기한다:

| 사용자 요청 패턴 | 실행 경로 | 호출 |
|---|---|---|
| "LMS 사이트 만들어줘" / "팀 전체 실행" / "처음부터 다시" | **T4 Workflow** (전체) | `lms-build`, `args.phases=['strategy','design','production','qa']` |
| "전략부터 디자인·HTML까지" / "디자인하고 만들어줘"(전략 산출물 有) | **T4 Workflow** (부분 다단계) | `lms-build`, `args.phases` 해당 구간 |
| "만들고 품질까지 감사해줘" / "감사하고 고쳐줘"(다단계) | **T4 Workflow** (QA 포함) | `lms-build`, QA 단계 포함 |
| 어느 에이전트가 맞는지 모호한 단일 수정 | **T2로 강등** | 적합 에이전트 1회 호출 |
| 다단계인 줄 알았으나 실제 단일 수정으로 판명 | **T1/T2로 강등** | 직접 편집 또는 Agent 1회 |

**판별 한 줄**: 2개 이상 단계가 순차·병렬로 엮이거나 수정 루프(결정적 카운터)가 필요하면 → **T4 Workflow**.
그 외에는 가능한 가장 싼 티어로 **강등(de-escalate)** 한다. 라우터에 왔어도 단일 수정이면 워크플로우를 돌리지 않는다.

## 비례 검증 원칙 (수정 범위 = 검증 범위)

**문구 한 줄 수정에 빌드→전체 감사(QA 워크플로우)를 도는 것은 금지.** 검증 강도는 수정 범위에 비례한다.

| 수정 범위 | 적정 검증 | 금지(과잉) |
|---|---|---|
| 텍스트 한 줄·오타 (T1) | 바뀐 문자열 육안 확인. 검증 단계 없음 | QA 워크플로우, 전체 재빌드, Lighthouse 재측정 |
| 단일 산출물 수정 (T2) | 그 산출물에 한정된 **단일 감사 1회**(예: 카피 톤만, 접근성만) | `phases:['qa']` 3종 병렬 감사 풀세트 |
| 다단계 빌드 (T4) | `lms-build`의 QA 단계 풀 감사 + 수정 루프 | — (여기서만 풀 검증이 정당) |

규칙:
- T1 수정은 **검증 에이전트를 호출하지 않는다.** 영향이 한 줄에 갇혀 있으면 눈으로 확인하고 끝낸다.
- T2 수정에 검증이 필요하면, 바뀐 차원에 해당하는 **단일 스킬 1회만**(예: 카피 수정 → `trust-review`나 `accessibility-audit` 중 관련된 하나) 돌린다. 3종 풀 감사로 승격하지 않는다.
- **풀 QA 감사·Lighthouse 재측정·수정 루프는 오직 T4(다단계 빌드)에서만** 정당하다.
- 의심스러우면 과소 검증을 택하고 사용자에게 "추가 감사 필요하면 말해달라"고 안내한다. 자동으로 풀 파이프라인을 돌리지 않는다.

## 2단계-A: Workflow 경로 (다단계 빌드)

결정적 실행이 필요한 다단계 작업은 `lms-build` 워크플로우로 위임한다.
이 경로의 장점: 단계 누락 불가, 병렬 배리어 정확, **QA 수정 루프가 실제 `while` 카운터**(최대 2회)로 보장, 구조화 출력(스키마) 강제.

호출 예:
```
Workflow({
  name: 'lms-build',
  args: { phases: ['strategy','design','production','qa'], context: '<사용자 맥락>', maxRevisions: 0 }
})
```

QA 기본은 **1회 감사 + 이슈 리포트만**(`maxRevisions: 0`). 단일 HTML 페이지에 감사→수정→재감사 다회 루프는 과하다. 사용자가 "감사 결과대로 고쳐줘"라고 명시할 때만 `maxRevisions`를 1~2로 올린다. 감사 자체가 불필요하면 `phases`에서 `'qa'`를 뺀다.

부분 실행 — 선행 산출물이 이미 존재할 때 그 단계는 생략하고 `phases`만 좁힌다.
- 전략 산출물(docs/creative-brief.md 등) 존재 → `phases: ['design','production','qa']`
- index.html 존재, 감사만 → `phases: ['qa']`

Workflow는 백그라운드 실행되며 완료 시 알림이 온다. 진행은 `/workflows`로 관찰한다.
완료 후 반환된 status 맵 + QA 결과(`approved`, `revisions`, `remainingBlocking`)를 사용자에게 요약 보고한다.

## 2단계-B: 직접 Agent 경로 (단일 수정·대화)

국소 수정·대화형 요청은 Workflow를 거치지 않고 해당 에이전트를 직접 호출한다.

```
"카피만 다시 써줘"      → Agent(production-agent, "korean-copywriting 적용해 <대상> 카피 수정")
"디자인 토큰만 수정"    → Agent(design-agent, "design-system 적용해 docs/design-tokens.md 수정")
"접근성만 점검"         → Agent(quality-agent, "accessibility-audit 적용해 index.html 점검")
"전환 퍼널 다시 짜줘"   → Agent(strategy-agent, "conversion-optimization 적용")
```

이 경로는 빠르고 대화 문맥을 유지한다. 다만 단계 간 의존이 생기면 즉시 Workflow 경로로 승격한다.

## 팀 구성 (양 경로 공통 자산)

| 에이전트 | 역할 | 사용 스킬 |
|---------|------|----------|
| `strategy-agent` | 리서치 & 전략 | `site-research`, `creative-direction`, `ux-strategy`, `conversion-optimization` |
| `design-agent` | 디자인 시스템 & 비주얼 | `design-system`, `visual-design`, `component-architecture` |
| `production-agent` | 카피 & HTML & 성능 | `korean-copywriting`, `html-development`, `performance-optimization` |
| `quality-agent` | 신뢰성·디자인·접근성 감사 | `trust-review`, `design-audit`, `accessibility-audit` |

Workflow 엔진은 이 에이전트들을 `agentType`으로 그대로 재사용하고, 각 에이전트는 지정된 스킬의 `SKILL.md` 방법론을 적용한다. **에이전트·스킬 정의는 단일 진실 공급원(single source of truth)이며 두 경로가 공유한다.**

## 데이터 흐름 (Workflow 엔진 내부, 결정적)

```
Phase 1 Strategy : site-research → (creative-direction ∥ ux-strategy) → conversion-optimization
Phase 2 Design   : (design-system ∥ visual-design) → component-architecture
Phase 3 Production: korean-copywriting → html-development → performance-optimization
Phase 4 QA       : (trust-review ∥ design-audit ∥ accessibility-audit)
                   → P0/P1 집계 → [있으면] production-agent 수정 → 재감사  (while, 최대 2회)
                   → 최종 승인 / 잔여 이슈 보고
```

## 에러 핸들링 (라우터 책임)

| 상황 | 대응 |
|------|------|
| Workflow 중간 단계 status=failed | 반환 status 맵 확인 → 해당 단계만 `phases`로 좁혀 재실행 |
| QA 수정 루프 2회 초과(remainingBlocking>0) | 잔여 P0/P1 목록과 함께 사용자에게 보고, 수동 개입 요청 |
| 선행 산출물 누락으로 부분 실행 실패 | 누락 단계를 `phases`에 포함해 재실행 |
| 단일 Agent 수정이 다른 산출물에 연쇄 영향 | Workflow 경로로 승격(영향 단계 포함) |
| 토큰 한계로 HTML 미완성 | `phases: ['production']` 재실행 또는 production-agent 직접 호출로 이어서 구현 |

## 최종 보고 형식

빌드 완료 후 사용자에게:
- **실행 경로**: Workflow(lms-build) / 직접 Agent
- **단계별 status**: strategy/design/production 각 산출물 success 여부
- **QA 결과**: approved 여부, 수정 루프 횟수(revisions), 잔여 P0/P1(remainingBlocking), 점수(신뢰성/접근성/디자인)
- **산출물 경로**: docs/* 전략·디자인·감사 문서 + index.html + docs/lighthouse-report.md
