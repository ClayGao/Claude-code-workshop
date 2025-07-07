# 🎯 Workshop Presentation App

A modern, interactive workshop presentation system built with Next.js 15. Transform your markdown files into beautiful, animated slides with smooth scrolling and responsive design.

## ✨ Features

- **📝 Markdown-Driven**: Write slides in markdown with `===` separators
- **🎨 Beautiful UI**: Modern design with smooth animations and transitions  
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🔧 Syntax Highlighting**: Code blocks with professional syntax highlighting
- **🧭 Smart Navigation**: Sidebar navigation with file-based ordering
- **📊 Progress Tracking**: Visual indicators showing presentation progress
- **⚡ Fast**: Built with Next.js 15 and optimized for performance

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm

### Installation & Running

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## 📚 Creating Presentations

### 1. Add Markdown Files

Create markdown files in the `slides/` directory. Files are automatically ordered by filename:

```
slides/
├── 01-introduction.md
├── 02-setup.md
├── 03-advanced-topics.md
└── 04-conclusion.md
```

### 2. Markdown Format

Each presentation file supports frontmatter and content separated by `===`:

```markdown
---
title: "My Workshop"
description: "Learn something amazing"
author: "Your Name"
date: "2024-07-04"
---

# Welcome to My Workshop

This is the first slide content.

## Key Points
- Point 1
- Point 2
- Point 3

===

# Second Slide

This is the second slide content.

\`\`\`javascript
// Code blocks are automatically highlighted
function hello() {
  console.log("Hello, Workshop!");
}
\`\`\`

===

# Third Slide

More content here...
```

### 3. Frontmatter Options

```yaml
---
title: "Presentation Title"          # Required: Display name
description: "Brief description"     # Optional: Shown in sidebar
author: "Author Name"               # Optional: Shown in header
date: "2024-07-04"                  # Optional: Shown in header
order: 1                            # Optional: Custom ordering
---
```

### 4. Slide Separators

Use `===` on its own line to separate slides:

```markdown
# Slide 1 Content

Some content here...

===

# Slide 2 Content

More content here...
```

## 🎨 Supported Markdown Features

- **Headers**: `# ## ###`
- **Emphasis**: `*italic*`, `**bold**`
- **Lists**: Ordered and unordered
- **Code**: Inline `code` and fenced code blocks
- **Links**: `[text](url)`
- **Images**: `![alt](url)`
- **Tables**: GitHub-flavored markdown tables
- **Blockquotes**: `> quote`

## 💻 Code Highlighting

Specify language for syntax highlighting:

````markdown
```javascript
function example() {
  return "Hello World";
}
```

```typescript
interface User {
  name: string;
  email: string;
}
```

```bash
npm install package-name
```
````

## 📱 Navigation

### Desktop
- **Sidebar**: Click any presentation to switch
- **Scroll**: Smooth scroll through slides
- **Progress Indicator**: Click dots to jump to specific slides

### Mobile
- **Hamburger Menu**: Tap to access presentation list
- **Touch Scroll**: Swipe and scroll through slides
- **Responsive Design**: Optimized for all screen sizes

## 📦 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 🎯 Tips for Great Presentations

1. **Keep slides focused** - One main point per slide
2. **Use visual hierarchy** - Headers, subheaders, and bullet points
3. **Include code examples** - Take advantage of syntax highlighting
4. **Test on mobile** - Ensure readability on all devices
5. **Use consistent naming** - Number your files for proper ordering

## 📚 Additional Resources

### Git Integration Reference
For advanced Git workflow integration with Claude Code, see:
- **[Git Checkpoints Reference](./git-checkpoints-reference.md)** - Comprehensive guide on using Git as safety checkpoints during development

---

Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.
