---
title: "無頭模式：claude -p"
description: "程式化整合 Claude Code 到自動化流程"
author: "Workshop Instructor"
date: "2024-07-04"
---

# 無頭模式：claude -p

無頭模式讓 Claude Code 能夠整合到 CI/CD、腳本和自動化工作流程中。

## 🤖 什麼是無頭模式？

### 核心特性
- **非互動式執行**: 無需使用者輸入
- **腳本友善**: 可在 shell script 中使用
- **CI/CD 整合**: 適合自動化管線
- **程式化控制**: 通過參數控制行為

### 基本語法
```bash
# 基本無頭模式
claude -p "你的提示內容"

# 指定輸出格式
claude -p "分析程式碼" --output-format stream-json

# 設定工具白名單
claude -p "執行測試" --allowed-tools read,bash
```

===

# CI/CD 整合應用

## GitHub Actions 整合
```yaml
name: Code Review with Claude

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Install Claude Code
      run: npm install -g @anthropic-ai/claude-code
      
    - name: Run Code Analysis
      env:
        ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      run: |
        claude -p "請分析這個 PR 的程式碼變更：
        
        1. 檢查程式碼品質和風格
        2. 識別潛在的錯誤或問題
        3. 評估安全性風險
        4. 檢查測試覆蓋率
        5. 建議改善方案
        
        請產生結構化的審查報告。" \
        --output-format json > review-result.json
        
    - name: Post Review Comment
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          const review = JSON.parse(fs.readFileSync('review-result.json', 'utf8'));
          
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: `🤖 **Claude Code 審查報告**\n\n${review.content}`
          });
```

## GitLab CI 整合
```yaml
# .gitlab-ci.yml
stages:
  - code-analysis
  - test
  - deploy

claude-analysis:
  stage: code-analysis
  image: node:18
  script:
    - npm install -g @anthropic-ai/claude-code
    - |
      claude -p "分析 GitLab CI 中的程式碼變更：
      
      1. 程式碼品質檢查
      2. 安全性漏洞掃描
      3. 效能影響評估
      4. 依賴關係分析
      
      如果發現嚴重問題，請設定 exit code 1。" \
      --allowed-tools read,grep,bash
  artifacts:
    reports:
      junit: analysis-report.xml
```

===

# 自動化腳本應用

## 部署前檢查腳本
```bash
#!/bin/bash
# deploy-check.sh

echo "🚀 執行部署前檢查..."

# 執行 Claude Code 分析
ANALYSIS_RESULT=$(claude -p "執行部署前完整檢查：

1. 確認所有測試通過
2. 檢查建構是否成功
3. 驗證環境變數設定
4. 檢查資料庫遷移腳本
5. 確認安全性設定
6. 評估效能影響

如果所有檢查通過，回應 'DEPLOY_READY'。
如果有問題，詳細說明問題並回應 'DEPLOY_BLOCKED'。" \
--output-format text)

echo "Claude 分析結果: $ANALYSIS_RESULT"

# 檢查結果並決定是否繼續部署
if [[ "$ANALYSIS_RESULT" == *"DEPLOY_READY"* ]]; then
    echo "✅ 部署檢查通過，開始部署..."
    ./deploy.sh
else
    echo "❌ 部署檢查失敗，部署已取消"
    echo "$ANALYSIS_RESULT"
    exit 1
fi
```

## 程式碼品質監控
```bash
#!/bin/bash
# quality-monitor.sh

# 每日程式碼品質檢查
DATE=$(date +%Y-%m-%d)
REPORT_FILE="quality-report-$DATE.md"

claude -p "執行每日程式碼品質檢查：

1. 分析最近 24 小時的 commits
2. 檢查程式碼複雜度趨勢
3. 評估技術債務變化
4. 識別需要重構的區域
5. 產生改善建議

請產生 Markdown 格式的詳細報告。" \
--output-format text > "$REPORT_FILE"

# 如果發現嚴重問題，發送通知
if grep -q "嚴重" "$REPORT_FILE"; then
    # 發送 Slack 通知
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"⚠️ 程式碼品質檢查發現嚴重問題，請查看 $REPORT_FILE\"}" \
        "$SLACK_WEBHOOK_URL"
fi
```

