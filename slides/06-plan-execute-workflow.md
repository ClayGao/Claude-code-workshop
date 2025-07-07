---
title: "第二步：Plan-Execute 工作流程"
description: "先規劃再執行，提升開發效率"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Plan-Execute 工作流程

先規劃，再執行 - 這是使用 Claude Code 的最佳實踐模式。

## 🎯 為什麼需要 Plan-Execute？

### 避免混亂
- **複雜任務**需要系統性方法
- **多檔案修改**需要統籌規劃
- **依賴關係**需要正確順序

### 提升效率
- 雖然每次的 P-E 方式看似耗時，但實際上可以有效減少返工機率，整體來說可能更有效率
- 改動前的 Plan 可以由使用者 review

![Plan 模式下，Claude Code 不會改動任何檔案，他會先 Show 給你看他的計劃，讓你決定是否執行](/images/Snipaste_2025-07-06_23-49-25.jpg)

===

# 使用 Ultrathink 進行 Plan

使用最高級的 Ultrathink 讓計劃過程更為縝密，你可以嘗試在 Prompt, CLAUDE.md 或是其他自定義的 md 裡面加入這個字眼

```Bash
EX: 使用 Ultrathink 來對以下要做的功能進行 Plan：
```

> 💡 Ultrathink 可以讓 Claude 卯足全力，但他也會更消耗 Token 與花費更多時間

===

# 使用 subagent 進行 Plan

對於比較大範圍的功能，你可以直接請 Claude Code 使用 subagent

```Bash
我想實作一個天氣預報系統，使用 NextJS 15，幫我做前後端的規劃。並行使用 4 個 subagents 處理
```

結果：
```Bash
⏺ Task(Backend API
      architecture planning)
  ⎿  Initializing…

⏺ Task(Frontend UI/UX design
       planning)
  ⎿  Initializing…

⏺ Task(Database and data
      management planning)
  ⎿  Initializing…

⏺ Task(Deployment and
      infrastructure
      planning)
  ⎿  Initializing…
```

> 💡 關鍵字**子代理(subagents)** 與**並行(parallel)** 讓 Claude Code 有效觸發子代理模式，並且會根據需求給予角色

> 💡 subagent 消耗的 token 數會比較大，如果你是 Pro 訂閱的用戶，在使用時需考慮必要性

===

# 使用 Opus 4 進行 Plan，Sonnet 來執行

如果你的 Plan 已經相當完整，那麼 Sonnet 已經足夠用來執行 Plan 中的實作，如果你很精打細算，可以考慮這麼做

===

# 常見模式

## 計畫 -> 執行
```
Plan → 設計 API → 實作後端 → 建立前端 → 測試
```

## 先觀測 -> 計畫 -> 執行
```
先請 Claude 讀檔案 -> Plan → 設計 API → 實作後端 → 建立前端 → 測試
```

## 先觀測 -> 計畫 -> 寫測試 -> 執行 -> 開發 (TDD)
```  
先請 Claude 讀檔案並計畫 -> 寫測試 -> 測試不通過 -> 開發功能
```