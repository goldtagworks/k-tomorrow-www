# K-Tomorrow Landing Page: Deep Layout Analysis & Blueprint

> Layout architecture document for a distinctive multicultural education LMS landing page
> targeting Korean government institutions.

---

## Part 1: Diagnosis of the Current Site

### What went wrong

The backup `index.html` repeats a single structural formula across every section:

```
eyebrow (MULTICULTURAL SUPPORT / LMS PLATFORM / CORE VALUES / CORE SERVICE / PLATFORM / ROLL-OUT)
  -> h2
  -> p
  -> grid-3 or capability-grid of identical glass cards
```

Every section is center-aligned, uses the same `section-head` pattern, the same card anatomy (icon + h3 + ul), and the same reveal-up animation. The glassmorphism backdrop-filter is applied uniformly. The hero follows the safest possible pattern: centered text + 2 buttons + 2 summary cards below.

**Result**: A visitor scrolling through sees the same visual shape 6+ times. Nothing anchors any section in memory. A Korean government official reviewing this would categorize it alongside dozens of template-based vendor sites they see every quarter.

### Specific problems

| Problem | Where it shows up |
|---|---|
| **Identical vertical rhythm** | Every section uses the same padding, same centered head, same card grid |
| **No asymmetry anywhere** | Everything is center-aligned or symmetric 2-col / 3-col |
| **Cards as crutch** | 12+ cards all share the same visual weight and anatomy |
| **No storytelling arc** | Sections are independently readable slabs, not a narrative |
| **Hero is generic** | Tagbadge + h1 + p + 2 buttons is the single most common SaaS pattern |
| **No visual anchors** | Remove the headings and you cannot tell which section you are in |
| **Uniform glassmorphism** | Every surface has the same blur + border treatment |
| **No section transitions** | Sections are stacked blocks separated by padding |

---

## Part 2: Patterns from Best-in-Class Sites

### A. Linear.app - The "Dark Cinema" Approach

**Visual rhythm**: Linear alternates between full-bleed dark sections with a single large visual and tight text-only sections. The rhythm is: EXPANSIVE -> TIGHT -> EXPANSIVE -> TIGHT. This prevents monotony because the viewport density oscillates.

**Asymmetry**: Feature sections use a 60/40 split (large screenshot left, tight text right) that alternates sides. The text is never centered -- it is always pushed to one edge.

**Typography as design**: Linear uses its headline font at extreme sizes (clamp(2.5rem, 5vw, 4.5rem)) with tight letter-spacing (-0.03em). The headline IS the visual element, not a label for a visual element.

**Visual motif**: Gradient mesh backgrounds that shift color per section, creating a sense of "zones" as you scroll. Each section has its own color temperature.

**Takeaway for K-Tomorrow**: Use dramatic scale shifts between sections. Let some sections breathe with just a headline and a single visual, while others are information-dense.

### B. Vercel.com - The "Precision Grid" Approach

**Visual rhythm**: Vercel uses a bento grid for features (mixed 1x1, 2x1, 1x2 cells) then switches to a full-width social proof band, then back to a different grid density. The grid proportions themselves create rhythm.

**Section transitions**: Sections are not separated by whitespace alone -- they use color shifts (white -> near-black -> white), creating hard scene changes like chapters.

**Storytelling**: The page tells a story: "Here is the problem" (speed) -> "Here is the experience" (demo) -> "Here is the proof" (logos/metrics) -> "Here is the depth" (features) -> "Here is the community" (social proof). Each section has a narrative job.

**Visual anchors**: Each bento cell has a different internal layout. One cell might be a metric with a large number. Another might be a mini code snippet. Another might be an illustration. The bento prevents the "wall of same cards" problem.

**Takeaway for K-Tomorrow**: Use a bento/mosaic grid for the LMS features section, where each cell has a DIFFERENT visual treatment. Never make all cells look the same.

### C. Notion.so - The "Warm Editorial" Approach

**Hero treatment**: Notion does not center its hero. It uses a left-aligned editorial layout with the product screenshot taking up ~65% of the viewport width, bleeding off the right edge. Text is tucked into the left 35%.

**Typography**: Notion mixes serif and sans-serif in the same heading, creating visual texture. "Your wiki, docs, & projects. Together." uses weight contrast within a single sentence.

