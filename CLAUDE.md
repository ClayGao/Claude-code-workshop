# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15-based workshop presentation system that transforms markdown files into interactive, animated slide presentations. It's specifically designed for creating workshop materials about Claude Code.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture Overview

### Core System Design

The application follows a file-based presentation system where:
- **Markdown files** in `/slides/` directory become presentations
- **Frontmatter** defines presentation metadata (title, description, author, date)
- **`===` separators** split content into individual slides
- **Automatic ordering** by filename (01-intro.md, 02-setup.md, etc.)

### Key Data Flow

1. **`lib/markdown.ts`** - Processes markdown files and extracts presentation data
2. **`app/[slug]/page.tsx`** - Dynamic route that generates static pages for each presentation
3. **`components/SlideViewer.tsx`** - Main presentation container with scroll tracking
4. **`components/Slide.tsx`** - Individual slide renderer with custom markdown components

### Component Architecture

```
RootLayout
├── Sidebar (desktop navigation)
├── MobileNav (mobile navigation)
└── SlideViewer
    ├── ScrollIndicator (progress tracking)
    ├── Slide[] (multiple slide instances)
    │   └── CodeBlock (syntax highlighting)
    └── ClientDate (dynamic date display)
```

## Slide Creation Workflow

### File Structure
All presentation files go in `/slides/` directory with numbered prefixes:
```
slides/
├── 01-introduction.md
├── 02-setup.md
├── 03-advanced-topics.md
```

### Markdown Format
Each presentation file requires:
- **Frontmatter** with title, description, author, date
- **Content sections** separated by `===`
- **Code blocks** with language specification for syntax highlighting

### Example Structure
```markdown
---
title: "Workshop Title"
description: "Brief description"
author: "Author Name"
date: "2024-07-04"
---

# First Slide Content

===

# Second Slide Content

\`\`\`javascript
// Code blocks are automatically highlighted
function example() {
  return "Hello World";
}
\`\`\`
```

## Important Technical Details

### Static Generation
- All presentations are statically generated at build time
- The `getStaticPaths` and `getStaticProps` pattern is used for dynamic routing
- Presentation metadata is extracted from frontmatter and file system

### Styling System
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations and scroll tracking
- **Custom CSS** in `globals.css` for presentation-specific styling
- **Responsive design** with mobile-first approach

### Markdown Processing
- **react-markdown** with **remark-gfm** for GitHub-flavored markdown
- **rehype-raw** for HTML support
- **prism-react-renderer** for code syntax highlighting
- **gray-matter** for frontmatter parsing

## Path Aliases

The project uses TypeScript path aliases defined in `tsconfig.json`:
- `@/*` maps to `./src/*`
- `@/components/*` maps to `./src/components/*`
- `@/lib/*` maps to `./src/lib/*`

## Code Quality

ESLint is configured with Next.js and TypeScript rules. Always run `npm run lint` before committing changes.

## Development Notes

- The development server uses **Turbopack** for faster builds
- Hot reloading works for both code and markdown content
- Presentation ordering is determined by filename prefixes
- Mobile navigation automatically collapses on larger screens
- Scroll position is tracked for progress indication