export const meta = {
  name: 'lms-build',
  description: 'k-tomorrow LMS 홍보 사이트 결정적 빌드 엔진 — 전략→디자인→프로덕션→QA 4단계 + 수정 루프',
  whenToUse: '전체 빌드 또는 다단계 빌드(전략+디자인+프로덕션, 프로덕션+QA 등)를 결정적으로 실행할 때. 단일 에이전트 수정·대화형 요청은 라우터(lms-web-orchestrator)가 직접 Agent로 처리한다.',
  phases: [
    { title: 'Strategy', detail: 'site-research → (creative-direction ∥ ux-strategy) → conversion-optimization' },
    { title: 'Design', detail: '(design-system ∥ visual-design) → component-architecture' },
    { title: 'Production', detail: 'korean-copywriting → html-development → performance-optimization' },
    { title: 'QA', detail: '3종 감사 병렬 → 수정 루프(최대 2회)' },
  ],
}

// ─────────────────────────────────────────────────────────────
// args 로 단계 선택 (라우터가 의도 판별 후 주입)
//   args.phases : 실행할 단계 배열. 기본은 빌드 3단계뿐 — QA 미포함.
//                 검증(qa)은 사용자가 "감사해줘"라고 명시할 때만 phases 에 넣는다.
//   args.context: 프로젝트 맥락 문자열
//   args.maxRevisions: QA 가 돌 때의 수정 루프 상한, 기본 0(리포트만, 자동 수정 없음)
// ─────────────────────────────────────────────────────────────
const RUN = (args && args.phases) || ['strategy', 'design', 'production']
const CONTEXT = (args && args.context) || 'k-tomorrow LMS(다중 기관·접근성 강화 학습 관리 시스템) 공공기관 대상 홍보 랜딩페이지 전체 빌드'
const MAX_REV = (args && args.maxRevisions) != null ? args.maxRevisions : 0

const SKILLS = '.claude/skills'
const BRAND = 'docs/k-tomorrow_LMS_소개.md'

// 산출물 문서 공통 스키마 (전략·디자인·프로덕션 단계)
const DOC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    artifact: { type: 'string', description: '생성·갱신한 산출물 파일 경로' },
    status: { type: 'string', enum: ['success', 'needs_review', 'failed'] },
    summary: { type: 'string', description: '산출물 핵심 요약 2~3문장' },
    handoff: { type: 'string', description: '다음 단계가 즉시 사용할 핵심 결정·데이터 요약' },
    issues: { type: 'array', items: { type: 'string' } },
  },
  required: ['artifact', 'status', 'summary', 'handoff'],
}

// 감사 결과 스키마 (QA 단계)
const AUDIT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    audit: { type: 'string', description: '감사 종류 (trust|design|accessibility)' },
    report: { type: 'string', description: '감사 리포트 파일 경로' },
    status: { type: 'string', enum: ['approved', 'needs_revision', 'failed'] },
    score: { type: 'number', description: '0~100 점수' },
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: { type: 'string', enum: ['P0', 'P1', 'P2', 'P3'] },
          category: { type: 'string' },
          description: { type: 'string' },
          fix: { type: 'string', description: '구체적 CSS/HTML 수정값 포함' },
        },
        required: ['severity', 'category', 'description', 'fix'],
      },
    },
  },
  required: ['audit', 'status', 'score', 'issues'],
}

// 스킬 방법론을 적용하도록 지시하는 프롬프트 빌더
function task(skill, body) {
  return [
    `맥락: ${CONTEXT}`,
    `브랜드 정보: ${BRAND} 를 먼저 읽어 사실 근거로 삼는다.`,
    `방법론: ${SKILLS}/${skill}/SKILL.md 를 읽고 그 기준을 그대로 적용한다.`,
    '',
    body,
    '',
    '실제 파일을 생성/갱신하라(설명만 출력 금지). 완료 후 스키마에 맞춰 결과를 반환하라.',
  ].join('\n')
}

const results = {}