**Whitespace**: Notion uses dramatically more vertical padding between sections (200-300px equivalent) than typical SaaS sites. This creates a sense of premium quality -- the page is not afraid of emptiness.

**Section identity**: Each section has a unique background treatment. One might have a subtle dot grid. Another might have a warm gradient. Another is pure white. This means you always know WHERE you are on the page.

**Takeaway for K-Tomorrow**: Give the multicultural section and the LMS section completely different visual identities. Different background textures, different grid systems, different typographic scales.

### D. Stripe.com - The "Diagonal Energy" Approach

**Hero**: Stripe's hero uses a diagonal split -- code/product on one side at an angle, creating dynamic tension. Nothing is static or rectangular.

**Visual motif**: Gradient mesh with specific color nodes that shift as you scroll. The same gradient language connects every section but with different focal points.

**Asymmetry**: Feature sections use aggressive asymmetry -- sometimes 70/30 splits, sometimes full-bleed images with text overlaid in a narrow column.

**Data visualization as design**: Stripe turns its metrics into beautiful data visualizations, not just "big number + label" cards. Charts, animated counters, and flow diagrams serve as both information and decoration.

**Takeaway for K-Tomorrow**: Use the organizational hierarchy (system admin -> upper admin -> org admin -> teacher -> student) as a visual flow diagram, not a table or card grid.

### E. Korean Government Context: KRDS and What Stands Out

**KRDS (Korea Design System)**: The government's own design system (krds.go.kr) is clean but institutional. Most government sites built with it look identical -- blue/gray palette, same component library, same structure. This is actually an advantage: anything that deviates from that template while maintaining professionalism will immediately stand out.

**What Korean officials respond to**: Based on the institutional context:
- They need to see **credibility signals** (system architecture complexity, security features)
- They value **hierarchy visualization** (org trees, role structures)
- They are accustomed to **dense information** but respond to clarity
- Color palettes with teal/amber will feel modern but not frivolous
- The site needs to feel like a **product** not a **brochure**

---

## Part 3: The Unifying Visual Motif

### Concept: "The Bridge" (다리)

K-Tomorrow's name contains "Tomorrow" and its mission is about bridging cultures. The entire page should be held together by a recurring **arc/bridge motif** -- a subtle curved line that appears in different forms:

1. **In the hero**: A large decorative arc connecting the "multicultural" side to the "LMS" side
2. **As section dividers**: Instead of horizontal rules, gentle arcs that suggest connection
3. **In the org hierarchy diagram**: Curved connecting lines between nodes (not straight lines)
4. **In the rollout steps**: An arc path that the steps follow, not a straight timeline
5. **In background**: Subtle concentric arc patterns (like ripples) at section transitions

This arc is NOT decoration -- it is the visual language of "connection across difference," which is the brand's core message.

### Implementation

```css
/* The arc motif as a reusable CSS shape */
.arc-divider {
  width: 100%;
  height: 80px;
  background: none;
  border: none;
  position: relative;
}
.arc-divider::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 100%;
  border-bottom: 2px solid var(--teal-md);
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  opacity: 0.2;
}
```

The arc appears at 3 scales:
- **Macro**: Large background arcs (SVG, ~800px wide)
- **Meso**: Section divider arcs (~container width)
- **Micro**: Small connection arcs in diagrams and UI elements (~50-100px)

---

## Part 4: Section-by-Section Layout Blueprint

### Section 0: Navigation

**Pattern**: Transparent-to-solid on scroll, but with one difference: the nav includes a subtle "context indicator" -- a small colored dot (amber or teal) that appears next to the current section in the nav, showing which domain (multicultural or LMS) the user is currently viewing.

**Spec**: Height 64px. Logo left. Links center. CTA right. On scroll: `background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);` with bottom border `1px solid rgba(0,0,0,0.06)`.

---

### Section 1: Hero -- "The Split World"

