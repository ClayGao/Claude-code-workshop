---
title: "Hooks 自動化機制"
description: "設定自動化觸發的工作流程"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Hooks 自動化機制

Claude Code 支援 hooks 機制，讓你設定在特定事件發生時自動執行的指令。

## 🔗 什麼是 Hooks？

### 核心概念
- **事件觸發**: 特定動作發生時自動執行
- **無縫整合**: 與現有工作流程結合
- **可自訂**: 根據團隊需求設定
- **提升效率**: 減少重複手動操作

### 常見觸發事件
- 檔案變更時
- Git 操作前後
- 測試執行時
- 部署流程中

===

# Hooks 設定方式

## 全域 Hooks 設定
```json
// ~/.claude/config.json
{
  "hooks": {
    "pre-commit": {
      "command": "claude -p '請檢查這次 commit 的程式碼品質'",
      "enabled": true
    },
    "post-commit": {
      "command": "claude -p '請更新 CHANGELOG.md'",
      "enabled": true
    },
    "file-change": {
      "command": "claude -p '檢查修改的檔案是否影響其他模組'",
      "patterns": ["src/**/*.js", "src/**/*.ts"],
      "enabled": false
    }
  }
}
```

## 專案特定 Hooks
```json
// .claude/hooks.json
{
  "hooks": {
    "test-failure": {
      "command": "claude -p '分析測試失敗原因並提供修復建議'",
      "enabled": true
    },
    "build-error": {
      "command": "claude -p '分析建構錯誤並嘗試自動修復'",
      "enabled": true
    },
    "deploy-ready": {
      "command": "claude -p '執行部署前安全檢查'",
      "enabled": true
    }
  }
}
```

===

# Git Hooks 整合

## Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🤖 Claude Code 程式碼檢查..."

# 啟動 Claude Code 進行檢查
claude -p "請檢查這次 commit 的變更：

1. 程式碼品質和風格
2. 潛在的錯誤或問題
3. 安全性檢查
4. 效能影響評估

如果發現問題，請提供修復建議。
如果一切正常，回應 'COMMIT_OK'。"

# 檢查 Claude 的回應
if [[ $? -eq 0 ]]; then
    echo "✅ 程式碼檢查通過"
    exit 0
else
    echo "❌ 程式碼檢查發現問題，請修復後再次提交"
    exit 1
fi
```

## Post-commit Hook
```bash
#!/bin/bash
# .git/hooks/post-commit

# 取得最新 commit 資訊
COMMIT_MSG=$(git log -1 --pretty=%B)
CHANGED_FILES=$(git diff --name-only HEAD~1)

claude -p "剛完成一次 commit：

Commit 訊息: $COMMIT_MSG
修改檔案: $CHANGED_FILES

請執行以下任務：
1. 檢查是否需要更新文檔
2. 評估是否影響其他模組
3. 建議後續測試重點
4. 更新相關的 TODO 和 issue

請產生簡潔的報告。"
```

===

# CI/CD Pipeline Hooks

## GitHub Actions 整合
```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Claude Code Analysis
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude -p "請分析這個 PR 的變更：
          
          1. 程式碼品質評估
          2. 安全性檢查
          3. 效能影響分析
          4. 測試覆蓋率檢查
          5. 文檔更新需求
          
          請產生詳細的 PR 審查報告。"
          
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🤖 Claude Code 審查報告已產生'
            })
```

## 自動化測試 Hook
```bash
# tests/hooks/pre-test.sh
#!/bin/bash

echo "🧪 執行測試前檢查..."

claude -p "即將執行測試套件。請檢查：

1. 測試環境設定是否正確
2. 必要的測試資料是否準備完成
3. 相關服務是否正常運行
4. 預期的測試範圍和重點

如果發現問題請提供解決方案。
如果一切正常，回應 'TEST_READY'。"
```

===

# 專案管理 Hooks

## Issue 自動分析
```json
{
  "hooks": {
    "issue-created": {
      "trigger": "github-webhook",
      "command": "claude -p '新的 issue 已建立：{{issue.title}}\\n\\n{{issue.body}}\\n\\n請分析這個問題並：\\n1. 評估優先級和複雜度\\n2. 建議適合的標籤\\n3. 估算所需時間\\n4. 識別相關的程式碼模組'",
      "enabled": true
    }
  }
}
```

## 自動程式碼審查
```json
{
  "hooks": {
    "pr-opened": {
      "trigger": "github-webhook", 
      "command": "claude -p '請審查這個 PR：\\n\\n變更摘要：{{pr.title}}\\n描述：{{pr.body}}\\n\\n重點檢查：\\n- 程式碼品質\\n- 安全性問題\\n- 效能影響\\n- 測試完整性\\n\\n請提供建設性的審查意見。'",
      "enabled": true
    }
  }
}
```

===

# 開發環境 Hooks

## 檔案監控 Hook
```bash
# 監控重要檔案變更
fswatch src/ | while read file; do
    echo "檔案變更: $file"
    
    claude -p "檔案 $file 已修改。請檢查：
    
    1. 語法是否正確
    2. 是否符合編碼規範  
    3. 是否影響其他相依檔案
    4. 是否需要更新測試
    
    如果發現問題請立即報告。"
done
```

## 依賴更新 Hook
```json
{
  "hooks": {
    "package-updated": {
      "trigger": "file-change",
      "patterns": ["package.json", "package-lock.json"],
      "command": "claude -p '套件依賴已更新。請檢查：\\n1. 新版本的重大變更\\n2. 安全漏洞掃描\\n3. 相容性問題\\n4. 效能影響評估\\n\\n請提供升級建議和注意事項。'",
      "enabled": true
    }
  }
}
```

===

# Hook 管理最佳實踐

## ✅ 建議做法

### Hook 效能優化
```json
{
  "hooks": {
    "lightweight-check": {
      "command": "claude -p --max-tokens 200 '快速檢查語法錯誤'",
      "timeout": 30,
      "enabled": true
    },
    "detailed-analysis": {
      "command": "claude -p '詳細分析程式碼品質'",
      "timeout": 120,
      "manual-trigger": true
    }
  }
}
```

### 條件式執行
```bash
# 只在工作時間執行
if [[ $(date +%H) -ge 9 && $(date +%H) -le 18 ]]; then
    claude -p "執行程式碼審查..."
fi

# 只在特定分支執行
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" == "main" || "$BRANCH" == "develop" ]]; then
    claude -p "執行安全性檢查..."
fi
```

===

# 故障排除

## Hook 除錯
```bash
# 檢查 hook 狀態
claude hooks status

# 測試 hook 執行
claude hooks test pre-commit

# 檢視 hook 日誌
claude hooks logs --since "1 hour ago"
```

## 效能監控
```json
{
  "hooks": {
    "monitoring": {
      "log-execution-time": true,
      "max-execution-time": 60,
      "retry-on-failure": 2,
      "notification-on-slow": true
    }
  }
}
```

## 安全考量
```json
{
  "hooks": {
    "security": {
      "allowed-commands": ["claude"],
      "sandbox-mode": true,
      "api-key-validation": true,
      "rate-limiting": {
        "max-calls-per-minute": 10
      }
    }
  }
}
```