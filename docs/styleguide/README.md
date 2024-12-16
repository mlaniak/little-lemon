# Little Lemon Restaurant Style Guide

This style guide documents the design system and component patterns used throughout the Little Lemon restaurant website.

## Table of Contents
- [Colors](#colors)
- [Typography](#typography)
- [Components](#components)
- [Layout](#layout)
- [Images](#images)

## Colors

### Primary Colors
- ![#495E57](https://via.placeholder.com/15/495E57/000000?text=+) `#495E57` - Primary Green
- ![#F4CE14](https://via.placeholder.com/15/F4CE14/000000?text=+) `#F4CE14` - Primary Yellow

### Secondary Colors
- ![#EE9972](https://via.placeholder.com/15/EE9972/000000?text=+) `#EE9972` - Salmon Orange
- ![#FBDABB](https://via.placeholder.com/15/FBDABB/000000?text=+) `#FBDABB` - Peach
- ![#EDEFEE](https://via.placeholder.com/15/EDEFEE/000000?text=+) `#EDEFEE` - Light Gray
- ![#333333](https://via.placeholder.com/15/333333/000000?text=+) `#333333` - Dark Gray

### Usage Guidelines
- Use Primary Green (`#495E57`) for main headers and key UI elements
- Use Primary Yellow (`#F4CE14`) for call-to-action buttons and highlights
- Use Salmon Orange (`#EE9972`) and Peach (`#FBDABB`) for secondary accents and hover states
- Use Light Gray (`#EDEFEE`) for backgrounds and dividers
- Use Dark Gray (`#333333`) for body text and dark accents

## Typography

### Fonts
- Display & Headings: 'Markazi Text', serif
- Body & UI: 'Karla', sans-serif

### Typography Scale

#### Markazi Text
- Display Title: 64pt Medium
- Sub Title: 40pt Regular
- Lead Text: 18pt Medium (for CTAs and prominent text)

#### Karla
- Section Title: 20pt Extra Bold (UPPERCASE)
- Section Categories: 16pt Extra Bold
- Card Title: 18pt Bold
- Paragraph Text: 16pt Regular (1.5 line height, max 65 characters per line)
- Highlight Text: 16pt Medium (e.g. prices)

### Usage Guidelines
- Use Markazi Text for main headings and display text
- Use Karla for all body text, UI elements, and secondary headings
- Maintain 1.5 line height for paragraph text
- Keep paragraph line length to maximum 65 characters
- Use UPPERCASE for main section titles

## Components

### Buttons
- Primary Button: Yellow background (#F4CE14) with dark text
- Secondary Button: Transparent with border
- Text Button: No background, just text

### Cards
- Standard padding: 16px
- Border radius: 8px
- Shadow: `0 2px 4px rgba(0,0,0,0.1)`

### Images
- Aspect ratio: 4:3
- Border radius: 8px
- Shadow: `0 2px 4px rgba(0,0,0,0.1)`
- Border: `1px solid rgba(0, 0, 0, 0.12)`

## Layout

### Grid System
- Based on Material-UI Grid component
- 12 column layout
- Breakpoints:
  - xs: 0px
  - sm: 600px
  - md: 900px
  - lg: 1200px
  - xl: 1536px

### Spacing
- Base unit: 8px
- Common spacing values:
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px

### Container
- Max width: 1200px
- Padding:
  - xs: 16px
  - sm: 24px
  - md: 32px