**Pattern**: NOT centered text. A diagonal split-screen.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|   LEFT 55%                    RIGHT 45%              |
|   ┌──────────────────────┐   ┌─────────────────────┐ |
|   │                      │   │                     │ |
|   │  [Warm amber tint]   │   │  [Cool teal tint]   │ |
|   │                      │   │                     │ |
|   │  Small label:        │   │  Small label:       │ |
|   │  "다문화 가족 지원"      │   │  "LMS 플랫폼"       │ |
|   │                      │   │                     │ |
|   │  3-4 keywords        │   │  3-4 keywords       │ |
|   │  stacked vertically  │   │  stacked vertically │ |
|   │  in large serif      │   │  in large serif     │ |
|   │                      │   │                     │ |
|   └──────────────────────┘   └─────────────────────┘ |
|                                                      |
|            ┌─────────────────────────┐               |
|            │  LARGE HEADLINE         │               |
|            │  언어의 경계를 넘어        │               |
|            │  내일을 연결합니다         │               |
|            │                         │               |
|            │  Subtext + CTA buttons  │               |
|            └─────────────────────────┘               |
|                                                      |
|                    ╲___ARC MOTIF___╱                  |
+------------------------------------------------------+
```

**How it works**:
- The viewport is divided into two tinted zones (amber-left, teal-right) representing the two product pillars
- Between/below them sits the main headline, bridging both zones
- A large decorative arc SVG spans the bottom, connecting the two halves
- The two zones contain keyword stacks (not sentences), set in large serif type (Gowun Batang), e.g.:

  LEFT (amber):
  ```
  한국어 교육
  전문 인력 연계
  정서 케어
  ```

  RIGHT (teal):
  ```
  다중 기관 관리
  역할 기반 운영
  자동화 연동
  ```

**Why this works**: It immediately communicates the dual nature of the product. The visitor sees TWO domains in ONE glance. The arc connecting them tells the story of the brand. No government LMS competitor uses this layout.

**CSS Grid**:
```css
.hero-grid {
  display: grid;
  grid-template-columns: 55fr 45fr;
  grid-template-rows: auto auto;
  gap: 0;
  min-height: 85vh;
  align-items: end; /* keywords stack at bottom of zones */
}
.hero-headline {
  grid-column: 1 / -1; /* spans full width */
  text-align: center;
  padding: 3rem 0 4rem;
}
```

**Typography**:
- Keyword stacks: `Gowun Batang`, `clamp(1.5rem, 3vw, 2.8rem)`, `line-height: 1.3`, `font-weight: 700`
- Main headline: `Gowun Batang`, `clamp(2.2rem, 5vw, 4rem)`, `letter-spacing: -0.02em`
- Both use tight leading to feel editorial, not like a slide deck

**Mobile**: Stacks vertically. Keywords become a horizontal scroll strip. Headline stays centered.

---

### Section 2: "Social Proof Strip" -- Numbers That Breathe

**Pattern**: A narrow horizontal band with 3-4 key metrics. NOT cards. Just numbers floating in space.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|    14개 언어        6단계 역할 체계       3개 독립 포털    |
|    지원             RBAC               Admin·강사·수강생 |
|                                                      |
+------------------------------------------------------+
```

**Spec**:
- Background: `var(--bg)` with subtle horizontal line top and bottom
- Numbers: `font-size: clamp(2rem, 4vw, 3.5rem)`, `font-weight: 800`, color `var(--teal)` or `var(--warm)`
- Labels: `font-size: 0.875rem`, `color: var(--ink-2)`, `letter-spacing: 0.05em`
- Layout: `display: flex; justify-content: space-around;` with generous padding (6rem 0)
- Animation: Numbers count up on scroll-into-view (IntersectionObserver + requestAnimationFrame)
- NO cards, NO borders, NO backgrounds on individual items. Just typography floating in negative space.

**Why this works**: After the visually dense hero, this section is almost empty. The contrast in density creates rhythm. The large numbers serve as visual anchors. Government officials love seeing system capabilities quantified.

---

### Section 3: Multicultural Support -- "The Story Scroll"

