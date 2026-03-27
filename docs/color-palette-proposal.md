# K-Tomorrow Color Palette Proposal

> 3 Original Palette Options for a Multicultural Family Support & Education LMS
>
> Date: 2026-03-28 | Target: Korean government institutions, multicultural centers, elderly & foreign users

---

## Research Summary

### KRDS (Korean Government Design System) Context

The Korean Government Design System (KRDS, updated January 2025) uses government blue, government gray, and government red as its foundation colors. All KRDS colors comply with WCAG AA (4.5:1 for normal text, 3:1 for large text) across 13 lightness steps. K-Tomorrow's palette should feel compatible with the government ecosystem without duplicating KRDS blue exactly -- showing institutional alignment while maintaining a distinct brand identity.

### Korean EdTech Landscape

- **QANDA (Mathpresso)**: Orange-dominant brand. Energetic, youth-oriented.
- **Riiid (Santa TOEIC)**: Purple-blue AI-focused palette. Tech-forward, cold.
- **Elice**: Violet/purple. Developer-education focused.
- **Classting**: Green. Social-learning elementary focus.

K-Tomorrow must differentiate from all of these. The platform serves elderly learners, government decision-makers, and multicultural families -- a fundamentally different audience than the typical consumer EdTech startup.

### Color Psychology for This Audience

| Audience Segment | What They Need to Feel | Color Direction |
|---|---|---|
| Korean government officials | Authority, compliance, reliability | Deep blue-adjacent, not playful |
| Multicultural families | Warmth, welcome, cultural respect | Earth tones, warm accents (not cold) |
| Elderly users (65+) | Clarity, comfort, readability | High contrast, warm neutrals |
| Foreign learners | Universality, openness, safety | Avoid culturally loaded colors |

### Key Design Principles

