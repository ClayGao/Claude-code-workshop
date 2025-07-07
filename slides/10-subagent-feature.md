---
title: "Subagent 子代理功能"
description: "並行處理複雜任務的輕量級 Claude 實例"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Subagent 基本概念

Claude Code 的 subagent 是輕量級的 Claude 實例，專門用於並行處理複雜任務。

## 🤖 什麼是 Subagent？

### 核心特性
- **輕量級實例**：在任務中運行的獨立 Claude Code 
- **獨立上下文**：每個 subagent 有自己的記憶空間
- **並行執行**：最多可同時運行 10 個 subagent
- **自動管理**：Claude Code 自動處理任務佇列

### 識別標誌
```bash
# 在輸出中會看到
Task(執行任務描述)

# 例如
Task(探索 src 目錄結構)
Task(分析 API 端點)
Task(檢查測試覆蓋率)
```

===

# 並行執行機制

## 自動並行管理
```bash
# Claude Code 自動決定並行數量
你: "分析整個程式碼庫的架構"

# 自動創建多個並行任務
Task(分析前端結構)
Task(分析後端 API)  
Task(檢查資料庫層)
Task(評估測試策略)
```

## 任務佇列系統
```bash
# 超過 10 個任務時自動排隊
最大並行數: 10 個 subagent
任務佇列: 自動管理等待中的任務
完成策略: 任務完成後自動開始下一個
```

===

# 使用方法

## 明確指定並行任務
```bash
# 指定並行探索
"使用 4 個 subagent 並行探索程式碼庫，每個負責不同目錄"

結果:
Task(探索 src/components 目錄)
Task(探索 src/services 目錄)  
Task(探索 src/utils 目錄)
Task(探索 tests 目錄)
```

## 讓 Claude 自動管理
```bash
# 推薦方式：不指定數量
"分析這個專案的整體架構和依賴關係"

# Claude 會自動創建適當數量的 subagent
Task(分析主要模組)
Task(檢查依賴關係)
Task(評估程式碼品質)
...
```

===

# 實用場景

## 大型程式碼庫探索
```bash
你: "這是一個 50 萬行的程式碼庫，幫我理解整體架構"

Claude 自動分配:
Task(分析核心業務邏輯)
Task(檢查前端架構)
Task(分析後端服務)
Task(檢查資料庫設計)
Task(評估 API 設計)
Task(分析配置檔案)
```

## 多面向程式碼分析
```bash
你: "全面評估這個專案的程式碼品質"

並行執行:
Task(靜態程式碼分析)
Task(安全漏洞檢查)
Task(效能瓶頸分析)
Task(測試覆蓋率評估)
Task(依賴關係審查)
```

===

# 最佳實踐

## ✅ 有效使用場景

### 複雜任務分解
```bash
# 適合 subagent 的任務
- 大型程式碼庫分析
- 多目錄並行探索  
- 獨立子系統檢查
- 並行品質評估

# 不適合的場景
- 簡單單一任務
- 需要順序執行的工作
- 高度相關的連續步驟
```

### 讓 Claude 決定並行度
```bash
# 推薦做法
"分析整個專案的架構" ✅

# 避免過度指定
"使用 15 個 subagent 分析程式碼" ❌
# 超過 10 個上限，沒有必要
```

===

# 實際案例

## 案例 1：多目錄並行探索
```bash
你: "探索程式碼庫，使用 4 個 subagent 處理不同目錄"

執行結果:
⏺ Task(Backend API architecture)
  ⎿ 初始化中...

⏺ Task(Frontend UI/UX design)  
  ⎿ 初始化中...

⏺ Task(Database schema analysis)
  ⎿ 初始化中...

⏺ Task(Testing strategy review)
  ⎿ 初始化中...
```

## 案例 2：大規模任務處理
```bash
# 測試案例：100 個任務
"創建 100 個分析任務檢查不同檔案"

管理方式:
- 同時執行: 10 個 subagent
- 佇列管理: 90 個等待中
- 自動調度: 完成一個，開始下一個
```

===

# 進階應用

## 分階段分析
```bash
# 第一階段：概覽分析
Task(整體架構分析) → 完成

# 第二階段：深入分析（基於第一階段結果）
Task(核心模組深度分析)
Task(關鍵依賴詳細檢查)
Task(效能瓶頸具體定位)
```

## 結果整合
```bash
# 多個 subagent 完成後
各 subagent 報告:
- Task 1: 前端使用 React + TypeScript
- Task 2: 後端使用 Node.js + Express
- Task 3: 資料庫使用 PostgreSQL  
- Task 4: 測試覆蓋率 85%

整合結論:
現代化的全端 TypeScript 專案，
架構清晰，測試覆蓋率良好
```

===

# 監控與最佳化

## 任務狀態追蹤
```bash
# 監控執行狀態
Active subagents (3/10):
- Task(安全分析): 進行中... 
- Task(效能檢查): 進行中...
- Task(程式碼審查): 進行中...

Queued tasks (2):
- Task(文檔檢查): 等待中
- Task(依賴更新): 等待中
```

## 效能建議
```bash
# 最佳化原則
1. 信任自動管理 - 不要過度指定並行數
2. 任務獨立性 - 確保 subagent 任務互不依賴  
3. 適度分解 - 避免任務過於細碎
4. 耐心等待 - 大型分析需要時間
```

> 💡 **核心建議**：除非需要限制任務執行，否則讓 Claude Code 自動決定並行數量

===

# 參考資料

來自 https://cuong.io/blog/2025/06/24-claude-code-subagent-deep-dive