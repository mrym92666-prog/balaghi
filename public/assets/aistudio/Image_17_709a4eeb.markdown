---
name: Balaghi Civic Pulse
colors:
  surface: '#f3faff'
  surface-dim: '#bedfef'
  surface-bright: '#f3faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e6f6ff'
  surface-container: '#d8f2ff'
  surface-container-high: '#ccedfe'
  surface-container-highest: '#c6e8f8'
  on-surface: '#001f29'
  on-surface-variant: '#3f484a'
  inverse-surface: '#123441'
  inverse-on-surface: '#dff4ff'
  outline: '#6f797a'
  outline-variant: '#bfc8c9'
  surface-tint: '#20686f'
  primary: '#004349'
  on-primary: '#ffffff'
  primary-container: '#0d5c63'
  on-primary-container: '#90d2da'
  inverse-primary: '#8fd1d9'
  secondary: '#a33d23'
  on-secondary: '#ffffff'
  secondary-container: '#ff8162'
  on-secondary-container: '#731a04'
  tertiary: '#00443d'
  on-tertiary: '#ffffff'
  tertiary-container: '#005e54'
  on-tertiary-container: '#70d9c9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#abeef6'
  primary-fixed-dim: '#8fd1d9'
  on-primary-fixed: '#002023'
  on-primary-fixed-variant: '#004f55'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0700'
  on-secondary-fixed-variant: '#83260e'
  tertiary-fixed: '#8cf5e4'
  tertiary-fixed-dim: '#6fd8c8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#f3faff'
  on-background: '#001f29'
  surface-variant: '#c6e8f8'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-xl:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.2px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.3px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.4px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system is engineered for civic engagement and urban co-responsibility across Moroccan municipalities. It bridges literacy divides through an ultra-accessible, visually unambiguous interface that empowers every resident—regardless of literacy level, digital fluency, or regional language—to report issues like waste overflow, broken streetlights, road potholes, and water leaks.

The visual style blends modern utilitarianism with warm Mediterranean and North African civic pride. It utilizes high visual affordance: generous touch targets (minimum 56px), bold universally recognizable dual-coded pictograms (combining imagery with audio affordance), vibrant functional color feedback, and instant kinetic confirmation. The emotional tone fosters trust, civic responsibility, transparency, and immediate agency.

## Colors

The color palette prioritizes cognitive clarity and strict semantic associations to eliminate ambiguity across public reporting flows:

- **Primary (`#0D5C63`)**: Deep Teal serves as the core institutional and navigational anchor. It establishes trust, authority, and official stability across primary cards, top app bars, and main affirmative call-to-actions.
- **Secondary (`#E76F51`)**: Warm Terracotta Orange signals progressive states ("En cours / قيد المعالجة"), pending reviews, active sync warnings, and follow-up alerts.
- **Tertiary (`#2A9D8F`)**: Bright Jade Green conveys positive resolutions ("Résolu / تم الإصلاح"), completed uploads, and safe conditions.
- **Neutral (`#264653` / Canvas Tint `#F8FAF9`)**: Dark Slate provides strong textual and iconographic contrast meeting WCAG AAA specifications, while soft off-white surface layers reduce screen glare in bright outdoor environments.
- **Alert & Urgency (`#E63946`)**: High-saturation Crimson reserved strictly for critical urban hazards, blocked sewer mains, dangerous live wiring, and network timeouts.
- **Civic Action / Community (`#6C5CE7` / Indigo)**: Employed for community endorsements ("Moi aussi / أنا أيضاً") to distinguish collective civic participation from administrative actions.

## Typography

Inter was selected for its open apertures, tall x-height, and neutral geometry, ensuring high legibility under direct sunlight on low-cost mobile displays.

Because the system supports multi-lingual contexts (French and Arabic Darija) and accommodates varying literacy levels, typographic styling always operates at heavier weights (600–800) for headlines and functional labels. Text labels never stand alone for essential tasks; they accompany bold pictograms and optional speaker-icon audio prompts ("Écouter / استمع").

## Layout & Spacing

The layout is built mobile-first around an accessible 4-column grid for mobile screens (320px–599px) and transforms into an 8-column layout for tablets and a 12-column fixed container (max-width 1140px) for administrative back-office displays.

