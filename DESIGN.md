---
name: Leandro Oriel Romero Portfolio
colors:
  # Using explicit brand token mapping to bypass automatic tool reclassification (e.g., Stitch remapping)
  brand-dominant-100: "#E3F6FF"
  brand-dominant-200: "#AAE4FF"
  brand-dominant-300: "#71D1FF"
  brand-dominant-400: "#39BFFF"
  brand-dominant-500: "#00ADFF"  # Core identity sky blue
  brand-dominant-600: "#0087C6"
  brand-dominant-700: "#00608E"
  brand-dominant-800: "#003A55"
  brand-dominant-900: "#00131C"

  brand-action-100: "#FFECE3"
  brand-action-200: "#FFC5AA"
  brand-action-300: "#FF9F71"
  brand-action-400: "#FF7839"
  brand-action-500: "#FF5200"    # High-contrast action deep orange
  brand-action-600: "#C64000"
  brand-action-700: "#8E2E00"
  brand-action-800: "#551B00"
  brand-action-900: "#1C0900"

  brand-neutral-100: "#EFF2F3"
  brand-neutral-200: "#CED7DB"
  brand-neutral-300: "#ADBCC3"
  brand-neutral-400: "#8DA2AB"
  brand-neutral-500: "#6C8793"
  brand-neutral-600: "#546972"
  brand-neutral-700: "#3C4B52"
  brand-neutral-800: "#242D31"
  brand-neutral-900: "#0C0F10"    # Deep interface background canvas

typography:
  fontDisplay: "Plus Jakarta Sans, sans-serif"
  fontBody: "IBM Plex Sans, sans-serif"
  fontCode: "IBM Plex Mono, monospace"
  fontAccessible: "Atkinson Hyperlegible, sans-serif"
  
  h1:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "3rem"
    fontWeight: "300"
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "2.25rem"
    fontWeight: "400"
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "IBM Plex Sans"
    fontSize: "1.25rem"
    fontWeight: "600"
  body:
    fontFamily: "IBM Plex Sans"
    fontSize: "1rem"
    fontWeight: "400"
    lineHeight: "1.6"
  code-tag:
    fontFamily: "IBM Plex Mono"
    fontSize: "0.8125rem"
    fontWeight: "500"
    letterSpacing: "0.05em"
  accessible-text:
    fontFamily: "Atkinson Hyperlegible"
    fontSize: "1rem"
    fontWeight: "400"

radii:
  radius-sm: "8px"    # Minor controls, theme switchers, status badges
  radius-md: "12px"   # Standard buttons, contextual micro-imagery
  radius-lg: "16px"   # Core structural layout units, parent containers

icons:
  library: "Google Material Icons"
  style: "Outlined / Rounded variant"
  scaling:
    default: "24px"
    dense: "18px"

motion:
  easing-spatial: "cubic-bezier(0.16, 1, 0.3, 1)" # Fast start, smooth physical deceleration
  duration-base: "300ms"
---

## Overview

A modern development portfolio focused on technical clarity, functional minimalism, and high legibility. The interface acts as a Single Page Application (SPA) with superimposed layers, dynamically adapting to user visual preferences, strict elevation axes, and spatial transitions.

## Colors & Token Semantics

The palette uses explicit nomenclature (`brand-dominant` and `brand-action`) to prevent design parsers from automatically reassigning contrast mappings.

- **Brand Dominant (Sky Blue):** Establishes the main theme atmosphere. `brand-dominant-500` handles links and active states, while `brand-dominant-900` serves as structural bases.
- **Brand Action (Deep Orange):** The ultimate contrast trigger (`brand-action-500`). Reserved strictly for core primary actions, contact targets, and active interaction feedback nodes.
- **Brand Neutral (Slate Gray):** Standard interface containers, neutral typography text layers, and canvas background surfaces (`brand-neutral-900`).

## Typography & Iconography

- **Plus Jakarta Sans (Display):** Chosen for main headings (`h1`, `h2`). Its circular forms bring a cutting-edge premium product aesthetic.
- **IBM Plex Sans (Body):** The backbone of the content, delivering flawless technical rigor and readability.
- **IBM Plex Mono (Technical/Tokens):** Used at a reduced size for technical metadata and tech tags (e.g., `NestJS`, `TypeORM`, `Next.js`). Injects code identity without cluttering the layout.
- **Atkinson Hyperlegible (Accessibility):** Engineered for high-contrast modes and critical legibility.
- **Google Material Icons (Controls):** Universal layout controls in Outlined/Rounded variations to match display geometry.

## Corner Radii Standards

- **`radius-sm` (8px):** Applied to minor utilities and floating global controls.
- **`radius-md` (12px):** Applied to high-priority buttons and embedded image contexts (e.g., About section portrait).
- **`radius-lg` (16px):** Core structural units, Project preview cards, and Bento modules.

## Z-Axis Orchestration (Layer Stack)

The system enforces a rigid 6-tier vertical axis to handle immersive spatial transitions:

- **Layer 0: Base Canvas.** Static application background surface (`brand-neutral-900` or `100`). Zero elevation.
- **Layer 1: Static Typography.** Base text layer containing section headers and introductory paragraphs.
- **Layer 2: Interactive Nodes.** Standard project cards, Bento Box modules, and standard CTA buttons. Elevates on hover `scale(1.02)` with soft occlusion shadows.
- **Layer 3: Contextual Overlays (Project Explorer).** The extended gallery modal. Overlays Layers 1 and 2.
- **Layer 4: Immersive Views (Project Detail).** Full-screen dedicated project view. Sits atop the Explorer or Main Canvas.
- **Layer 5: Floating Global Shell.** Theme and accessibility toggles. Fixed position, persistent across all states, absolute front.

## Spatial Transition Logic

To provide physical context during layer navigation, a volumetric recession effect is applied to lower layers when higher interactive modals (Layers 3 and 4) are invoked:

- **Trigger:** Opening the Project Explorer or a Dedicated Project View.
- **Effect:** The immediate underlying layer recedes spatially by transitioning to `transform: scale(0.98)` while a subtle `backdrop-blur` masks it.
- **Animation Constants:** Utilizes `duration-base` (300ms) with `easing-spatial` (`cubic-bezier(0.16, 1, 0.3, 1)`) to emulate realistic friction and depth, ensuring the UI feels like a cohesive spatial software product rather than disjointed web pages. 
- **Dismissal:** Reversing the state instantly restores the receded layer to `scale(1)` without losing user scroll position or filter contexts.

## Layout Patterns

The portfolio utilizes the horizontal axis as its primary storytelling canvas, structured via three specific composition models:

### 1. Split Screen Gallery
- **Intent:** Product showcasing and visual auditing (Projects).
- **Structure:** Fluid horizontal tracking featuring a fixed narrative panel alongside a masonry arrangement of Interactive Layer nodes.

### 2. Horizontal Flow Timeline
- **Intent:** Engineering track records and structural chronologies (Work Experience).
- **Structure:** `scroll-snap-x mandatory` enforced baseline. Individual corporate nodes map to a central spine. Density strictly limited to 3 technical achievements per node.

### 3. Bento Matrix (T-Shaped Domain Mapping)
- **Intent:** High-density skill organization (Skills).
- **Structure:** Asymmetrical grid mapping technical domains.
- **T-Shaped Logic:** Primary domains (e.g., Core Backend with Node.js/PostgreSQL) inherit dominant grid sizing. Supporting domains (Frontend with Next.js, DevOps) map to compact peripheral modules. Pure typography (`code-tag`) replaces third-party logos for pristine consistency.