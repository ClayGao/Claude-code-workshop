---
title: "IDE 整合與終端使用"
description: "綁定你的 IDE 或使用 terminal"
author: "Workshop Instructor"
date: "2024-07-04"
---

# IDE 整合與終端使用

雖然

## 🔗 IDE 整合優勢

### 自動上下文共享
- 當前選取的程式碼
- 開啟的檔案標籤
- IDE 診斷錯誤

### 快捷鍵支援
- **macOS**: `Cmd + Option + K`  
- **Windows/Linux**: `Alt + Ctrl + K`
- 如果是 VSCode / Cursor 內，可以使用 `Cmd + Esc` 叫出 Claude Code
- 快速插入檔案引用

===

# 支援的 IDE

## 以 VS Code / Cursor 為例
```bash
# 安裝 Claude Code 後自動偵測
claude
# VS Code 會自動連接
```

參考 [官方 IDE](https://docs.anthropic.com/en/docs/claude-code/ide-integrations)

===

# `/ide` 指令使用

## 基本指令
```bash
claude
# 啟動後執行
/ide
```

## 使用場景

### 外部終端連接
```bash
# 在系統終端中啟動 Claude Code
claude

# 連接到正在運行的 IDE
/ide

# 確認連接成功
✅ Connected to VS Code
```

===

# IDE 整合功能

## 🔍 選取內容共享
```
在 IDE 中選取程式碼 → Claude 自動接收上下文
```

## 📁 檔案引用
```bash
# 使用快捷鍵插入檔案引用
@src/components/Button.tsx#L1-50
```

## 🚨 診斷同步
```
IDE 發現語法錯誤 → Claude 自動接收錯誤資訊
```