**Pattern**: Sticky-scroll storytelling. LEFT column stays fixed (position: sticky), RIGHT column scrolls through content blocks.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|   STICKY LEFT 40%          SCROLLING RIGHT 60%       |
|   ┌────────────────┐      ┌────────────────────────┐ |
|   │                │      │                        │ |
|   │  Section title │      │  BLOCK 1: Mission      │ |
|   │  "다문화 가족    │      │  (full paragraph with  │ |
|   │   지원 사업"     │      │   warm amber accent    │ |
|   │                │      │   left border)          │ |
|   │  Decorative    │      │                        │ |
|   │  illustration  │      ├────────────────────────┤ |
|   │  (arc pattern  │      │                        │ |
|   │   in amber)    │      │  BLOCK 2: Core Values  │ |
|   │                │      │  (NOT cards -- instead  │ |
|   │  Scroll        │      │   3 rows, each with    │ |
|   │  progress      │      │   large number "01"    │ |
|   │  indicator     │      │   + title + text)      │ |
|   │                │      │                        │ |
|   │                │      ├────────────────────────┤ |
|   │                │      │                        │ |
|   │                │      │  BLOCK 3: Core Service │ |
|   │                │      │  (learning flow as     │ |
|   │                │      │   horizontal timeline  │ |
|   │                │      │   with arc connections) │ |
|   │                │      │                        │ |
|   └────────────────┘      └────────────────────────┘ |
|                                                      |
+------------------------------------------------------+
```

**Critical difference from current site**: Instead of 3 sub-sections each with `eyebrow + h2 + grid-3-cards`, this is ONE section with a sticky left panel and scrolling right content. The visual format changes with each block:

- **Block 1 (Mission)**: Pure text with a thick amber left border. No cards. Just a well-set paragraph.
- **Block 2 (Core Values)**: Numbered list format. Each item is:
  ```
  01 ─── IT 적정기술 활용
        현대 기술로 구현한 온라인 학습 플랫폼.
        실시간 코칭과 맞춤 커리큘럼을 연결합니다.
  ```
  The number `01` is set at `2.5rem`, `font-weight: 200`, `color: var(--warm-md)`. This is NOT a card. It is an editorial numbered list.

- **Block 3 (Core Service -- Korean education flow)**: A horizontal flow diagram using the arc motif:
  ```
  수준 진단 ──╮    ╭── 실시간 상호작용
              ╰────╯
         맞춤 경로 설계
  ```
  With each node being a small circle with text below, connected by arcs (not arrows).

**CSS for sticky scroll**:
```css
.multicultural-section {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 4rem;
}
.multicultural-sticky {
  position: sticky;
  top: 5rem;
  align-self: start;
  height: fit-content;
}
```

**Background**: Subtle warm gradient (amber at 5% opacity) with a faint arc pattern repeated at large scale in the background.

**Mobile**: Sticky behavior disabled. Left column becomes a top header. Blocks stack vertically.

---

### Section 4: Transition Moment -- "The Bridge"

**Pattern**: A full-width visual break between multicultural and LMS sections. NOT a simple divider.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|  ╲                                              ╱    |
|    ╲  "다문화 가족을 위한 지원이                   ╱      |
|      ╲  기관의 더 나은 교육 운영으로              ╱        |
|        ╲  이어집니다."                          ╱          |
|          ╲________ARC BRIDGE SVG__________╱            |
|                                                      |
+------------------------------------------------------+
```

**Spec**:
- Height: ~200px
- A large arc SVG spans the full width
- A single transitional sentence sits inside the arc
- Color transitions from amber tones to teal tones (CSS gradient on background)
- The arc is the bridge motif at its largest scale
- `font-style: italic`, `Gowun Batang`, `1.25rem`

**Why this works**: It narratively connects the two halves of the business. Instead of "Section A ends, Section B begins," the page says "A leads to B." This is storytelling.

---

### Section 5: LMS Platform -- "The Bento Architecture"

