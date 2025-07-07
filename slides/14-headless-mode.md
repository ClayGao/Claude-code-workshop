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
claude -p "分析程式碼" --output-format json
```

===

Output:

```json
{
  "type": "result",
  "subtype": "success",
  "is_error": false,
  "duration_ms": 38549,
  "duration_api_ms": 37885,
  "num_turns": 20,
  "result": "## 技術棧與架構\n\n**技術棧：**\n- React 18 + TypeScript + Vite\n- Tailwind CSS + SCSS\n- Zustand 狀態管理\n- React Router v6\n- SWR 數據獲取\n- Storybook 組件開發\n- Vitest 測試框架\n\n**架構模式：**\n- **Container/Component 分離**：\n  - Components 只處理 UI 邏輯\n  - Containers 負責數據獲取與處理\n- **模塊化設計**：使用 lazy loading 優化性能\n- **Hook 驅動**：大量使用自定義 hooks 封裝業務邏輯\n\n## 主要功能模塊\n\n1. **用戶認證系統**\n   - 支持多平台登錄（Shopify、Apple ID、OAuth）\n   - 多區域商店支持（US、EU、JP等）\n   - 密碼重置、郵箱驗證流程\n\n2. **用戶中心功能**\n   - 帳戶概覽、個人資料編輯\n   - 產品註冊、設備管理\n   - 軟件授權管理\n   - 訂單查詢與詳情\n\n3. **Positive Access 會員系統**（最新開發）\n   - 積分管理與轉移\n   - 多商店積分整合\n   - 獎勵歷史記錄\n   - 商店切換功能\n\n4. **消息系統**\n   - 集成 Zendesk 客服記錄\n   - 用戶與客服溝通歷史\n\n## 項目特色\n\n**多環境支持：**\n- Sandbox、Dev、Production 環境\n- 多區域商店配置\n- 動態環境變量處理\n\n**用戶體驗優化：**\n- 響應式設計（mobile-first）\n- 組件懶加載\n- 全局加載狀態管理\n- 錯誤邊界處理\n\n**開發工程化：**\n- TypeScript 強類型\n- ESLint + Prettier 代碼規範\n- Husky + lint-staged 提交檢查\n- Plop 代碼生成器\n\n## 代碼品質評估\n\n**優點：**\n- 架構清晰，職責分離明確\n- 組件復用性高，有 Storybook 支持\n- 完整的開發工具鏈\n- 良好的錯誤處理機制\n\n**可優化點：**\n- 部分組件可進一步細化\n- 測試覆蓋率可以提升\n- 某些長文件可考慮拆分\n\n總體而言，這是一個結構良好、技術棧現代化的 React 應用程序，適合持續維護和功能擴展。",
  "session_id": "be82b95c-a660-4562-8e4d-73ac6e9d1879",
  "total_cost_usd": 0.23685060000000002,
  "usage": {
    "input_tokens": 28,
    "cache_creation_input_tokens": 48494,
    "cache_read_input_tokens": 111947,
    "output_tokens": 1422,
    "server_tool_use": {
      "web_search_requests": 0
    },
    "service_tier": "standard"
  }
}
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