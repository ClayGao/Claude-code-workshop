---
title: "第一步：專案初始化：/init 指令"
description: "讓 Claude 記住你的專案"
author: "Workshop Instructor"
date: "2024-07-04"
---

# `/init` 指令：專案初始化

`/init` 是 Claude Code 最重要的指令，為你的專案建立「記憶」。

## 🧠 什麼是 `/init`？

### 核心概念
- 建立 `CLAUDE.md` 檔案
- 成為專案的「記憶中樞」
- 提供專案上下文給 Claude

### 工作原理
```
掃描專案 → 分析結構 → 產生 CLAUDE.md → 建立專案 Rules 與記憶
```

===

# 執行 `/init`

## 基本使用
```bash
# 在專案根目錄啟動 Claude Code
cd /path/to/your/project
claude

# 執行初始化，生成 CLAUDE.md
/init
```

> 💡 你會發現ㄧ開始生成的 CLAUDE.md 一開始都不會太長，這是因為太長的內容可能會造成反效果，因此如何精簡 CLAUDE.md 需要思考

===

# 初生成 CLAUDE.md 檔案內容

## 基本結構
```markdown
# Project: My App

## Overview
A React TypeScript application with Next.js framework

## Architecture
- Frontend: React 18 + TypeScript
- Styling: Tailwind CSS
- State: Zustand
- Testing: Jest + React Testing Library

## Key Directories
- `/src/components` - Reusable UI components
- `/src/pages` - Next.js pages
- `/src/lib` - Utility functions
- `/src/types` - TypeScript definitions
```

## 團隊規範
```markdown
## Team Conventions
- Branch naming: feature/TICKET-description
- Commit format: type(scope): description
- PR requirements: 2 approvals + tests pass
- Code review checklist in `.github/PR_TEMPLATE.md`
```

===

# 隨時更新 CLAUDE.md

## 手動編輯
```markdown
# Project: E-commerce Platform

## Business Context
B2B marketplace for wholesale products

## Coding Standards
- Use functional components with hooks
- Prefer composition over inheritance  
- All API calls must include error handling
- Use absolute imports with @ alias

## Important Notes
- Payment processing uses Stripe
- All user data must be GDPR compliant
- Cache invalidation strategy is critical
```


## 使用 `#` 編輯
```bash
# 每個對話的最後一個字都幫我加上一個「嗶」
```
> 💡 這邊我有嘗試過先使用 # 接著下 Prompt，但不是很穩定，我認為如果目標明確，直接使用 # 記錄或是直接改 CLAUDE.md 可能更快

===

# CLAUDE.md 編寫技巧

## 格式簡單易讀
```markdown
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you’re done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

## 使用 ! 記錄指令：
```markdown
當我輸入 ga: !git add .
```

## 使用 @ + 檔案路徑 tag 檔案：
```markdown
在開始之前務必先幫我瀏覽 @README.md
```

## 使用 `IMPORTANT` 或是 `YOU MUST` 開頭
```bash
IMPORTANT: 在開始之前務必先幫我瀏覽 @README.md
```