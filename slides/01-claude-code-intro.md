---
title: "認識 Claude Code"
description: "AI 驅動的終端助手"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Claude Code 是什麼？

## 介紹
Claude Code 是 Anthropic 推出的 **終端原生 AI coding 工具**，讓 AI 直接在你的開發環境中工作。始於 **Anthropic** 的一個 **內部項目**

(這次簡報部分內容以下內容來自 Boris 演講逐字稿：https://claude.ai/public/artifacts/5bc0baa9-5f08-4bb5-905f-b42ff60afd72)

版本: v1.0.43

## 即問即答
Claude Code 和 Cursor 有一個根本不同，就是它不做程式碼的索引，所以在開始前不會把程式碼丟到某個遠端資料庫

===

# 為什麼是 CLI ?

## 眾多編輯器
每個人開發時都有自己習慣使用的 IDE，VSCode, Zod, Cursor 或是 Neovim, JetBrains 等等

搭配 Claude Code，你可以使用你自己順手的編輯器，搭配 Terminal 工具

## 最大公約數
使用 CLI 是開發者的最大公約數：直接在 Terminal 向電腦下指令

## 遠端環境使用
由於是 CLI，所以你也可以在遠端的部分使用 bash 請 Claude Code 作業，甚至是集成其他指令與功能

## 🚀 自主執行能力，基本 Claude Code 都會幫你做到這些：
- Agent 多檔案編輯
- 自動執行測試與建構
- 處理 Git 工作流程，commit and push
![叫 Claude Code commit 時會發現的有趣現象，請 Claude Code commit 時可以留意](/images/Snipaste_2025-07-06_11-53-46.jpg)

## 🔧 無縫工具整合
- VSCode / Cursor 等支援
- 終端命令執行，這邊特別順

===

# 實際應用場景

## 快速開發
```bash
"閱讀 plan.md，按照 plan.md 的內容生成 Todolist 計劃並開發前端功能會使用到的 Container 與 Component"
```

## 錯誤修復
```bash
"測試失敗了，幫我找出問題並修復"
```

## 截圖開發
```bash
"[Image #1]搭配 plan.md 幫我開發圖中的這幾個 Components"
```

## 查看 git
```bash
這個 Component 是在哪一個 git commit 添加的？是誰做的？
```

===

### 支援環境

- **AI 模型**: Claude Opus 4 (Max 5x/10x方案)、Sonnet 4 (Pro 方案)