**Pattern**: Bento grid with mixed cell sizes, each cell having a DIFFERENT visual treatment.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|  Section Header (LEFT-ALIGNED, not centered)         |
|  "다중 기관 교육 운영 플랫폼"                            |
|                                                      |
|  ┌──────────────────────┐  ┌──────────┐  ┌────────┐ |
|  │                      │  │          │  │        │ |
|  │  LARGE CELL (2x2)    │  │ TALL (1x2)│  │ SM (1x1)│ |
|  │  Org hierarchy       │  │          │  │        │ |
|  │  interactive diagram │  │ Role     │  │ 14     │ |
|  │  showing 3-depth     │  │ cascade  │  │ 개 언어  │ |
|  │  tree structure      │  │ visual   │  │ 지원    │ |
|  │                      │  │          │  │        │ |
|  │                      │  │ admin    │  ├────────┤ |
|  │                      │  │   ↓      │  │        │ |
|  │                      │  │ teacher  │  │ SM (1x1)│ |
|  │                      │  │   ↓      │  │ PWA    │ |
|  │                      │  │ student  │  │ 모바일  │ |
|  │                      │  │          │  │        │ |
|  ├──────────────────────┤  └──────────┘  └────────┘ |
|  │                      │  ┌───────────────────────┐ |
|  │  WIDE CELL (2x1)     │  │                       │ |
|  │  Google Meet flow     │  │  WIDE CELL (2x1)      │ |
|  │  diagram with icons   │  │  Automation pipeline  │ |
|  │                      │  │  visual               │ |
|  └──────────────────────┘  └───────────────────────┘ |
|                                                      |
+------------------------------------------------------+
```

**Cell treatments** (each cell is visually DISTINCT):

1. **Large cell (Org hierarchy)**: A mini interactive tree diagram showing `시스템 관리자 > 상위기관 > 기관 > 강사 > 수강생`. Rendered as an actual tree with arc connections. Background: subtle teal gradient. No card border -- just a background fill with generous `border-radius: 1.5rem`.

2. **Tall cell (Role cascade)**: A vertical flow of role badges, each a different shade of teal, connected by thin lines. Pure graphic, minimal text.

3. **Small cell (Language count)**: Just the number `14` at `4rem` font size, with "개 언어 지원" below at `0.875rem`. Background: white. The number IS the design.

4. **Small cell (PWA)**: An icon of a phone outline with the K-Tomorrow logo inside. Text "모바일 최적화". Clean, icon-forward.

5. **Wide cell (Google Meet flow)**: A horizontal flow: `수업 생성 → Meet 자동 생성 → 캘린더 등록 → 녹화 수집`. With recognizable Google Meet and Calendar icons. Light teal background.

6. **Wide cell (Automation)**: A simplified pipeline visual: `업로드 → 검수 → 승인 → 공개`. With status dots (pending=yellow, approved=green). Shows the workflow visually, not as text.

**CSS Grid**:
```css
.lms-bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, minmax(180px, auto));
  gap: 1rem;
}
.bento-org      { grid-column: 1 / 3; grid-row: 1 / 3; }  /* 2x2 */
.bento-roles    { grid-column: 3; grid-row: 1 / 3; }       /* 1x2 */
.bento-lang     { grid-column: 4; grid-row: 1; }           /* 1x1 */
.bento-mobile   { grid-column: 4; grid-row: 2; }           /* 1x1 */
.bento-meet     { grid-column: 1 / 3; grid-row: 3; }       /* 2x1 */
.bento-auto     { grid-column: 3 / 5; grid-row: 3; }       /* 2x1 */
```

**Why this is different from the current site**: Instead of 4 identical cards with `icon + h3 + p`, every cell has a unique visual language. The bento layout itself creates asymmetry and visual interest. The eye has to actively explore the grid rather than skimming identical shapes.

**Mobile**: Collapses to a single column. Large cell first, then others stack. Each maintains its internal visual treatment.

---

### Section 6: Portal Showcase -- "The Three Windows"

**Pattern**: Three portal panels side-by-side at unequal widths, each showing a "screenshot-like" representation of the portal.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|  역할별 포털 구성                                      |
|                                                      |
|  ┌──────────────┐ ┌─────────────┐ ┌───────────────┐  |
|  │  ADMIN       │ │  TEACHER    │ │  STUDENT      │  |
|  │  45%         │ │  30%        │ │  25%          │  |
|  │              │ │             │ │               │  |
|  │  ╔═══════╗   │ │  ╔═══════╗  │ │  ╔═══════╗    │  |
|  │  ║ Mock  ║   │ │  ║ Mock  ║  │ │  ║ Phone ║    │  |
|  │  ║ UI    ║   │ │  ║ UI    ║  │ │  ║ Mock  ║    │  |
|  │  ║       ║   │ │  ║       ║  │ │  ║       ║    │  |
|  │  ╚═══════╝   │ │  ╚═══════╝  │ │  ╚═══════╝    │  |
|  │              │ │             │ │               │  |
|  │  Feature     │ │  Feature    │ │  Feature      │  |
|  │  list below  │ │  list below │ │  list below   │  |
|  └──────────────┘ └─────────────┘ └───────────────┘  |
|                                                      |
+------------------------------------------------------+
```