1. **Warm neutrals over cold grays** -- elderly users perceive warm backgrounds as more comfortable
2. **Earth-inspired accents** -- universally positive across East Asian, Southeast Asian, and Central Asian cultures
3. **Deep primaries** -- government trust without generic "startup blue"
4. **Avoid**: Pure teal (#0f766e), standard amber (#b45309), generic purple, dark mode bias

---

## Colors Explicitly Avoided

| Color | Hex | Reason |
|---|---|---|
| Tailwind Teal-700 | `#0f766e` | Generic, overused in SaaS templates |
| Tailwind Amber-700 | `#b45309` | Common default, no brand identity |
| Generic Blue-600 | `#2563eb` | Looks like every SaaS landing page |
| Purple variants | `#7c3aed` etc. | Overused in AI/EdTech (Elice, Riiid) |

---

## Palette 1: HORIZON (수평선)

> *"The first light of dawn over a new homeland"*

### Concept

Midnight Sapphire is a deeply saturated navy-blue with subtle warmth that evokes the predawn sky -- the moment before "tomorrow" arrives. Paired with Terracotta, an earth clay tone found across Korean, Vietnamese, Indonesian, and Central Asian ceramics, it creates a "bridge between cultures" through shared material heritage. This palette says: *stable institution, human warmth*.

### Colors

| Role | Name | Hex | Usage | Contrast on White |
|---|---|---|---|---|
| **Primary** | Midnight Sapphire | `#1B3A5C` | Headers, nav, primary buttons, trust elements | 11.63:1 PASS |
| **Primary Medium** | Horizon Blue | `#2A5A8C` | Links, secondary buttons, active states | 7.14:1 PASS |
| **Primary Light** | Dawn Mist | `#E8EEF5` | Card backgrounds, hover states | -- (bg only) |
| **Accent** | Terracotta | `#A8533A` | CTA buttons, highlights, warm emphasis | 5.30:1 PASS |
| **Accent Medium** | Clay | `#C4694A` | Icons, decorative elements (large text only) | 3.84:1 (large only) |
| **Accent Light** | Blush Sand | `#FAE8E0` | Accent backgrounds, notification badges | -- (bg only) |
| **Text Primary** | Deep Navy Ink | `#1A1A2E` | Body text, headings | 17.06:1 PASS |
| **Text Secondary** | Warm Slate | `#4A5568` | Captions, descriptions, metadata | 7.53:1 PASS |
| **Text Muted** | Silver Fog | `#94A3B8` | Placeholders, disabled states (large only) | 2.56:1 (decorative) |
| **BG Main** | Warm Parchment | `#F5F3EF` | Page background | -- |
| **BG Card** | White | `#FFFFFF` | Card surfaces, modals | -- |
| **Border** | Sandstone | `#D4D0C8` | Dividers, card borders | -- |

### CSS Custom Properties

```css
:root {
    --primary:      #1B3A5C;
    --primary-md:   #2A5A8C;
    --primary-lt:   #E8EEF5;
    --accent:       #A8533A;
    --accent-md:    #C4694A;
    --accent-lt:    #FAE8E0;
    --ink:          #1A1A2E;
    --ink-2:        #4A5568;
    --ink-3:        #94A3B8;
    --bg:           #F5F3EF;
    --bg-card:      #FFFFFF;
    --border:       #D4D0C8;
}
```

### Why This Works

- **Government trust**: Midnight Sapphire reads as institutional authority without being generic blue. It is darker and more complex than KRDS blue, positioning K-Tomorrow as a premium government-adjacent service.
- **Multicultural warmth**: Terracotta is one of the few colors found in traditional ceramics across Korea (옹기), Vietnam, Philippines, Thailand, and Central Asia. It creates an immediate sense of shared heritage.
- **Elderly readability**: 11.63:1 primary contrast and warm parchment background reduce eye strain in extended reading sessions.
- **Distinctiveness**: No major Korean EdTech uses this combination. The sapphire-terracotta pairing is associated with museums and cultural institutions -- fitting for a "bridge between cultures" platform.

---

## Palette 2: SEEDLING (새싹)

> *"Knowledge grows from deep roots into golden light"*

### Concept

Dusk Indigo combines the trustworthiness of blue with the depth of twilight -- a color that sits between the institutional and the imaginative. Golden Ochre draws from Korean Buddhist temple palettes (dancheong), autumn ginkgo leaves, and the golden hues found in Islamic calligraphy and Southeast Asian textiles. This palette evokes "wisdom passed between generations."

### Colors

| Role | Name | Hex | Usage | Contrast on White |
|---|---|---|---|---|
| **Primary** | Dusk Indigo | `#2D3B55` | Headers, nav, primary buttons | 11.24:1 PASS |
| **Primary Medium** | Twilight Blue | `#4A6FA5` | Links, secondary actions | 5.11:1 PASS |
| **Primary Light** | Misty Indigo | `#E6ECF5` | Card backgrounds, subtle highlights | -- (bg only) |
| **Accent** | Golden Ochre | `#9A6010` | CTA buttons, important highlights | 5.18:1 PASS |
| **Accent Medium** | Amber Gold | `#C17817` | Icons, decorative (large text only) | 3.52:1 (large only) |
| **Accent Light** | Candlelight | `#FBF0DC` | Warm background accents | -- (bg only) |
| **Text Primary** | Ink Black | `#1C1C28` | Body text, headings | 16.85:1 PASS |
| **Text Secondary** | Cool Slate | `#535A6B` | Captions, descriptions | 6.90:1 PASS |
| **Text Muted** | Haze | `#8E95A5` | Placeholders (large only) | 3.00:1 (large only) |
| **BG Main** | Warm Ivory | `#F7F5F0` | Page background | -- |
| **BG Card** | White | `#FFFFFF` | Cards, modals | -- |
| **Border** | Flax | `#D8D4CC` | Dividers, borders | -- |

### CSS Custom Properties

```css
:root {
    --primary:      #2D3B55;
    --primary-md:   #4A6FA5;
    --primary-lt:   #E6ECF5;
    --accent:       #9A6010;
    --accent-md:    #C17817;
    --accent-lt:    #FBF0DC;
    --ink:          #1C1C28;
    --ink-2:        #535A6B;
    --ink-3:        #8E95A5;
    --bg:           #F7F5F0;
    --bg-card:      #FFFFFF;
    --border:       #D8D4CC;
}
```

### Why This Works

- **Government trust**: Dusk Indigo is deeper and more dignified than standard corporate blue. Korean government officials associate deep indigo tones with formality (think of traditional 남색/indigo dyeing in Korean culture).
- **Multicultural warmth**: Golden Ochre is universally positive -- it appears in Korean temple decoration (단청), Vietnamese silk, Thai Buddhist art, and Central Asian tilework. It communicates "precious knowledge" without being culturally exclusive.
- **Elderly readability**: The indigo-on-ivory combination is gentler on aging eyes than black-on-white, while maintaining exceptional contrast (11.24:1). The warm ivory background reduces the harsh glare of pure white screens.
- **Distinctiveness**: This palette feels like a prestigious university or cultural institution -- appropriate for a government LMS that serves educational purposes. The golden ochre accent is distinctly NOT Tailwind amber (#b45309); it is darker, richer, and more dignified.

---

## Palette 3: HANJI (한지)

> *"Korean paper carries the world's stories"*

### Concept

Deep Celadon references Korea's most iconic contribution to world ceramics -- the 고려청자 (Goryeo celadon) green -- but pushed darker to avoid looking like generic teal. Persimmon Red (감색) references the traditional Korean persimmon-dyeing technique, creating a palette that is unmistakably Korean while remaining warm and accessible. Hanji (한지, Korean paper) inspires the warm off-white backgrounds. This is the most culturally rooted option.

### Colors

| Role | Name | Hex | Usage | Contrast on White |
|---|---|---|---|---|
| **Primary** | Deep Celadon | `#1E5E4E` | Headers, nav, primary buttons | 7.59:1 PASS |
| **Primary Medium** | Jade Mist | `#3D9B84` | Decorative, large text, icons | 3.38:1 (large only) |
| **Primary Light** | Celadon Wash | `#E3F2ED` | Card backgrounds, highlights | -- (bg only) |
| **Accent** | Persimmon Red | `#A84835` | CTA buttons, warm emphasis | 5.76:1 PASS |
| **Accent Medium** | Autumn Gam | `#C05640` | Secondary warm elements | 4.52:1 PASS |
| **Accent Light** | Blush Clay | `#FAEAE5` | Notification backgrounds | -- (bg only) |
| **Text Primary** | Forest Ink | `#1B2420` | Body text, headings | 15.91:1 PASS |
| **Text Secondary** | Sage Slate | `#4D5B56` | Captions, metadata | 7.13:1 PASS |
| **Text Muted** | Moss | `#8A9690` | Placeholders (large only) | 3.07:1 (large only) |
| **BG Main** | Hanji Warm | `#F6F4F0` | Page background (like hanji paper) | -- |
| **BG Card** | White | `#FFFFFF` | Cards, modals | -- |
| **Border** | Rice Straw | `#D2CFC8` | Dividers, borders | -- |

### CSS Custom Properties

```css
:root {
    --primary:      #1E5E4E;
    --primary-md:   #3D9B84;
    --primary-lt:   #E3F2ED;
    --accent:       #A84835;
    --accent-md:    #C05640;
    --accent-lt:    #FAEAE5;
    --ink:          #1B2420;
    --ink-2:        #4D5B56;
    --ink-3:        #8A9690;
    --bg:           #F6F4F0;
    --bg-card:      #FFFFFF;
    --border:       #D2CFC8;
}
```

### Why This Works

- **Government trust**: Deep Celadon connects to Korean national heritage (Goryeo celadon is a National Treasure). This creates an emotional association with Korean cultural pride that resonates strongly with government decision-makers. Critically, `#1E5E4E` is NOT Tailwind teal (`#0f766e`) -- it has more yellow warmth and less blue, giving it the distinct character of actual celadon glaze.
- **Multicultural warmth**: Persimmon Red is a warm, earthy red-orange found in Korean traditional dyeing, Japanese autumn festivals, and Southeast Asian textiles. Unlike "hot" reds that can feel aggressive, persimmon red is gentle and inviting.
- **Elderly readability**: The warm hanji-paper background and high-contrast forest ink text (15.91:1) provide excellent readability. The green-red complementary relationship creates natural visual hierarchy.
- **Distinctiveness**: This is the most uniquely "K-Tomorrow" option. No other Korean EdTech platform combines celadon and persimmon. It would immediately communicate "Korean cultural platform" while the warm tones signal inclusivity.

---

## Comparison Matrix

| Criterion | Horizon (수평선) | Seedling (새싹) | Hanji (한지) |
|---|---|---|---|
| **Government trust** | Strong (institutional navy) | Strong (formal indigo) | Strong (cultural pride) |
| **Multicultural warmth** | Good (terracotta = shared ceramics) | Good (golden = shared reverence) | Moderate (Korean-centric) |
| **Elderly readability** | Excellent (11.63:1) | Excellent (11.24:1) | Very Good (7.59:1) |
| **Cultural bridge feeling** | High | High | Moderate-High |
| **Uniqueness** | High | High | Very High |
| **Distance from Tailwind** | Very far | Very far | Far (celadon distinct from teal) |
| **Distance from competitors** | Very far from all | Very far from all | Far from all |
| **Korean gov alignment** | Compatible | Compatible | Deeply Korean |
| **Best for** | International/global feel | Prestigious/educational feel | Culturally rooted Korean identity |

---

## Recommendation

**For K-Tomorrow specifically, Palette 1 (Horizon) is the strongest choice** for these reasons:

1. **Broadest cultural appeal**: Terracotta is found in ceramics across ALL the multicultural target cultures (Korea, Vietnam, Philippines, Central Asia, etc.), making no single culture feel excluded.

2. **Strongest contrast numbers**: 11.63:1 primary contrast is the highest, critical for elderly users with declining vision.

3. **Maximum distance from Tailwind defaults**: Midnight Sapphire (#1B3A5C) and Terracotta (#A8533A) are completely different hue families from Tailwind teal and amber.

4. **Government-appropriate gravitas**: The deep sapphire reads as authoritative without being cold or generic.

5. **"Tomorrow" narrative**: The dawn/horizon metaphor aligns perfectly with the K-Tomorrow brand name -- the sky before sunrise, the promise of a new day.

**Alternative consideration**: If the client wants maximum Korean cultural identity, Palette 3 (Hanji) is the best choice, but it risks feeling less universal for non-Korean multicultural users.

---

## App-Specific Theme Variations

Following the existing theme structure from the LMS specification:

| App | Theme | Primary Shade | Accent Usage | Personality |
|---|---|---|---|---|
| **Admin** (`adminSecure`) | Uses Primary at full depth | `#1B3A5C` | Minimal accent, data-focused | Professional, authoritative |
| **Teacher** (`teacherTrust`) | Uses Primary Medium | `#2A5A8C` | More accent for warmth | Warm, supportive |
| **Student** (`studentGrowth`) | Uses Accent as primary | `#A8533A` | Accent-forward, inviting | Friendly, encouraging |

---

## Accessibility Notes

- All primary and accent colors pass WCAG AA (4.5:1) for normal text on both white and warm backgrounds
- "Medium" variants are reserved for large text (18px+) or decorative/non-text elements only
- "Muted" text colors are for placeholder/disabled states and should never carry essential information
- Background light variants are for surfaces only, never for text
- All palettes use warm off-white backgrounds (not pure white) to reduce eye strain for elderly users
- Button text should always be white (#FFFFFF) on primary/accent backgrounds

---

## Sources

- [KRDS Color Style Guide](https://www.krds.go.kr/html/site/style/style_02.html)
- [KRDS Design System Overview](https://designcompass.org/2024/04/17/krds/)
- [KRDS Design Token Documentation](https://www.krds.go.kr/html/site/style/style_07.html)
- [KRDS v1.0.0 Figma Library](https://www.figma.com/community/file/1452915208095182951/krds-v1-0-0)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Psychology in Web Design (2025)](https://abp.io/community/articles/color-psychology-in-web-design-z383jph8)
- [Inclusive Color Palettes for Education](https://materialui.co/blog/accessible-color-palettes-for-inclusive-learning)
- [Color Trends 2026 for Branding](https://www.freelogoservices.com/blog/color-trends-2026/)
- [Startup Color Palettes 2025](https://medium.com/@huedserve/best-startup-color-palette-ideas-in-2025-c7b66ea0f19e)
- [U.S. Web Design System Color Guidance](https://designsystem.digital.gov/design-tokens/color/overview/)
