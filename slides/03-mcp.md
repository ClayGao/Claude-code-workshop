---
title: "MCP 安裝"
description: "使用 Claude Code 的 MCP 功能獲取最新文檔"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Claude Code MCP 使用指南

MCP (Model Context Protocol) 讓 Claude Code 能夠連接外部服務獲取即時資訊。

## 🚀 推薦以下 MCP

### Context7 MCP
獲得技術最新文件

### poppteer MCP
自動截圖迭代

### browser MCP
自動瀏覽器操作與測試

===

# MCP 設定作用域 (Scope)

## 三種設定作用域

### 🔹 Local 作用域 (預設)
- **用途**: 僅限當前專案的個人設定
- **檔案位置**: `.claude/mcp_servers.json`
- **特色**: 私人設定，不會被版本控制追蹤
- **適用**: 個人開發工具、敏感設定

### 🔹 Project 作用域
- **用途**: 專案團隊共用設定
- **檔案位置**: `.mcp.json` (專案根目錄)
- **特色**: 可提交到版本控制，團隊共享
- **適用**: 專案必要的 MCP 服務

### 🔹 User 作用域
- **用途**: 個人跨專案通用設定
- **檔案位置**: `~/.claude.json`
- **特色**: 個人所有專案都可使用
- **適用**: 常用的個人工具和服務

## 作用域優先順序
```
Local > Project > User
```
**說明**: Local 設定會覆蓋 Project 設定，Project 設定會覆蓋 User 設定。

===

# 使用 Claude Code CLI 管理 MCP

## 新增 MCP 伺服器 (含作用域)
```bash
# 新增到 Local 作用域 (預設)
claude mcp add context7 https://mcp.context7.com/mcp

# 新增到 Project 作用域 (團隊共用)
claude mcp add --scope project context7 https://mcp.context7.com/mcp
claude mcp add -s project context7 https://mcp.context7.com/mcp  # 縮寫

# 新增到 User 作用域 (個人通用)
claude mcp add --scope user my-tools npx my-mcp-server
claude mcp add -s user my-tools npx my-mcp-server  # 縮寫
```

## 管理 MCP 伺服器 (含作用域)
```bash
# 列出所有作用域的 MCP 伺服器
claude mcp list

# 列出特定作用域的 MCP 伺服器
claude mcp list --scope project
claude mcp list -s user

# 移除特定作用域的 MCP 伺服器
claude mcp remove --scope project context7
claude mcp remove -s local my-server

# 重新啟動 MCP 伺服器
claude mcp restart context7
```

===

# 設定檔案格式與位置

## 各作用域設定檔案位置

### Local 作用域設定
```bash
# 檔案位置
.claude/mcp_servers.json

# 特色：不會被 Git 追蹤，個人設定
```

### Project 作用域設定
```bash
# 檔案位置
.mcp.json

# 特色：可提交到 Git，團隊共用
```

### User 作用域設定
```bash
# macOS/Linux
~/.claude/mcp_servers.json

# Windows
%APPDATA%\.claude\mcp_servers.json

# 特色：跨專案通用設定
```

## 設定檔案格式範例

### Local 設定範例 (.claude/mcp_servers.json)
```json
{
  "mcpServers": {
    "dev-tools": {
      "command": "node",
      "args": ["./scripts/dev-mcp.js"],
      "transport": "stdio",
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

### Project 設定範例 (.mcp.json)
```json
{
  "mcpServers": {
    "project-api": {
      "url": "https://api.ourproject.com/mcp",
      "transport": "http",
      "headers": {
        "X-API-Key": "${PROJECT_API_KEY}"
      }
    }
  }
}
```

### User 設定範例 (~/.claude/mcp_servers.json)
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "transport": "stdio"
    }
  }
}
```

===

# 實際使用範例

## 作用域使用場景

### Local 作用域範例
```bash
# 場景：個人開發測試工具
claude mcp add --scope local debug-tools ./scripts/debug-mcp.js

# 在 Claude Code 中使用
"使用 debug-tools 幫我分析這個 API 回傳的問題"
```

### Project 作用域範例
```bash
# 場景：團隊共用專案 API 文檔
claude mcp add --scope project project-api https://api.ourteam.com/mcp

# 在 Claude Code 中使用
"使用 project-api 幫我生成這個端點的用戶端代碼"
```

### User 作用域範例
```bash
# 場景：跨專案通用文檔服務
claude mcp add --scope user context7 https://mcp.context7.com/mcp

# 在任何專案中使用
"使用 context7 幫我建立一個 React Query 的分頁載入元件"
```

## 檢查 MCP 狀態
```bash
# 確認所有作用域的 MCP 伺服器狀態
claude mcp list

# 輸出範例:
# Local:
#   ✅ debug-tools (running)
# Project:
#   ✅ project-api (running)
# User:
#   ✅ context7 (running)
#   ❌ my-server (stopped)
```

===

# 常見問題排除

## MCP 伺服器無法啟動
```bash
# 檢查設定檔案語法
cat ~/.claude/mcp_servers.json | jq .

# 手動測試命令
npx -y @upstash/context7-mcp
```

## 本地專案設定
```bash
# 建立專案 MCP 目錄
mkdir -p .claude

# 複製全域設定到本地
cp ~/.claude/mcp_servers.json .claude/

# 編輯本地設定
code .claude/mcp_servers.json
```

## 除錯技巧
```bash
# 啟用詳細日誌
CLAUDE_MCP_DEBUG=1 claude

# 檢查網路連接
curl -I https://mcp.context7.com/mcp
```

===

# 最佳實踐

## ✅ 作用域使用建議

### Local 作用域
- 個人開發工具和測試環境設定
- 含有敏感資訊的配置 (不會被提交)
- 實驗性的 MCP 伺服器測試

### Project 作用域
- 專案必要的 MCP 服務 (API 文檔、工具鏈)
- 團隊協作所需的共用設定
- 可以提交到版本控制的配置

### User 作用域
- 跨專案通用服務 (Context7、翻譯工具)
- 個人工作流的常用工具
- 穩定的、長期使用的服務

## 🔧 設定管理建議

### 版本控制策略
```bash
# 在 .gitignore 中排除個人設定
.claude/mcp_servers.json

# 但要包含團隊共用設定
.mcp.json
```

### 環境變數管理
```bash
# 在 .env 中定義敏感資訊
PROJECT_API_KEY=your-secret-key

# 在 MCP 設定中引用
"headers": {
  "X-API-Key": "${PROJECT_API_KEY}"
}
```

## 💡 進階技巧

### 多作用域結合使用
- User: 通用文檔服務 (Context7)
- Project: 專案 API 文檔
- Local: 個人開發工具

### 自建 MCP 伺服器
```bash
# 連接內部 API 文檔系統
claude mcp add -s project internal-docs ./scripts/internal-api-mcp.js

# 連接資料庫文檔
claude mcp add -s local db-schema ./scripts/db-schema-mcp.js
```

### 團隊協作最佳實踐
- 在 README.md 中說明必要的 MCP 設定
- 提供設定範本和說明文檔
- 定期更新和維護 MCP 伺服器