**Key details**:
- Widths are UNEQUAL (45/30/25) -- admin is largest because it is the primary buyer persona
- Each panel has a different top border color (admin: deep teal, teacher: medium teal, student: light teal/green)
- Inside each panel is a simplified UI mockup (not a screenshot, but a geometric representation using CSS shapes -- rectangles for sidebar, circles for avatars, lines for text). This feels like a product preview without needing actual screenshots.
- The student panel shows a phone-shaped frame (taller, narrower) to emphasize PWA/mobile
- On hover, panels slightly scale up (`transform: scale(1.02)`) and gain depth (`box-shadow`)
- Feature lists use checkmarks (not bullets), max 3 items each

**CSS Grid**:
```css
.portal-showcase {
  display: grid;
  grid-template-columns: 45fr 30fr 25fr;
  gap: 1.5rem;
  align-items: stretch;
}
```

---

### Section 7: "Why K-Tomorrow" -- "The Contrast Table"

**Pattern**: NOT a list of benefits. A visual comparison showing "before K-Tomorrow" vs "with K-Tomorrow" as a split layout.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|  왜 K-Tomorrow인가                                    |
|                                                      |
|  ┌─────────────────────┬─────────────────────────┐   |
|  │  WITHOUT            │  WITH K-TOMORROW         │   |
|  │  (muted, gray)      │  (vibrant, teal)         │   |
|  │                     │                          │   |
|  │  엑셀로 수강생 관리    │  ✦ 역할 기반 자동 관리      │   |
|  │  ─────────────────  │  ─────────────────────── │   |
|  │  메신저로 출석 확인    │  ✦ 원클릭 출석 + 통계       │   |
|  │  ─────────────────  │  ─────────────────────── │   |
|  │  수동 링크 공유       │  ✦ Meet 자동 생성 + 캘린더  │   |
|  │  ─────────────────  │  ─────────────────────── │   |
|  │  기관별 별도 시스템    │  ✦ 다중 기관 통합 운영      │   |
|  │  ─────────────────  │  ─────────────────────── │   |
|  │  한국어 단일 지원     │  ✦ 14개 언어 자동 전환      │   |
|  └─────────────────────┴─────────────────────────┘   |
|                                                      |
+------------------------------------------------------+
```

**Spec**:
- Left column: `color: var(--ink-3)` (gray), `text-decoration: line-through` on hover (animation), slightly smaller font
- Right column: `color: var(--ink)`, each item has a `✦` marker in `var(--teal-md)`
- Dividing line between columns: the arc motif rotated 90 degrees (a vertical arc)
- Each row animates in sequentially (stagger of 100ms) on scroll
- Background: left side has a very subtle warm/gray wash, right side is clean white

**Why this works**: Government officials evaluating LMS platforms are comparing options. This layout does the comparison FOR them, making the value proposition visceral rather than abstract. It also breaks the "eyebrow + h2 + cards" pattern completely.

**Mobile**: Stacks as before/after pairs vertically, with the "before" crossed out and "after" highlighted.

---

### Section 8: Rollout -- "The Arc Path"

**Pattern**: Steps arranged along a curved path (the arc motif), not a vertical numbered list.

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|  LMS 도입 절차                                        |
|                                                      |
|        ①                                             |
|      운영 진단                                         |
|    ╱          ╲                                       |
|   ╱            ╲                                      |
|  ╱     ②        ╲                                     |
| ╱    운영 설계     ╲                                    |
| ╲                  ╱                                   |
|  ╲     ③         ╱                                    |
|   ╲  이관 및 안정화 ╱                                    |
|    ╲            ╱                                      |
|     ╲__________╱                                      |
|                                                      |
+------------------------------------------------------+
```

**Implementation**: An SVG arc path with 3 nodes placed at intervals along it. Each node is a circle with a step number inside, and a text block adjacent. The path itself is animated (SVG stroke-dashoffset) on scroll, "drawing" the path as the user scrolls into view.

**Each step node** expands on hover/tap to show the detail paragraph.

**CSS/SVG**:
```html
<svg class="rollout-arc" viewBox="0 0 800 400">
  <path d="M100,350 C100,100 700,100 700,350"
        fill="none" stroke="var(--teal-md)" stroke-width="2"
        stroke-dasharray="1200" stroke-dashoffset="1200"
        class="rollout-path" />
  <!-- 3 circle nodes positioned along the path -->
</svg>
```