// ─────────────────────────────────────────────────────────────
// Phase 1 — Strategy
// ─────────────────────────────────────────────────────────────
if (RUN.includes('strategy')) {
  phase('Strategy')
  const research = await agent(
    task('site-research',
      '공공기관/다문화센터/평생교육원 LMS 사이트를 벤치마킹한다. 기존 docs/benchmark-report.md 가 있으면 검토 후 갱신, 없으면 신규 작성. 디자인 패턴·신뢰 요소·접근성·전환 동선·차별화 기회를 docs/benchmark-report.md 에 정리한다.'),
    { agentType: 'strategy-agent', label: 'site-research', phase: 'Strategy', schema: DOC_SCHEMA },
  )
  const [brief, ux] = await parallel([
    () => agent(
      task('creative-direction',
        `Horizon 팔레트 기반 크리에이티브 브리프를 docs/creative-brief.md 에 작성한다.\n벤치마크 인사이트: ${research.handoff}`),
      { agentType: 'strategy-agent', label: 'creative-direction', phase: 'Strategy', schema: DOC_SCHEMA },
    ),
    () => agent(
      task('ux-strategy',
        `접근성 퍼스트 페이지 구조·섹션 순서·시니어/외국인 동선을 docs/ux-strategy.md 에 설계한다.\n벤치마크 인사이트: ${research.handoff}`),
      { agentType: 'strategy-agent', label: 'ux-strategy', phase: 'Strategy', schema: DOC_SCHEMA },
    ),
  ])
  const conversion = await agent(
    task('conversion-optimization',
      `B2G 전환 퍼널 + 3단 CTA(도입문의·제안서·데모) 전략을 docs/conversion-strategy.md 에 확정한다.\n크리에이티브 브리프: ${brief.handoff}\n페이지 구조: ${ux.handoff}`),
    { agentType: 'strategy-agent', label: 'conversion-optimization', phase: 'Strategy', schema: DOC_SCHEMA },
  )
  results.strategy = { research, brief, ux, conversion }
  log(`Strategy 완료 — 전략 문서 4종 (${[research, brief, ux, conversion].filter(d => d.status !== 'success').length} 건 검토 필요)`)
}

// ─────────────────────────────────────────────────────────────
// Phase 2 — Design
// ─────────────────────────────────────────────────────────────
if (RUN.includes('design')) {
  phase('Design')
  const briefHandoff = results.strategy ? results.strategy.brief.handoff : 'docs/creative-brief.md 참조'
  const uxHandoff = results.strategy ? results.strategy.ux.handoff : 'docs/ux-strategy.md 참조'
  const [tokens, visual] = await parallel([
    () => agent(
      task('design-system',
        `CSS Custom Properties 기반 디자인 토큰 + 시니어 모드(data-mode="senior") 전환 토큰 + 반응형 브레이크포인트를 docs/design-tokens.md 에 정의한다.\n크리에이티브 브리프: ${briefHandoff}`),
      { agentType: 'design-agent', label: 'design-system', phase: 'Design', schema: DOC_SCHEMA },
    ),
    () => agent(
      task('visual-design',
        `Horizon 팔레트 색상 시스템(WCAG 대비비 검증 포함)·타이포 스케일·레이아웃 그리드·섹션별 아크 모티프를 docs/visual-design.md 에 설계한다.\n크리에이티브 브리프: ${briefHandoff}`),
      { agentType: 'design-agent', label: 'visual-design', phase: 'Design', schema: DOC_SCHEMA },
    ),
  ])
  const components = await agent(
    task('component-architecture',
      `고대비 카드·48px 터치타겟 버튼·공공 신뢰 요소 컴포넌트 스펙시트를 docs/component-specs.md 에 통합 정의한다.\n페이지 구조: ${uxHandoff}\n디자인 토큰: ${tokens.handoff}\n비주얼 시스템: ${visual.handoff}`),
    { agentType: 'design-agent', label: 'component-architecture', phase: 'Design', schema: DOC_SCHEMA },
  )
  results.design = { tokens, visual, components }
  log(`Design 완료 — 디자인 문서 3종`)
}

// ─────────────────────────────────────────────────────────────
// Phase 3 — Production (순차 파이프라인)
// ─────────────────────────────────────────────────────────────
if (RUN.includes('production')) {
  phase('Production')
  const convHandoff = results.strategy ? results.strategy.conversion.handoff : 'docs/conversion-strategy.md 참조'
  const compHandoff = results.design ? results.design.components.handoff : 'docs/component-specs.md 참조'
  const tokHandoff = results.design ? results.design.tokens.handoff : 'docs/design-tokens.md 참조'

  const copy = await agent(
    task('korean-copywriting',
      `공공기관 톤앤매너 섹션별 카피 + B2G 설득 카피 + 14개 언어 쇼케이스 콘텐츠를 docs/copy-content.md 에 작성한다. 과장 표현 금지, 구체 수치 사용.\n전환 전략: ${convHandoff}`),
    { agentType: 'production-agent', label: 'korean-copywriting', phase: 'Production', schema: DOC_SCHEMA },
  )
  const html = await agent(
    task('html-development',
      `완전한 단일 HTML 파일을 index.html 에 구현한다(<!DOCTYPE html>~</html>, 생략 패턴 금지). 시맨틱 HTML·ARIA·skip nav·시니어 모드 토글 내장.\n카피: ${copy.handoff}\n컴포넌트 스펙: ${compHandoff}\n디자인 토큰: ${tokHandoff}`),
    { agentType: 'production-agent', label: 'html-development', phase: 'Production', schema: DOC_SCHEMA },
  )
  const perf = await agent(
    task('performance-optimization',
      `index.html 에 대해 Lighthouse Performance/Accessibility/Best-Practices 90+ 목표로 최적화하고 docs/lighthouse-report.md 에 결과를 기록한다. 구조 재작성 금지, 점진 개선만.\n구현 요약: ${html.handoff}`),
    { agentType: 'production-agent', label: 'performance-optimization', phase: 'Production', schema: DOC_SCHEMA },
  )
  results.production = { copy, html, perf }
  log(`Production 완료 — index.html 생성`)
}

