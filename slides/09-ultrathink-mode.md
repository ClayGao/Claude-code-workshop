---
title: "Ultrathink 超級思維模式"
description: "啟動 Claude 的深度思考能力"
author: "Workshop Instructor"
date: "2024-07-04"
---

# Ultrathink 超級思維模式

Claude Code 提供思維層級系統，讓 Claude 投入更多運算資源進行深度分析。

## 🧠 思維層級階層

### 思考強度遞增
```
"think" < "think hard" < "think harder" < "ultrathink"
```

### 運算資源分配
- **think**: 快速回應，基本推理
- **think hard**: 深入分析，多角度思考  
- **think harder**: 全面考量，系統性思維
- **ultrathink**: 最高級思考，複雜問題解決

===

# 如何觸發 Ultrathink

## 直接指令
```bash
# 明確要求最高級思考
"使用 ultrathink 分析這個系統架構問題"

# 在複雜任務中使用
"ultrathink 如何重構這個 10 萬行的舊專案？"

# 解決困難錯誤
"這個併發錯誤很難追蹤，請 ultrathink"
```

## 自動觸發場景
Claude Code 會在以下情況自動啟用 ultrathink：
- 複雜的系統設計問題
- 多檔案重構任務
- 效能優化分析
- 安全漏洞分析

===

# Ultrathink 應用場景

## 🏗️ 系統架構設計

### 問題描述
```bash
"我們需要設計一個能處理百萬用戶的電商平台，
ultrathink 最佳的架構方案"
```

### Ultrathink 分析過程
```
🧠 Ultrathink 啟動...

分析維度:
✓ 可擴展性需求分析
✓ 資料庫設計策略  
✓ 快取策略規劃
✓ 負載平衡架構
✓ 微服務劃分
✓ 資料一致性考量
✓ 安全性設計
✓ 監控與維運

推薦架構:
- 前端: CDN + React SPA
- API: 負載平衡 + Node.js 微服務
- 資料庫: PostgreSQL 主從 + Redis 快取
- 訊息佇列: RabbitMQ
- 容器化: Docker + Kubernetes
```

===

# 🔧 複雜重構任務

## 大型程式碼庫重構
```bash
"這個 Laravel 專案有 50 萬行程式碼，
ultrathink 如何遷移到微服務架構？"
```

## Ultrathink 輸出
```markdown
# 微服務遷移策略

## 階段一：分析與規劃 (2-3 週)
1. 程式碼依賴關係分析
2. 業務領域劃分
3. 資料庫分割策略
4. API 邊界設計

## 階段二：基礎設施準備 (2 週)  
1. 容器化環境建置
2. CI/CD 管線設計
3. 監控系統建立
4. 服務發現機制

## 階段三：漸進式分割 (3-6 個月)
1. 使用者服務分離
2. 產品目錄服務
3. 訂單處理服務  
4. 支付服務分離

## 風險評估與緩解策略
- 資料一致性風險 → 事件溯源模式
- 服務通訊複雜度 → API Gateway
- 監控複雜度 → 分散式追蹤
```

===

# 🐛 困難問題除錯

## 複雜併發問題
```bash
"我們的 Node.js 應用在高負載時偶爾當機，
ultrathink 找出根本原因"
```

## 深度分析
```
🧠 Ultrathink 併發問題分析...

可能原因分析:
1. 記憶體洩漏
   - Event listener 未清理
   - 閉包引用循環
   - 全域變數累積

2. 非同步處理問題  
   - Promise 競態條件
   - 回調地獄導致堆疊溢出
   - 非同步資源未釋放

3. 資料庫連線問題
   - 連線池耗盡
   - 長時間查詢阻塞
   - 死鎖情況

診斷策略:
1. 啟用 heap dump 分析
2. 添加詳細的效能監控
3. 實作斷路器模式
4. 配置合適的超時機制
```

===

# 🚀 效能優化分析

## 全面效能審查
```bash
"ultrathink 我們的 React 應用效能瓶頸，
並提供完整優化方案"
```

## 系統性分析
```markdown
# 效能優化全面分析

## 前端效能問題
### 渲染效能 (目前: 65fps → 目標: 60fps)
1. 元件重渲染過多
   - 使用 React.memo 優化
   - 實作 useMemo/useCallback
   - 狀態管理優化

2. Bundle 大小過大 (目前: 2.1MB → 目標: 800KB)
   - 程式碼分割 (Code Splitting)
   - Tree shaking 優化
   - 動態 import 載入

### 網路效能
1. 減少 HTTP 請求
2. 實作 Service Worker 快取
3. 圖片延遲載入和壓縮

## 後端效能問題  
### 資料庫查詢 (平均回應: 450ms → 目標: 50ms)
1. 索引優化
2. 查詢語法重構
3. 資料庫連線池設定

### API 回應時間
1. 實作分層快取策略
2. API 回應壓縮
3. 非同步處理優化
```

===

# 最佳實踐

## ✅ 有效使用 Ultrathink

### 適合的問題類型
- **複雜系統設計**: 需要多面向考量
- **大型重構**: 需要詳細規劃
- **效能瓶頸**: 需要深度分析
- **安全審查**: 需要全面檢視

### 問題描述技巧
```bash
# ✅ 清楚的問題描述
"ultrathink 設計一個支援 10 萬併發用戶的聊天系統，
需要考慮可擴展性、資料一致性和成本效益"

# ❌ 模糊的問題
"ultrathink 讓我的應用更快"
```

===

# ⚡ 效率提升技巧

## 分階段思考
```bash
# 第一階段：廣度分析
"ultrathink 先給我一個高層次的解決方案概觀"

# 第二階段：深度實作
"現在 ultrathink 第一個模組的詳細實作方案"
```

## 結合其他功能
```bash
# 與 subagent 結合
"使用 subagent 蒐集相關資料，然後 ultrathink 分析"

# 與 plan-execute 結合  
"ultrathink 制定計劃，然後我確認後執行"
```

## 持續優化
```bash
# 驗證 ultrathink 的建議
"實作了你的 ultrathink 建議，效果如何進一步優化？"

# 學習模式識別
"基於這次的 ultrathink 分析，總結類似問題的解決模式"
```