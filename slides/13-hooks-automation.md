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

===

# 實用範例

## 程式碼格式化 Hook
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $FILE_PATH"
          }
        ]
      }
    ]
  }
}
```

## 安全檢查 Hook
```bash
#!/bin/bash
# security-check.sh

echo "🔍 執行安全檢查..."

# 檢查敏感資料
if grep -r "password\\|secret\\|api_key" "$1"; then
    echo "❌ 發現敏感資料，阻止執行"
    exit 1
fi

echo "✅ 安全檢查通過"
exit 0
```

## 日誌記錄 Hook
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '$(date): 執行了 $TOOL_NAME 工具' >> activity.log"
          }
        ]
      }
    ]
  }
}
```

===

# 高級功能

## MCP 工具整合
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__*",
        "hooks": [
          {
            "type": "command",
            "command": "validate-mcp-tool.sh $TOOL_NAME"
          }
        ]
      }
    ]
  }
}
```

## 條件式執行
```bash
#!/bin/bash
# conditional-hook.sh

# 只在工作時間執行
HOUR=$(date +%H)
if [[ $HOUR -ge 9 && $HOUR -le 18 ]]; then
    echo "工作時間，執行完整檢查"
    full-check.sh
else
    echo "非工作時間，執行快速檢查"
    quick-check.sh
fi
```

## 配置層級
1. **用戶全域**: `~/.claude/config.json`
2. **專案特定**: `.claude/config.json`
3. **環境變數**: `CLAUDE_HOOKS_CONFIG`

===

# 安全考量 🔒

## 主要風險
- **完整用戶權限**: Hooks 以用戶身份執行
- **資料洩露**: 可能存取敏感檔案
- **系統損壞**: 錯誤指令可能造成損害

## 安全最佳實踐

### 1. 輸入驗證
```bash
# 驗證輸入參數
if [[ -z "$1" || "$1" =~ [^a-zA-Z0-9._/-] ]]; then
    echo "無效的輸入參數"
    exit 1
fi
```

### 2. 使用絕對路徑
```bash
# 好的做法
/usr/bin/git status

# 避免這樣
git status
```

### 3. 引號保護
```bash
# 正確的變數使用
echo "檔案路徑: '$FILE_PATH'"

# 避免
echo "檔案路徑: $FILE_PATH"
```

### 4. 權限最小化
```json
{
  "hooks": {
    "security": {
      "allowed_commands": ["/usr/bin/git", "/usr/bin/npm"],
      "blocked_paths": ["/etc", "/var/log"]
    }
  }
}
```

===

# 最佳實踐總結

## ✅ 建議做法
- **漸進式部署**: 先在測試環境驗證
- **詳細日誌**: 記錄所有 Hook 執行
- **錯誤處理**: 優雅處理失敗情況
- **效能監控**: 避免過長的執行時間
- **定期審查**: 檢查 Hook 的必要性

## ❌ 避免事項
- 不要在 Hook 中執行長時間操作
- 避免在關鍵路徑中使用不穩定的 Hook
- 不要忽略錯誤處理
- 避免硬編碼敏感資訊

## 🎯 Hook 讓 Claude Code 更智能
**透過自動化減少重複工作，讓 AI 助手更符合你的工作流程！**