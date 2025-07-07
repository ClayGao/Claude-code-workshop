---
title: "Claude Code Hooks 自動化機制"
description: "使用 Hooks 建立智能化的工作流程自動化"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Claude Code Hooks 🪝

**用戶自定義的 shell 指令，在 Claude Code 生命週期的特定時刻自動執行**

## 🎯 核心概念

### 什麼是 Hooks？
- **事件觸發器**: 在特定事件發生時自動執行
- **工作流程自動化**: 無縫整合到開發流程中
- **智能決策**: 可控制工具執行和提供反饋
- **完全可定制**: 根據團隊需求靈活配置

### 主要用途
- 📢 **通知系統**: 自動發送狀態更新
- 🎨 **程式碼格式化**: 自動美化和修正程式碼
- 📊 **日誌追蹤**: 記錄操作和決策過程
- 🛡️ **安全檢查**: 自動化安全審查
- 🔐 **權限控制**: 自定義存取控制邏輯

===

# Hook 事件類型

## 五大核心事件

### 🛠️ PreToolUse
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '即將執行 Bash 指令: $TOOL_INPUT'"
          }
        ]
      }
    ]
  }
}
```

### ✅ PostToolUse
- **觸發時機**: 工具完成後
- **用途**: 日誌記錄、結果驗證、後續處理

### 🔔 Notification
- **觸發時機**: Claude 發送通知時
- **用途**: 自定義通知渠道、訊息轉發

### 🏁 Stop
- **觸發時機**: 主代理完成任務時
- **用途**: 清理工作、結果彙總

### 🤖 SubagentStop
- **觸發時機**: 子代理完成時
- **用途**: 子任務結果處理、狀態同步

===

# Hook 配置架構

## 基本結構
```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

## 實際範例
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command", 
            "command": "echo '正在寫入檔案...'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "logger '完成 Bash 指令執行'"
          }
        ]
      }
    ]
  }
}
```

===

# Hook 輸入輸出

## 輸入格式
Hook 接收包含會話和事件資料的 JSON：
```json
{
  "session": {
    "id": "session_123",
    "timestamp": "2024-07-04T10:00:00Z"
  },
  "event": {
    "type": "PreToolUse",
    "tool": "Bash",
    "input": "ls -la"
  }
}
```

## 輸出控制
### 1. 退出碼控制
```bash
# 允許執行
exit 0

# 阻止執行
exit 1
```

### 2. JSON 結構化回應
```json
{
  "allow": true,
  "feedback": "檢查完成，可以執行",
  "metadata": {
    "checked_at": "2024-07-04T10:00:00Z"
  }
}
```