Spacers adhere to an 8pt spatial grid:
- **Base Grid**: Gutter of `1rem` (16px) and responsive side margin of `1.25rem` (20px) on mobile, widening to `2rem` (32px) on desktop viewports.
- **Card Padding**: Fixed at `space-lg` (24px) for interactive reporting tiles to comfortably house touch zones and graphic illustrations.
- **Reflow & Hierarchy**: Stacked vertical stepping ensures the citizen flow proceeds seamlessly from:
  1. Incident Category Card
  2. Large One-Tap Photo Trigger
  3. Geolocation Map Pinning
  4. Audio Note / Dictation
  5. High-contrast Submission CTA

## Elevation & Depth

To prevent visual noise and ensure predictable touch targets for all citizens, the elevation model employs tactile tonal layering combined with soft, warm-tinted ambient shadows:

- **Level 0 (Flat Canvas)**: Neutral surface `#F6FAF9`.
- **Level 1 (Interactive Cards & Categories)**: White container (`#FFFFFF`) with a 1.5px subtle border (`#E1E8E6`) and an ambient drop shadow: `0 4px 12px -2px rgba(13, 92, 99, 0.08)`.
- **Level 2 (Active States, Audio Trigger, Floating Report Buttons)**: Lifted surface with `0 8px 24px -4px rgba(13, 92, 99, 0.16)`.
- **Level 3 (Modals, Offline Banner, Confirmation Drawers)**: High-prominence surface with `0 16px 36px -6px rgba(38, 70, 83, 0.24)`.
- **Offline & Warning Bars**: Flat, tinted banner containers with high-contrast borders and tactile iconography to indicate unsent reports cached for network reconnection.

## Shapes

The design system uses level `2` (Rounded) geometry:
- Standard buttons and input containers: `0.5rem` (8px).
- Category tiles, report cards, and modal sheets: `1rem` (16px) for `rounded-lg`.
- Prominent action badges, status tags, and audio playheads: `1.5rem` (24px) for `rounded-xl` or full circular encapsulation for icon buttons (camera shutter, voice recorder, map locator).

This corner radius provides a friendly, welcoming aesthetic while maintaining structural stability and clear geometric separation.

## Components

### 1. Primary Action Buttons
- **Touch Target**: Minimum height 56px, full width on mobile viewports.
- **Visuals**: Solid `#0D5C63` background, pure white bold text (`label-lg`), paired with an unmistakable forward icon (arrow or paper airplane).
- **Feedback**: Subtle scale down (0.98x) and tactile haptic pulse on release.

### 2. Universal Category Picker (Voirie, Éclairage, Déchets, Eau)
- **Geometry**: Symmetrical two-column grid tiles with minimum height 120px.
- **Affordance**: 48px high-contrast duo-tone icons, prominent label, and top-right audio icon to read the category aloud in Moroccan Darija/French.
- **States**: Default border `#E1E8E6`; Selected state triggers a 3px `#0D5C63` border with a subtle 10% primary background tint and green checkmark badge.

### 3. Voice Note & Audio Accessibility Component
- **Micro-Interaction**: Large circular microphone button (64px) with pulse animation during recording.
- **Audio Playback**: Waveform visualizer accompanied by a single play/pause button for citizens who prefer listening to summary confirmation over reading.

### 4. Status Progression Chips & Badges
- **Nouveau / Reçu**: Deep Teal `#0D5C63` tint, indicates municipality has received the ticket.
- **En cours**: Secondary Terracotta `#E76F51`, indicates roadwork/cleanup crew dispatched.
- **Résolu**: Jade Green `#2A9D8F`, displays before/after split thumbnail preview.
- **Relance / Moi aussi**: Pill-shaped chip displaying dynamic counter badge (`+14`) in community purple (`#6C5CE7`).

### 5. Offline Queue Banner
- **Format**: Fixed persistent bottom notification (`#FFF3CD` with `#E76F51` border).
- **Message**: "Pas de réseau — Signalement sauvegardé, envoi automatique dès reconnexion" with an amber cloud-sync icon.