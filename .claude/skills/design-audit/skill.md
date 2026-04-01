---
name: design-audit
description: "LMS 홍보 사이트의 디자인 품질 감사 스킬. AI 생성 안티패턴 검출, 금지 패턴 위반 검사, 비주얼 품질 평가, Horizon 팔레트 준수 여부를 검증한다. '디자인 감사', '디자인 QA', '품질 검사', 'AI 패턴 검출', '디자인 리뷰' 요청 시 사용."
---

# Design Audit — AI 안티패턴 검출 & 디자인 품질 감사

## 워크플로우

1. **AI 안티패턴 검출** — P0 즉시 발행 대상
   - [ ] 금지 폰트: Inter, Noto Sans KR, Roboto, Arial, Open Sans, Helvetica, Malgun Gothic
   - [ ] 금지 색상: 순수 #000000, 네온/아우터 글로우, 과포화 gradient text (페이지당 1개 초과)
   - [ ] 금지 레이아웃: 3컬럼 동일 카드, 모든 섹션 동일 패턴, 중앙 정렬 일변도
   - [ ] 금지 콘텐츠: "김철수"/"John Doe", "Acme Corp", Unsplash URL, 깨진 CDN 링크
   - [ ] 금지 수치: 라운드 넘버 (50,000+, 100,000+)
   - [ ] 금지 보더/섀도: `1px solid gray`, harsh dark `shadow-md`, `rgba(0,0,0,0.3)`
   - [ ] 금지 모션: `linear` 또는 `ease-in-out` 트랜지션, `window.addEventListener('scroll')`

2. **Horizon 팔레트 준수 검증**
   - [ ] 승인된 Horizon 팔레트 색상만 사용하는가
   - [ ] 섹션별 고유 패턴이 적용되는가
   - [ ] 아크 모티프가 일관되게 사용되는가
   - [ ] 보라/파랑 AI 그라디언트 금지 (THE LILA BAN) 준수

3. **레이아웃 품질 검증**
   - [ ] 인접 섹션이 서로 다른 레이아웃 패턴을 사용하는가
   - [ ] 8pt 그리드 시스템을 준수하는가
   - [ ] 섹션 패딩이 최소 `py-24 md:py-32 lg:py-40`인가
   - [ ] 컨테이너가 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`인가
   - [ ] 모바일 반응형이 올바르게 작동하는가

4. **타이포그래피 품질 검증**
   - [ ] Pretendard 폰트가 올바르게 로드되는가
   - [ ] 한국어 텍스트에 `word-break: keep-all`이 적용되는가
   - [ ] heading 크기 계층이 적절한가
   - [ ] 본문 `max-w-[65ch]` 제한이 있는가

5. **비주얼 일관성 검증**
   - [ ] 카드 스타일이 일관적인가 (Double-Bezel 또는 정의된 패턴)
   - [ ] CTA 버튼 스타일이 일관적인가 (Primary/Secondary/Tertiary)
   - [ ] 아이콘 스타일이 일관적인가
   - [ ] 간격(spacing)이 일관적인가

6. **감사 리포트 작성** — 수정 우선순위 포함

## 도구 사용법

- `Read`: index.html 읽어서 전체 분석
- `Grep`: 금지 패턴 키워드 검색 (Inter, Noto Sans, #000000 등)
- `Write`: 감사 리포트를 docs/ 디렉토리에 저장

## 출력 규칙

- 산출물: `docs/design-audit-report.md`
- 이슈 형식:
  ```
  ## [P0] 금지 폰트 사용 — Inter 폰트 발견
  - 위치: <link href="...inter..."> (line 15)
  - 수정 지시: Inter → Pretendard로 교체
  - CSS: font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  ```
- 수정 우선순위: 폰트 → 색상 → 콘텐츠 → 레이아웃 → 모션 → 스페이싱
- 디자인 품질 점수: 0~100

## 에러 처리

- HTML 파일이 아직 없는 경우: 디자인 문서 기반 사전 검증
- 금지 패턴 대량 발견 시: 상위 5개만 P0으로 보고, 나머지는 P1
