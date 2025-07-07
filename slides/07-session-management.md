---
title: "第三步：會話管理：恢復、清理與優化"
description: "有效管理 Claude Code 會話，保持最佳效能"
author: "Workshop Instructor"
date: "2024-07-04"
---

# 會話管理概述

Claude Code 提供強大的會話管理功能，讓你能恢復中斷的工作並保持最佳對話效能。

## 🎯 核心功能
- **對話恢復**: `--continue` 和 `/resume`
- **上下文清理**: `/clear` 和 `/compact`
- **智能優化**: 自動監控和建議

===

# 對話恢復功能

## --continue 啟動恢復
```bash
# 啟動時恢復上次對話
claude --continue

# 簡寫形式
claude -c
```

## --resume 會話選擇
```bash
# 啟動時選擇會話
claude --resume

# 顯示互動式會話選擇器
# 包含會話開始時間、初始提示、訊息數量
# 使用方向鍵選擇特定過往對話
```

### 實際使用場景
```bash
# 昨天的工作
claude
> "幫我重構用戶認證系統"
> [開發 2 小時，完成 60%]

# 今天恢復
claude --continue
> "繼續昨天的認證系統重構"

Claude: "歡迎回來！昨天我們完成了：
✅ 後端 JWT 實作
✅ API 端點更新
🔄 前端元件重構 (進行中)
📋 待完成：註冊流程、密碼重設"
```

===

# 上下文管理

## /clear 完全重置
```bash
# 清除所有對話歷史
/clear

# 使用時機
- 任務完全切換
- 方向重大改變
- 效能明顯下降
```

## /compact 智能壓縮
```bash
# 智能壓縮對話歷史，保留重要資訊
/compact

# 指定壓縮重點（可選）
/compact 保留程式碼和架構決策
/compact 移除除錯討論，保留實作細節

# 壓縮策略
保留: 程式碼片段、專案結構、重要決策
移除: 重複討論、日誌輸出、已解決問題
```

### 上下文監控與選擇
```bash
# Claude Code 會顯示上下文使用量百分比
# 當接近限制時，可選擇：

# 智能壓縮（保留重要資訊）
/compact

# 完全清除（重新開始）
/clear

# 使用時機：
# /compact: 自然斷點（功能完成、修復完成、提交後）
# /clear: 任務切換、方向改變
```

===

# 會話狀態保存

## 自動保存內容
- **對話歷史**: 完整問答記錄
- **檔案變更**: 修改狀態追蹤
- **專案上下文**: CLAUDE.md 設定
- **工作進度**: 未完成任務

## 本地會話儲存
```bash
# 會話自動儲存在本地
~/.claude/

# 每次對話都會自動保存
# 使用 --continue 或 --resume 恢復
```

===

# 最佳實踐

## ✅ 有效清理時機

### 自然斷點
```bash
"功能開發完成" → /clear
"每日工作結束" → /clear  
"專案切換" → /clear
```

### 效能優化
```bash
"回應變慢" → /compact（先試壓縮）或 /clear（重新開始）
"建議不一致" → /compact
"遺忘專案設定" → /clear + 重建上下文
"重複建議" → /compact
```

## 🔄 清理策略

### 保守策略（複雜專案）
- 優先使用 `/compact` 保留上下文
- 重大任務切換時才 `/clear`
- 適合長期開發專案

### 激進策略（快速開發）  
- 每個功能完成後 `/compact` 或 `/clear`
- 根據需要選擇壓縮或清除
- 適合快速原型開發

===

# 進階技巧

## 智能上下文管理

### /compact vs /clear 的選擇
```bash
# 使用 /compact：保留重要資訊，清理冗餘
/compact 保留程式碼和架構討論
/compact 移除除錯討論，保留實作細節

# 使用 /clear：完全重新開始（任務切換）
/clear

# 結合使用：先總結再清除
"請總結目前的架構決策"
/clear
"記住架構：[...]，開始實作 API"
```

### /compact 進階用法
```bash
# 基本壓縮
/compact

# 指定保留重點
/compact 保留 API 設計和資料庫架構
/compact 移除除錯討論，保留測試結果
/compact 總結進度，保留未完成任務
```

## 第三方解決方案

由於 Claude Code 目前不支援跨裝置同步，社群開發了一些解決方案：

```bash
# Depot 的會話管理
depot claude --save-session project-name
depot claude --resume session-id

# Crystal - 圖形化會話管理介面
# claunch - 輕量級會話管理器
```

===

# 疑難排解

## 常見問題診斷
```bash
症狀檢查:
❌ 回應變慢
❌ 建議不一致
❌ 遺忘專案設定
❌ 重複建議

解決方案:
1. 立即 /compact（智能壓縮）
2. 仍有問題則 /clear（完全重置）
3. 重新提供關鍵上下文
```

## 恢復策略
```bash
# 清除後快速重建
/clear
"Next.js + TypeScript 專案，用戶認證功能開發"

# 或重新初始化
/init
```

## 會話疑難排解
```bash
# 檢查會話檔案位置
ls ~/.claude/

# 如果會話恢復失敗
# 重新啟動 Claude Code
claude

# 或清除快取重新開始
rm -rf ~/.claude/cache/
claude
```