===

# 大規模自動化應用

## 批量程式碼分析
```bash
#!/bin/bash
# batch-analysis.sh

# 分析多個專案的程式碼品質
PROJECTS=("project-a" "project-b" "project-c")

for project in "${PROJECTS[@]}"; do
    echo "分析專案: $project"
    
    cd "$project" || continue
    
    claude -p "分析專案 $project 的整體狀況：
    
    1. 程式碼品質評分 (1-10)
    2. 安全性風險等級
    3. 效能瓶頸識別
    4. 技術債務評估
    5. 優先改善建議
    
    請產生 JSON 格式的報告。" \
    --output-format json > "../reports/$project-analysis.json"
    
    cd ..
done

# 彙整所有報告
claude -p "請彙整以下專案的分析報告，產生整體的改善優先級：
$(cat reports/*.json)" \
--output-format text > "overall-report.md"
```

## 遷移輔助自動化
```bash
#!/bin/bash
# migration-helper.sh

echo "🔄 自動化程式碼遷移輔助"

# 分析遷移範圍
claude -p "分析從 React 16 升級到 React 18 的影響：

1. 掃描使用過時 API 的檔案
2. 識別需要更新的依賴
3. 檢查潛在的 breaking changes
4. 產生遷移清單和時間估算

請列出具體的檔案和修改建議。" \
--allowed-tools read,grep,bash > migration-plan.md

echo "📋 遷移計劃已產生: migration-plan.md"

# 自動修復簡單問題
claude -p "請自動修復 migration-plan.md 中標記為 '簡單' 的問題：

1. 更新 import 語法
2. 替換過時的 API 呼叫
3. 更新 prop types
4. 修復語法警告

只修改確定安全的變更，複雜問題請保持不變。" \
--allowed-tools read,edit,bash

echo "🔧 自動修復完成，請檢查變更"
```

===

# 進階設定與選項

## 輸出格式控制
```bash
# JSON 格式輸出
claude -p "分析程式碼" --output-format json

# 流式 JSON 輸出
claude -p "長時間分析" --output-format stream-json

# 純文字輸出 (預設)
claude -p "簡單查詢" --output-format text

# 結構化輸出
claude -p "產生報告" --output-format structured
```

## 工具權限控制
```bash
# 只允許讀取檔案
claude -p "分析程式碼" --allowed-tools read

# 允許讀取和 bash 執行
claude -p "執行測試" --allowed-tools read,bash

# 允許所有工具 (預設)
claude -p "完整開發任務" --allowed-tools all

# 禁用特定工具
claude -p "安全分析" --denied-tools edit,write
```

## 效能和資源控制
```bash
# 設定超時時間
claude -p "長時間分析" --timeout 300

# 設定記憶體限制
claude -p "大型專案分析" --memory-limit 2G

# 設定並發限制
claude -p "批量處理" --max-concurrent 3
```

===

# 最佳實踐

## ✅ 有效的自動化模式

### 錯誤處理
```bash
# robust 錯誤處理
if ! claude -p "執行檢查" --timeout 60; then
    echo "Claude 執行失敗，使用備用方案"
    fallback_check
    exit 1
fi
```

### 日誌記錄
```bash
# 完整的日誌記錄
LOG_FILE="claude-automation-$(date +%Y%m%d).log"

{
    echo "開始時間: $(date)"
    claude -p "執行自動化任務" 2>&1
    echo "結束時間: $(date)"
} >> "$LOG_FILE"
```

### 資源清理
```bash
# 自動清理暫存檔案
trap 'rm -f /tmp/claude-*' EXIT

claude -p "處理大型檔案" --temp-dir /tmp
```

## 🔒 安全性考量
```bash
# API Key 安全管理
export ANTHROPIC_API_KEY=$(vault read -field=api_key secret/claude)

# 限制檔案存取範圍
claude -p "分析專案" --sandbox-path /project/src

# 稽核記錄
claude -p "敏感操作" --audit-log /var/log/claude-audit.log
```