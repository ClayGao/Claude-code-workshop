---
title: "自定義 Slash Commands"
description: "建立專屬的快速指令"
author: "Workshop Instructor"
date: "2024-07-04"
---

# 自定義 Slash Commands

為重複性工作流程建立專屬的快速指令，提升開發效率。

## 📁 指令儲存位置

### 專案層級指令
```bash
# 專案特定指令
.claude/commands/
├── debug-api.md
├── run-tests.md
├── deploy-staging.md
└── code-review.md
```

### 全域指令
```bash
# 所有專案可用
~/.claude/commands/
├── create-component.md
├── optimize-bundle.md
└── security-audit.md
```

===

# 建立自定義指令

## 基本語法
```markdown
<!-- .claude/commands/debug-api.md -->
# 除錯 API 問題

請按照以下步驟除錯 API 問題：

1. 檢查 API 端點回應狀態
2. 分析錯誤日誌
3. 驗證資料庫連線
4. 檢查中介軟體設定
5. 提供修復建議

如果發現問題，請直接修復並執行測試。
```

## 參數化指令
```markdown
<!-- .claude/commands/create-component.md -->
# 建立 React 元件

請建立一個名為 `{{component_name}}` 的 React 元件：

1. 在 `src/components/` 目錄建立檔案
2. 包含 TypeScript 型別定義
3. 使用 Tailwind CSS 樣式
4. 加入 prop 驗證
5. 建立對應的測試檔案
6. 匯出到 index.js

元件需求：{{requirements}}
```

===

# 進階指令範例

## 程式碼審查指令
```markdown
<!-- .claude/commands/code-review.md -->
# 程式碼審查檢查清單

請審查最近的變更，重點檢查：

## 程式碼品質
- [ ] 符合團隊編碼規範
- [ ] 變數命名清楚易懂  
- [ ] 函數複雜度合理
- [ ] 重複程式碼是否重構

## 功能性
- [ ] 功能是否正確實作
- [ ] 邊界情況處理
- [ ] 錯誤處理是否完整
- [ ] 效能是否符合要求

## 測試
- [ ] 單元測試覆蓋率 > 80%
- [ ] 整合測試完整
- [ ] E2E 測試關鍵路徑

## 安全性  
- [ ] 輸入驗證
- [ ] 授權檢查
- [ ] 敏感資料處理
- [ ] SQL 注入防護

請產生詳細的審查報告。
```

## 部署檢查指令
```markdown
<!-- .claude/commands/deploy-staging.md -->
# 部署到測試環境

執行部署前檢查和部署流程：

## 部署前檢查
1. 確認所有測試通過
2. 檢查環境變數設定
3. 驗證資料庫遷移腳本
4. 確認依賴套件版本

## 部署流程
1. 建構生產版本
2. 執行安全掃描
3. 部署到 staging 環境
4. 執行煙霧測試
5. 更新部署文檔

## 部署後驗證
1. 健康檢查端點
2. 關鍵功能測試
3. 效能監控檢查
4. 錯誤日誌監控

如果任何步驟失敗，立即回滾並報告問題。
```

===

# 使用自定義指令

## 指令選單
```bash
# 輸入 / 查看可用指令
/

顯示選單:
📋 Available Commands:
├── 🐛 /debug-api - 除錯 API 問題
├── ⚛️  /create-component - 建立 React 元件  
├── 👀 /code-review - 程式碼審查
├── 🚀 /deploy-staging - 部署測試環境
└── 🔍 /security-audit - 安全性審查
```

## 執行指令
```bash
# 基本執行
/debug-api

# 帶參數執行  
/create-component
> Component name: UserProfile
> Requirements: 顯示使用者資訊，支援編輯模式

# 直接在對話中使用
"執行 /code-review，然後告訴我需要改善的地方"
```

===

# 團隊協作指令

## 版本控制指令
```markdown
<!-- .claude/commands/feature-branch.md -->
# 建立功能分支

建立新的功能分支並設定開發環境：

1. 從 main 分支建立新分支
   - 分支命名: feature/{{ticket_id}}-{{description}}
2. 更新 CLAUDE.md 記錄功能目標
3. 設定必要的環境變數
4. 安裝或更新依賴
5. 執行初始測試確保環境正常

功能描述：{{feature_description}}
預估完成時間：{{estimated_time}}
```

## 發布準備指令
```markdown
<!-- .claude/commands/release-prep.md -->  
# 發布準備檢查清單

準備 {{version}} 版本發布：

## 程式碼準備
- [ ] 合併所有功能分支
- [ ] 解決所有 merge conflicts
- [ ] 更新版本號 (package.json, changelog)
- [ ] 標籤相關 commits

## 品質保證
- [ ] 全部測試套件通過
- [ ] 效能測試達標
- [ ] 安全掃描無高風險問題
- [ ] 瀏覽器相容性測試

## 文檔更新
- [ ] 更新 CHANGELOG.md
- [ ] 更新 API 文檔
- [ ] 更新使用者指南
- [ ] 準備發布說明

## 部署準備
- [ ] 生產環境設定檢查
- [ ] 資料庫遷移計劃
- [ ] 回滾計劃準備
- [ ] 監控告警設定

請逐項檢查並報告狀態。
```

===

# 最佳實踐

## ✅ 有效的指令設計

### 清楚的目標
```markdown
# ✅ 好的指令標題
# 修復登入功能錯誤

# ❌ 模糊的指令標題  
# 修復問題
```

### 結構化步驟
```markdown
# ✅ 結構化指令
1. 檢查症狀
2. 分析原因
3. 實作修復
4. 驗證結果

# ❌ 模糊指令
請修復登入問題
```

### 包含上下文
```markdown
# ✅ 提供上下文
這是一個 Next.js 專案，使用 NextAuth.js 處理認證。
登入功能位於 pages/api/auth/[...nextauth].js

# ❌ 缺乏上下文
修復登入
```

===

# 指令管理

## 版本控制
```bash
# 將指令納入 Git 管理
git add .claude/commands/
git commit -m "feat: add custom debug commands"

# 團隊共享指令
git push origin main
```

## 指令更新
```bash
# 檢查指令是否需要更新
"檢查 /debug-api 指令是否還適用於新的 API 架構"

# 更新指令內容
"請更新 /create-component 指令，加入新的測試框架要求"
```

## 指令文檔
```markdown
<!-- .claude/commands/README.md -->
# 自定義指令說明

## 開發相關
- `/debug-api` - API 問題診斷
- `/create-component` - React 元件產生器
- `/run-tests` - 完整測試套件

## 部署相關  
- `/deploy-staging` - 測試環境部署
- `/release-prep` - 發布前檢查

## 維護相關
- `/security-audit` - 安全性檢查
- `/performance-check` - 效能分析

## 使用方法
1. 輸入 `/` 查看可用指令
2. 選擇指令或直接輸入指令名
3. 根據提示提供參數
4. 確認執行結果
```