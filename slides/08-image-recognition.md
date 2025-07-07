---
title: "圖像辨識：Ctrl + V 貼上截圖"
description: "利用 Claude 的視覺能力解決問題"
author: "Workshop Instructor"
date: "2024-07-04"
---

# 圖像辨識：視覺化除錯

Claude Code 支援圖像輸入，讓你能透過截圖快速描述問題。

## 🖼️ 支援的圖像類型

### 截圖內容
- **錯誤訊息**: 瀏覽器 console、終端錯誤
- **UI 問題**: 版面錯亂、樣式問題
- **程式碼片段**: 書本、文檔、其他螢幕
- **設計稿**: Figma、Sketch 設計圖

===

# 使用方法

## 基本操作
```bash
# 1. 啟動 Claude Code
claude

# 2. 截圖 (任何截圖工具)
# macOS: Cmd + Shift + 4
# Windows: Win + Shift + S  
# Linux: Print Screen

# 3. 直接貼上
Ctrl + V (或 Cmd + V)

# 4. 描述問題
"這個錯誤是什麼意思？如何修復？"
```

## 進階技巧
```bash
# 組合文字和圖像
"我的網站在手機上顯示有問題，請看這個截圖：
[貼上截圖]
請幫我修復響應式設計"
```

===

# 實際應用場景

## 🐛 錯誤除錯

### 瀏覽器錯誤
```
[貼上 console 錯誤截圖]
"這個 React 錯誤如何修復？"

Claude 回應:
"我看到這是一個 'Cannot read property of undefined' 錯誤。
問題出現在第 42 行，userProfile 物件為 undefined。
我建議加入條件渲染..."
```

### 建構錯誤
```
[貼上終端錯誤截圖]  
"Webpack 建構失敗，請幫我解決"

Claude 回應:
"錯誤顯示模組解析失敗。問題是路徑別名設定錯誤。
請檢查 webpack.config.js 中的 resolve.alias..."
```

===

# 🎨 UI/UX 問題

## 版面問題
```
[貼上網頁截圖]
"這個版面在手機上壞掉了，請幫我修復"

Claude 分析:
- 側邊欄沒有正確摺疊
- 文字溢出容器邊界  
- 按鈕堆疊在一起

建議的 CSS 修復:
```

```css
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .content {
    padding: 1rem;
    overflow-wrap: break-word;
  }
  
  .button-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

===

# 📐 設計實作

## 從設計稿到程式碼
```
[貼上 Figma 設計截圖]
"請幫我實作這個卡片元件"

Claude 產生:
```

```jsx
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">
          ${product.price}
        </span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          加入購物車
        </button>
      </div>
    </div>
  )
}
```

===

# 📖 程式碼文檔

## 書本/文章截圖
```
[貼上程式書籍截圖]
"請解釋這個演算法，並幫我用 JavaScript 實作"

Claude 解析:
"這是快速排序演算法。我看到書中使用 Pascal 語言。
讓我用現代 JavaScript 重新實作..."
```

## API 文檔
```
[貼上 API 文檔截圖]
"根據這個 API 規格，幫我寫一個 fetch 函數"

Claude 產生:
```

```javascript
async function fetchUserProfile(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user profile:', error)
    throw error
  }
}
```

===

# 最佳實踐

## ✅ 有效的截圖
- **清晰度高**: 文字清楚可讀
- **包含關鍵資訊**: 錯誤訊息完整
- **適當裁切**: 聚焦問題區域
- **良好對比**: 確保文字和背景對比度

## 🎯 描述要點
```bash
# 具體描述期望
"這個登入頁面和設計稿不符，請幫我調整間距和顏色"

# 提供上下文
"我在手機 Safari 上看到這個錯誤，但桌面版正常"

# 指出關注點
"請特別注意右上角的導航選單，它沒有正確摺疊"
```

## 🔄 迭代改進
```bash
# 第一次截圖後
Claude: "我已經修復了主要問題"

# 驗證修復後再截圖
"修復後的結果，還有小問題："
[貼上新截圖]

# 繼續優化
Claude: "我看到按鈕位置還需要調整..."
```