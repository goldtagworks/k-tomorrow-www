---
name: creative-direction
description: "LMS 홍보 사이트의 크리에이티브 디렉션 스킬. Horizon 팔레트 기반 비주얼 방향 설정, 디자인 파라미터 결정, 크리에이티브 브리프 작성을 수행한다. '크리에이티브 브리프', '비주얼 방향', '디자인 컨셉', '무드보드', 'Horizon 팔레트' 요청 시 사용."
---

# Creative Direction — 크리에이티브 디렉션

## 워크플로우

1. **프로젝트 비전 수립** — k-tomorrow LMS의 핵심 가치 제안을 한 문장으로 정의
   - "누구나 쉽게 배우는 디지털 교육 플랫폼" 방향
   - 공공기관 의사결정자가 첫 3초 안에 파악할 수 있는 가치 제안

2. **Vibe Archetype 선택** — 공공기관 LMS에 적합한 비주얼 방향
   - **Clean Structural** (권장): 화이트/실버-그레이 기반, 볼드 디스플레이, 앰비언트 섀도
   - **Warm Editorial**: 따뜻한 크림 톤, 세리프 헤딩, 노이즈 텍스처 (다문화 포용 느낌)
   - Vantablack Luxe는 공공기관 맥락에서 부적합 → 배제
   - 근거를 명시하여 선택

3. **Layout Archetype 선택**
   - **Editorial Split** (권장): 대형 타이포 좌측 + 인터랙티브 콘텐츠 우측 (정보 전달에 적합)
   - **Asymmetrical Bento Grid**: 다양한 카드 크기로 기능 소개 (Features 섹션에 활용)
   - 근거를 명시하여 선택

4. **디자인 파라미터 설정**
   - `DESIGN_VARIANCE`: 5~6 (공공기관은 과도한 변화보다 안정적 구조)
   - `MOTION_INTENSITY`: 3~4 (시니어 대상 모션 최소화)
   - `VISUAL_DENSITY`: 3~4 (정보 과밀 방지, 여백 확보)
   - `LANDING_PURPOSE`: institutional_adoption (B2G 전환)

5. **색상 방향 확정** — Horizon 팔레트 기반
   - 베이스 뉴트럴: 웜 화이트 + 소프트 그레이 계열
   - 1개 액센트 컬러: 공공 신뢰의 블루 또는 따뜻한 앰버 (채도 < 80%)
   - "보라/파랑 AI 그라디언트" 금지 (THE LILA BAN)
   - 아크 모티프를 섹션별 고유 패턴에 반영

6. **폰트 방향 확정**
   - 한국어: Pretendard 필수
   - 영문 디스플레이: Outfit 또는 Cabinet Grotesk (공공기관의 깔끔한 느낌)
   - 시니어 모드: 본문 20px 이상, 헤드라인 28px 이상

7. **크리에이티브 브리프 작성** — 위 결정을 통합하여 design-agent에 전달할 브리프 문서 작성

## 도구 사용법

- `Read`: docs/k-tomorrow_LMS_소개.md, docs/benchmark-report.md 참조
- `Write`: 크리에이티브 브리프를 docs/ 디렉토리에 저장

## 출력 규칙

- 산출물: `docs/creative-brief.md`
- 포함 항목:
  - 프로젝트 비전 (1줄)
  - Vibe Archetype 선택 + 근거
  - Layout Archetype 선택 + 근거
  - 디자인 파라미터 4개 값
  - 색상 방향 (Horizon 팔레트 기반)
  - 폰트 방향
  - 무드보드 키워드 5~10개
  - 섹션별 아크 모티프 적용 방향

## 에러 처리

- Horizon 팔레트 정보가 불충분한 경우: 기존 승인된 디자인 결정(memory 참조)을 기반으로 확장
- 사용자가 다른 방향을 원할 경우: 대안을 2개 제시하고 선택 요청