**Mobile**: Simplifies to a vertical timeline with arc-shaped connectors between steps.

---

### Section 9: Contact / CTA -- "The Warm Close"

**Pattern**: Asymmetric 60/40 split. Warm amber gradient background (connecting back to the multicultural mission).

**Layout**:
```
+------------------------------------------------------+
|                                                      |
|  LEFT 60%                   RIGHT 40%                |
|  ┌────────────────────┐    ┌─────────────────────┐   |
|  │                    │    │                     │   |
|  │  함께 만들어가요      │    │  Contact info      │   |
|  │                    │    │                     │   |
|  │  A warm, personal  │    │  Email              │   |
|  │  paragraph about   │    │  ─────────────      │   |
|  │  the mission.      │    │                     │   |
|  │                    │    │  Partners welcome   │   |
|  │  [문의하기] button  │    │  ─────────────      │   |
|  │                    │    │                     │   |
|  │                    │    │  Location           │   |
|  │                    │    │  ─────────────      │   |
|  └────────────────────┘    └─────────────────────┘   |
|                                                      |
|                  ╲___ARC MOTIF___╱                    |
|                  (final appearance)                   |
|                                                      |
+------------------------------------------------------+
```

**Spec**:
- Background: warm gradient (amber at 8% opacity)
- The headline "함께 만들어가요" in `Gowun Batang` at display size
- Contact info is plain text, no card wrapping
- Single primary CTA button: `background: var(--teal); color: white; padding: 1rem 2.5rem; border-radius: 0.75rem;`
- The arc motif appears one final time below, closing the visual story

---

## Part 5: Visual Rhythm Map

Here is the density/energy graph of the page as you scroll:

```
Section        Visual Density    Energy    Background
──────────────────────────────────────────────────────
Hero           ████████░░        HIGH      Split amber/teal zones
Numbers        ██░░░░░░░░        LOW       Neutral, breathing room
Multicultural  ██████░░░░        MEDIUM    Warm amber wash
Bridge         ███░░░░░░░        LOW       Gradient transition
LMS Bento      ████████░░        HIGH      Clean white + teal cells
Portals        ██████░░░░        MEDIUM    Subtle teal wash
Why K-T        █████░░░░░        MEDIUM    Split gray/white
Rollout        ███░░░░░░░        LOW       Neutral
Contact        ████░░░░░░        MEDIUM    Warm amber wash
```

The pattern is: **HIGH -> LOW -> MEDIUM -> LOW -> HIGH -> MEDIUM -> MEDIUM -> LOW -> MEDIUM**

This oscillation prevents fatigue. The eye gets dense information, then rests, then engages again. The current site is: MEDIUM -> MEDIUM -> MEDIUM -> MEDIUM -> MEDIUM -- flat and fatiguing.

---

## Part 6: Typography System

### Scale

| Element | Font | Size | Weight | Letter-spacing |
|---|---|---|---|---|
| Hero keyword stacks | Gowun Batang | clamp(1.5rem, 3vw, 2.8rem) | 700 | -0.01em |
| Hero headline | Gowun Batang | clamp(2.2rem, 5vw, 4rem) | 700 | -0.02em |
| Section titles | Gowun Batang | clamp(1.75rem, 3.5vw, 2.5rem) | 700 | -0.015em |
| Bento cell headlines | Pretendard | 1.25rem | 600 | 0 |
| Body text | Pretendard | 1rem | 400 | 0 |
| Eyebrow labels | Pretendard | 0.75rem | 600 | 0.08em |
| Large numbers | Pretendard | clamp(2rem, 4vw, 3.5rem) | 800 | -0.02em |
| Small labels | Pretendard | 0.8125rem | 400 | 0 |

### Key principle

Use Gowun Batang (serif) ONLY for display text -- headlines, pull quotes, and the hero. Everything else is Pretendard. This creates a clear typographic hierarchy and makes the serif moments feel special, not overused.

---

## Part 7: Interaction & Motion

### Scroll-triggered animations