// ─────────────────────────────────────────────────────────────
// Phase 4 — QA (3종 감사 병렬 → 수정 루프, 결정적 카운터)
// ─────────────────────────────────────────────────────────────
if (RUN.includes('qa')) {
  phase('QA')
  const AUDITS = [
    { key: 'trust', skill: 'trust-review', report: 'docs/trust-review-report.md', body: '공공기관 신뢰 3종 세트(상위 기관 로고 체인·웹접근성 인증 마크·전화번호 직접 노출) 충족 여부를 감사한다.' },
    { key: 'design', skill: 'design-audit', report: 'docs/design-audit-report.md', body: 'AI 생성 안티패턴·금지 패턴 위반·금지 폰트·Horizon 팔레트 준수를 감사한다.' },
    { key: 'a11y', skill: 'accessibility-audit', report: 'docs/accessibility-audit-report.md', body: 'WCAG 2.2 AA 준수·시니어 모드 작동·스크린리더·키보드 네비게이션·색상 대비를 감사한다.' },
  ]

  let revision = 0
  let approved = false
  let lastReports = []

  while (revision <= MAX_REV && !approved) {
    const round = revision
    const audits = await parallel(AUDITS.map(a => () =>
      agent(
        task(a.skill,
          `index.html 을 감사한다. 결과 리포트를 ${a.report} 에 작성한다. 이슈는 severity(P0~P3)·category·description·구체적 fix 값을 포함한다.\n${a.body}`),
        { agentType: 'quality-agent', label: `${a.key}-audit (r${round})`, phase: 'QA', schema: AUDIT_SCHEMA },
      ).then(r => ({ ...r, key: a.key })),
    ))

    lastReports = audits.filter(Boolean)
    const blocking = lastReports.flatMap(a => a.issues || []).filter(i => i.severity === 'P0' || i.severity === 'P1')

    if (blocking.length === 0) {
      approved = true
      log(`QA round ${round}: P0/P1 이슈 0건 — 최종 승인`)
      break
    }

    if (revision === MAX_REV) {
      const mode = MAX_REV === 0 ? '리포트 전용(자동 수정 안 함)' : `수정 루프 상한(${MAX_REV}) 도달`
      log(`QA round ${round}: P0/P1 ${blocking.length}건 — ${mode}, 이슈 목록과 함께 보고`)
      break
    }

    revision++
    const fixList = blocking.map(i => `- [${i.severity}] (${i.category}) ${i.description} → ${i.fix}`).join('\n')
    log(`QA round ${round}: P0/P1 ${blocking.length}건 → production-agent 수정 (revision ${revision})`)
    await agent(
      [
        `맥락: ${CONTEXT}`,
        `index.html 의 아래 P0/P1 이슈를 수정한다. 전체 재작성 금지, 점진 개선만. 우선순위: 접근성>신뢰성>폰트>색상>콘텐츠>레이아웃.`,
        '',
        fixList,
        '',
        '수정 완료 후 변경 요약을 반환하라.',
      ].join('\n'),
      { agentType: 'production-agent', label: `fix r${revision}`, phase: 'QA' },
    )
  }

  results.qa = {
    approved,
    revisions: revision,
    reports: lastReports.map(r => ({ audit: r.key, status: r.status, score: r.score, issueCount: (r.issues || []).length })),
    remainingBlocking: lastReports.flatMap(a => a.issues || []).filter(i => i.severity === 'P0' || i.severity === 'P1').length,
  }
}

return {
  ran: RUN,
  strategy: results.strategy ? Object.fromEntries(Object.entries(results.strategy).map(([k, v]) => [k, v.status])) : null,
  design: results.design ? Object.fromEntries(Object.entries(results.design).map(([k, v]) => [k, v.status])) : null,
  production: results.production ? Object.fromEntries(Object.entries(results.production).map(([k, v]) => [k, v.status])) : null,
  qa: results.qa || null,
}
