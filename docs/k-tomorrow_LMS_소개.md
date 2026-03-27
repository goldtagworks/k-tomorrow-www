# k-tomorrow LMS

**다중 기관 대상 · 접근성 강화 학습 관리 시스템**

> Multi-Organization Learning Management System with Enhanced Accessibility
>
> 노령자 · 외국인 학습자를 위한 디지털 배움터 | 2026.03

---

## 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 아키텍처](#2-기술-아키텍처)
3. [사용자 역할 체계](#3-사용자-역할-체계-6단계-rbac)
4. [핵심 기능 — 관리자](#4-핵심-기능--관리자-포털)
5. [핵심 기능 — 강사](#5-핵심-기능--강사-포털)
6. [핵심 기능 — 수강생](#6-핵심-기능--수강생-포털-pwa)
7. [강의 개설 프로세스](#7-강의-개설-프로세스-3-step-마법사)
8. [데이터 모델](#8-데이터-모델-erd-개요)
9. [자동화 파이프라인](#9-자동화-파이프라인)
10. [접근성 & 다국어](#10-접근성--다국어)
11. [보안 & 인증](#11-보안--인증)
12. [시스템 현황](#12-시스템-현황--상태-전환)
13. [로드맵](#13-로드맵--향후-계획)

---

## 1. 프로젝트 개요

### 미션

다중 기관(대학·공공기관) 대상, 노령자·외국인이 모두 쉽게 사용할 수 있는 **접근성 강화 학습 플랫폼**

### 핵심 목적

- 다중 기관 대상 LMS 구축
- 기관 트리 구조 관리 (3Depth)
- 역할 기반 접근 제어 (6단계 RBAC)
- "디지털 배움터" 레퍼런스 반영

### 대상 사용자

- **노령자** — 시니어 학습자 (큰 글꼴, 간결한 UI)
- **외국인 학습자** — 다국어 지원 (14개 언어)
- **대학·공공기관** 교육 담당자
- **현장 강사** 및 기관 관리자

### 핵심 특징

- 3개 독립 SPA: **Admin** (`:5373`) / **Teacher** (`:5374`) / **Student** (`:5375`)
- 온라인·오프라인·실시간 화상 수업 지원
- 자료 검수 프로세스 (관리자 승인 후 공개)
- 과목 복제·자동 스케줄링
- Google Meet 자동 녹화·회의록 수집

---

## 2. 기술 아키텍처

### 프론트엔드

| 기술 | 용도 |
|---|---|
| **React 19** + **TypeScript 5.9** | UI 프레임워크 |
| **Vite 7** | 빌드 도구 |
| **Mantine UI v8** | 컴포넌트 라이브러리 (테마별 분리) |
| **TanStack React Query v5** | 서버 상태 관리 |
| **Zustand v5** | 인증 상태 관리 (useAuthStore) |
| **i18next** | 다국어 지원 (14개 언어) |

### 백엔드 (Supabase)

| 기술 | 용도 |
|---|---|
| **PostgreSQL** | 데이터베이스 |
| **Auth** | 인증 · JWT 발급 |
| **PostgREST** | 자동 REST API |
| **Storage** | 파일 저장소 |
| **Edge Functions** | 서버리스 함수 |
| **RLS** | 행 수준 보안 (Row Level Security) |

### 인프라 & 자동화

| 기술 | 용도 |
|---|---|
| **NHN Cloud** | 서버 (2 CPU / 4 GB / 50 GB) |
| **Docker Compose** | 배포 및 서비스 관리 |
| **n8n** | 워크플로우 자동화 (셀프 호스팅) |
| **Google Calendar/Meet API** | 화상 수업 통합 |
| **pg_cron** | DB 스케줄러 |
| **Yarn Workspaces** | 모노레포 관리 |

### 모노레포 구조

```
k-tomorrow-react/
├── apps/
│   ├── admin/        # 관리자 SPA (:5373)
│   ├── teacher/      # 강사 SPA (:5374)
│   └── student/      # 수강생 SPA (:5375, PWA)
├── packages/
│   ├── components/   # 공통 컴포넌트
│   ├── hooks/        # React Query 기반 데이터 훅
│   ├── lib/          # Supabase 클라이언트, 인증, 쿼리 키
│   ├── types/        # 공통 타입 정의
│   ├── utils/        # 유틸리티 (엑셀 파싱, YouTube 등)
│   ├── stores/       # Zustand 스토어
│   ├── styles/       # 공통 스타일
│   └── menus/        # 역할별 메뉴 정의
└── docs/             # 아키텍처 문서
```

---

## 3. 사용자 역할 체계 (6단계 RBAC)

```
admin_sys → admin_upper → admin_org → admin_single → teacher → student
```

| 역할 | 코드 | 앱 | 데이터 범위 | 주요 권한 |
|---|---|---|---|---|
| **시스템 관리자** | `admin_sys` | Admin | 전체 플랫폼 | 플랫폼 설정·진단, 모든 기관 읽기 |
| **상위기관 관리자** | `admin_upper` | Admin | 하위기관 전체 | 감독·통계 모니터링, 정책·통계 제어 |
| **기관 관리자** | `admin_org` | Admin | 본 기관 | 강의 개설·복제, 사용자 관리, 자료 검수 |
| **단일기관 관리자** | `admin_single` | Admin | 본 기관 | 기관 관리자와 동일 (1-레벨 조직용) |
| **강사** | `teacher` | Teacher | 배정 수업 | 수업 운영, 자료 업로드, 출석 관리, Q&A 답변 |
| **수강생** | `student` | Student | 본인 데이터 | 수업 참여, 자료 다운로드, 출석 확인, 질문 |

> **가입 방식**: 자체 회원가입 ❌ → 관리자 **Magic-Link 초대** 전용
>
> **데이터 격리**: RLS로 `role` · `org_unit_id` 기반 자동 필터링

---

## 4. 핵심 기능 — 관리자 포털

| 기능 | 설명 |
|---|---|
| **📊 대시보드** | KPI 카드 · 오늘 수업 · 최신 공지 · 빠른 작업 · Drill-down 링크 |
| **🏢 기관 관리** | 트리 구조 CRUD · 기관 코드 자동 생성 · 3Depth 계층 제한 |
| **👥 사용자 관리** | Magic-Link 초대 · CSV 일괄 업로드 · 역할 배정 · 상태 관리 |
| **📚 강의 개설·복제** | 3-Step 마법사 · 자동 일정 생성 · 학기별 과목 복제 |
| **📋 수업 관리** | 회차 목록 · 필터 · 강사 변경 · 알림 · 일정·장소 관리 |
| **📂 자료 검수** | 미리보기 · 승인/반려 · 반려 사유 기록 · N건 일괄 승인 |
| **📢 공지사항** | 시스템/기관 분리 · 다국어 WYSIWYG · 첨부파일 지원 |
| **📈 통계 분석** | 출석률 · 수강률 · 기관별 랭킹 · CSV/그래프 Export |

### 주요 업무 흐름 (새 학기)

```
1. 강사 초대      → [사용자 관리] → [사용자 초대] → 이메일 입력
2. 수강생 초대    → 엑셀 일괄 업로드 또는 개별 초대
3. 강의 개설      → 3-Step 마법사 (기본정보 → 일정 → 강사배정)
4. 수강생 등록    → 강의 선택 → 수강생 추가
5. 수업 시작 안내 → 공지사항 작성
6. 자료 검수      → 강사 업로드 → 관리자 승인
7. 통계 확인      → 출석률 · 수강 현황
```

---

## 5. 핵심 기능 — 강사 포털

| 기능 | 설명 |
|---|---|
| **🏠 오늘의 수업** | 오늘 예정 수업 자동 표시 · 강의 링크 · 출석 관리 · Q&A 바로가기 · 30초 자동 새로고침 |
| **📋 내 강의 관리** | 담당 강의 목록 · 회차별 수업 정보 · 수업 상태 확인 (예정/진행중/종료) |
| **🎥 회의실 생성** | Google Meet 자동 생성 · Zoom/YouTube 링크 지원 · 자동 녹화·자막 설정 · 수강생 자동 공유 |
| **✅ 출석 관리** | 일괄 체크 · 개별 수정 · 출석/지각/결석 구분 · 비고 입력 · 출석 통계 |
| **📂 자료 업로드** | Drag & Drop · PDF/Word/PPT/이미지 · 파일당 최대 50MB · 검수 상태 추적 |
| **💬 Q&A 답변** | 수강생 질문 확인 · 강의/수업별 필터 · 답변 등록·수정 · 답변 시 자동 알림 |

### 강사 일과 흐름

```
[수업 전] 자료 업로드 → 공지사항 확인 → 수업 내용 점검
[수업 당일] 홈 화면 확인 → 회의실 생성 → 수업 입장 → 수업 진행
[수업 후] 출석 체크 → Q&A 답변 → 보충 자료 업로드
```

---

## 6. 핵심 기능 — 수강생 포털 (PWA)

| 기능 | 설명 |
|---|---|
| **🏠 홈 화면** | 오늘 수업 자동 표시 · 강의 링크 (10분 전 활성) · 빠른 작업 버튼 · 자동 업데이트 |
| **📚 내 수강 목록** | 수강 중 강의 목록 · 회차별 수업 일정 · 출석 상태 색상 표시 (녹/노/빨) |
| **📖 수업 참여** | 강의 링크 클릭 입장 · Zoom/Meet 자동 연결 · 수업 중 재입장 · YouTube 학습 지원 |
| **📂 학습 자료** | 강의별 자료 필터 · 승인된 자료 다운로드 · PDF/Word/PPT/이미지 · 키워드 검색 |
| **✅ 출석 확인** | 출석 통계 카드 · 회차별 출석 상태 · 출석/지각/결석 횟수 · 달력 시각화 |
| **💬 Q&A 질문** | 강사에게 질문 등록 · 답변 알림 수신 · 수업별 질문 필터 · 질문 수정 가능 |

> **접근성 특화**: 글꼴 ≥18px · 버튼 ≥48×48px · 메뉴 깊이 ≤2 · WCAG AA 대비

---

## 7. 강의 개설 프로세스 (3-Step 마법사)

### STEP 1: 기본 정보 입력

- 강의명 · 강의 코드 (자동 생성)
- 소속 기관 (자동 선택)
- 강의 유형: 온라인 / 오프라인 / 실시간 화상 / 통합
- 카테고리 · 담당 강사 · 강의 설명

### STEP 2: 강의 일정 설정

- **자동 생성** (권장): 기간 · 시간 · 요일 선택 → 자동 스케줄링
- **직접 추가**: 날짜별 개별 입력
- **엑셀 일괄 업로드**: 대량 일정 등록
- 장소 · 회의 링크 설정

### STEP 3: 강사 배정 · 최종 확인

- 담당 강사 확인/변경
- 대체 강사 지정 (선택, 범위 적용)
- 최종 정보 확인 → 저장

### 부가 기능

| 기능 | 설명 |
|---|---|
| **과목 복제** | 학기별 복제 — 기본 정보 복사, 일정·자료는 새로 등록 |
| **수강생 일괄 등록** | 엑셀 업로드로 다수 수강생 한 번에 등록 |
| **명단 자동 복제** | 새 회차 생성 시 1회차 명단 자동 복제 (트리거) |
| **상태 자동 전환** | pg_cron으로 draft→active, scheduled→in_progress 자동 전환 |

---

## 8. 데이터 모델 (ERD 개요)

### 기관 · 사용자 도메인

| 테이블 | 설명 |
|---|---|
| `org_units` | 기관 (계층 트리, soft delete) |
| `users` | 사용자 기본 정보 |
| `user_profiles` | 프로필 · 소속 기관 |
| `user_roles` | 다중 역할 매핑 |
| `user_identities` | OAuth 연동 (Google 등) |
| `pending_invites` | 초대 관리 |
| `role_policies` | 역할별 메뉴 권한 (CRUD/승인) |

### 강의 · 수업 도메인

| 테이블 | 설명 |
|---|---|
| `lectures` | 과목 템플릿 (커리큘럼·강사·기관·학기) |
| `classes` | 회차/분반 (일정·장소·링크) |
| `class_teachers` | 강사 배정 |
| `class_enrollments` | 수강 등록 |
| `attendance_sheets` | 출결표 |
| `attendance_records` | 출결 기록 |

### 학습 · 콘텐츠 도메인

| 테이블 | 설명 |
|---|---|
| `materials` | 학습 자료 (검수 프로세스) |
| `assignments` | 과제 |
| `assignment_submissions` | 과제 제출 |
| `questions` | Q&A 질문/답변 |
| `class_reports` | 수업 리포트 |
| `class_transcripts` | 회의록 (n8n 수집) |
| `class_recordings` | 녹화 영상 (n8n 수집) |

### 공지 · 시스템 도메인

| 테이블 | 설명 |
|---|---|
| `notices` | 공지사항 (시스템/기관 분리) |
| `notifications` | 알림 (트리거 자동 생성) |
| `youtube_watch_progress` | 시청 진도 (80% 자동 출석) |
| `logs` | 운영 로그 |
| `settings` | 시스템 설정 |
| `bulk_jobs` | 대량 작업 |
| `v_dashboard_counts` | 대시보드 뷰 (Materialized View) |

> **DB 규모**: 테이블 25+ · 트리거 7+ · RLS 정책 10+ · pg_cron 2개 · Edge Functions · Materialized View

---

## 9. 자동화 파이프라인

### n8n 워크플로우

#### 워크플로우 1: 회의록 자동 수집

- **트리거**: 매일 새벽 02:00 KST
- **대상**: 전날 종료된 실시간 화상 수업 (`real_time_video`)
- **플로우**:
  1. Supabase에서 대상 수업 조회
  2. Google Drive에서 Gemini 회의록 파일 검색
  3. 강사 이메일 + 시작시간으로 매칭
  4. 파일 내용 추출 → `class_transcripts` 저장
  5. `classes.transcript_collected_at` 업데이트

#### 워크플로우 2: 녹화영상 YouTube 업로드

- **트리거**: 매일 새벽 03:00 KST (회의록 수집 후)
- **플로우**: Drive 녹화 검색 → YouTube Data API 업로드 → `class_recordings` 저장

### DB 트리거 (7+)

| 트리거 | 설명 |
|---|---|
| `tg_classes_auto_roster` | 새 회차 생성 시 1회차 명단 자동 복제 |
| `tr_profiles_main_role_upsert` | main_role → user_roles 자동 동기화 |
| `trigger_notify_on_qna_answer` | Q&A 답변 시 질문자 알림 |
| `trigger_notify_on_assignment_posted` | 과제 공개 시 수강생 전원 알림 |

### pg_cron 스케줄러 (매 1시간)

| 함수 | 설명 |
|---|---|
| `advance_classes_status()` | 수업 상태 자동 전환 (scheduled → in_progress → finished) |
| `promote_lectures_from_draft()` | 강의 승격 (draft → active) |

> 클라이언트 훅과 pg_cron **이중 레이어**로 상태 전환 안정성 확보

### Google Calendar / Meet 통합

- Edge Function으로 Google Calendar 이벤트 생성
- Meet API로 Space 생성 (자동 녹화/자막 설정)
- 캘린더에 연결 → 수강생에게 링크 자동 공유

---

## 10. 접근성 & 다국어

### UX 가이드 (시니어·외국인 특화)

| 항목 | 기준 | 이유 |
|---|---|---|
| **버튼 크기** | ≥ 48×48 px | 시니어 터치 오류 방지 |
| **글꼴 크기** | ≥ 18 px | 가독성 향상 + 다국어 대응 |
| **컬러 대비** | WCAG AA 이상 | 색약 · 시력 저하 대비 |
| **메뉴 깊이** | ≤ 2단계 | 직관적 네비게이션 |
| **준비중 배너** | 회색 + 🔒 아이콘 | 기능 예고 · 오류 방지 |

### 다국어 지원

- **i18next** 기반 14개 언어 지원
- 한국어(ko) · 영어(en) 기본 제공
- JSON 리소스 파일 관리
- 키 구조: `title.*`, `button.*`, `label.*`, `message.*`, `status.*`, `valid.*`, `placeholder.*`

### 앱별 테마

| 앱 | 테마명 | 특성 |
|---|---|---|
| Admin | `adminSecure` | 전문적 · 신뢰감 |
| Teacher | `teacherTrust` | 따뜻함 · 안정감 |
| Student | `studentGrowth` | 활력 · 성장 |

---

## 11. 보안 & 인증

| 항목 | 설명 |
|---|---|
| **RLS (행 수준 보안)** | role + org_unit_id 기반 자동 데이터 필터링 |
| **Magic-Link 인증** | 관리자 초대 전용 — 자체 회원가입 불가 |
| **JWT 인증** | Supabase Auth — 토큰 기반 세션 관리 |
| **OAuth 연동** | Google OAuth — 소셜 로그인 지원 |
| **자료 검수** | 관리자 승인 후 공개 — 부적절 콘텐츠 차단 |
| **Soft Delete** | 삭제 시 `deleted_at` 기록 — 데이터 보존 |
| **운영 로그** | 2년 보관 · CSV 다운로드 · 심각도 코드 |

### 인증 플로우

```
관리자 → Supabase: 사용자 등록 (email · role · org)
Supabase → 사용자: Magic-Link 메일 발송
사용자 → Supabase: 최초 로그인 (비밀번호 · 언어 설정)
Supabase → 사용자: JWT 발급 & user_profiles 생성
사용자 → 시스템: role 기반 대시보드 진입
```

> 상태 전이: `invited` → `active` → `inactive`

---

## 12. 시스템 현황 · 상태 전환

### 엔티티별 상태 전환

| 엔티티 | 상태 흐름 | 비고 |
|---|---|---|
| **Lecture** (과목) | `draft` → `active` → `finished` | 되돌리기: 예정 수업 없음 + 활성 수강생 없음 |
| **Class** (수업) | `draft` → `scheduled` → `in_progress` → `finished` / `paused` / `canceled` | pg_cron + 클라이언트 훅 이중 |
| **Enrollment** | `enrolled` → `enrolled_complete` / `waitlist` / `canceled` | — |
| **Material** | `pending` → `approved` / `rejected` | 관리자 검수 |
| **User** | `invited` → `active` → `inactive` | Magic-Link 기반 |

### 주요 자동화 함수

| 함수 | 설명 |
|---|---|
| `enroll_student_to_lecture()` | 과목 단위 전 회차 일괄 등록 |
| `clone_lecture_ex()` | 과목 + 회차 복제 (날짜 보정) |
| `advance_classes_status()` | 수업 상태 자동 전환 (pg_cron) |
| `promote_lectures_from_draft()` | 강의 draft→active 승격 (pg_cron) |

### 시스템 수치

| 수치 | 항목 |
|---|---|
| **25+** | DB 테이블 |
| **7+** | 자동화 트리거 |
| **10+** | RLS 정책 |
| **2** | pg_cron 작업 |
| **6** | 사용자 역할 |
| **3** | 독립 SPA |
| **14** | 지원 언어 |

---

## 13. 로드맵 & 향후 계획

| 우선순위 | 기능 | 설명 | 예상 기간 |
|---|---|---|---|
| 1 | **📝 시험 · 과제 시스템** | 문제 은행 DB, 자동/수동 채점, RLS 확장 | 6-8주 |
| 2 | **📅 학습 캘린더** | ICS 출력, 알림 연동, Google Calendar API 통합 | 3주 |
| 3 | **🔔 PWA 푸시 알림** | WebPush Subscription, 모바일 실시간 알림 | 2주 |
| 4 | **🤖 AI 자료 필터 & 자막** | Azure Vision API, 자동 콘텐츠 분석 | TBD |

---

## 용어 정의

| 한글 | 영어 | 정의 |
|---|---|---|
| **과목** | Lecture | 템플릿: 커리큘럼 · 강사 · 기관 · 학기 고정 |
| **회차 · 분반** | Class | 일정 · 장소 · 링크 포함 실행 인스턴스 |
| **수업실** | Classroom | 특정 Class의 가상 · 물리 교실 화면 |
| **검수** | Review | 관리자가 자료 내용을 확인하고 승인하는 과정 |

---

> **k-tomorrow LMS** — 다중 기관 · 접근성 강화 · 역할 기반 학습 관리 시스템