| Element | Animation | Trigger |
|---|---|---|
| Hero keyword stacks | Fade in + slide up from 20px, 400ms, staggered 100ms | Page load |
| Number counters | Count from 0 to target value, 1200ms, ease-out | IntersectionObserver 0.3 |
| Multicultural blocks | Fade in, 300ms | IntersectionObserver 0.2 |
| Bento cells | Scale from 0.95 + fade in, staggered 80ms | IntersectionObserver 0.1 |
| Comparison rows | Slide in from left/right respectively, staggered 100ms | IntersectionObserver 0.2 |
| Rollout arc path | SVG stroke-dashoffset animation, 1500ms | IntersectionObserver 0.3 |
| Arc motif (bridge) | Fade in + slight scale, 600ms | IntersectionObserver 0.5 |

### Sticky scroll (multicultural section)

```javascript
// No JS needed -- CSS position: sticky handles it
// But we add a scroll progress indicator:
const stickySection = document.querySelector('.multicultural-sticky');
const scrollArea = document.querySelector('.multicultural-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Update progress bar in sticky panel based on scroll position
    const progress = 1 - entry.intersectionRatio;
    stickySection.style.setProperty('--scroll-progress', progress);
  });
}, { threshold: Array.from({length: 100}, (_, i) => i / 100) });
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Part 8: Color Zones

Instead of a single background color, the page uses **color zones** that shift as you scroll:

| Section | Background treatment |
|---|---|
| Hero | Split: left = `rgba(180,83,9,0.04)`, right = `rgba(13,148,136,0.04)` |
| Numbers | `#f4f7fb` (neutral) |
| Multicultural | `rgba(254,243,199,0.15)` (warm wash) |
| Bridge | Gradient from warm to teal |
| LMS Bento | `#ffffff` (clean white) |
| Portals | `rgba(204,251,241,0.12)` (cool wash) |
| Why K-Tomorrow | Split: left = `#f5f5f5`, right = `#ffffff` |
| Rollout | `#f4f7fb` (neutral) |
| Contact | `rgba(254,243,199,0.15)` (warm, bookending with multicultural) |

This creates a sense of **place** -- you can tell where you are on the page by the ambient color, even without reading headings.

---

## Part 9: What Makes This Different

### vs. Generic SaaS template
- Split hero instead of centered text
- Bento grid instead of uniform card grid
- Sticky scroll storytelling instead of section repetition
- Comparison table instead of benefit list
- Arc path instead of numbered vertical steps
- Color zones instead of uniform background

### vs. Typical Korean government vendor sites
- Editorial typography with serif/sans pairing
- Asymmetric layouts throughout
- Visual motif (arc/bridge) creating brand identity
- Interactive elements (counting numbers, drawing paths)
- Dense information presented with typographic hierarchy, not card padding

### vs. The previous K-Tomorrow attempt
- 7 different layout patterns vs. 1 repeated pattern
- Visual rhythm that oscillates vs. flat density
- Narrative flow (problem -> bridge -> solution -> proof -> CTA) vs. independent slabs
- Each section has its own identity vs. all sections look the same
- Arc motif as connecting thread vs. no visual motif

---

## Sources

- [12 Best SaaS Landing Page Examples of 2026](https://swipepages.com/blog/12-best-saas-landing-page-examples-of-2026/)
- [10 SaaS Landing Page Trends for 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)
- [Top Landing Page Design Trends for B2B SaaS in 2026](https://www.saashero.net/content/top-landing-page-design-trends/)
- [Stunning Hero Sections for 2026](https://lexingtonthemes.com/blog/stunning-hero-sections-2026)
- [Hero Section Design: Best Practices & Examples for 2026](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Bento Grid Design Guide 2026](https://landdding.com/blog/blog-bento-grid-design-guide)
- [Designing Bento Grids That Actually Work: 2026](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide)
- [KRDS: Korea Government Design System](https://www.krds.go.kr/)
- [Awwwards: Culture & Education Websites](https://www.awwwards.com/websites/culture-education/)
- [Best Education Website Designs of 2026 - DesignRush](https://www.designrush.com/best-designs/websites/education)
- [Linear App Style Landing Page Collection - Figma](https://www.figma.com/community/file/1367670334751609522/linear-app-style-landing-page-collection-50-sections-100-editable-free)
- [Brand Patterns Guide: Elevate Your Visual Identity](https://www.kedraco.com/blogs/brand-patterns)
