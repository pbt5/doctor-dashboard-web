# doctor-dashboard-web

醫師儀表板 - React + Vite 前端專案

## 專案簡介

這是一個基於 React 和 Vite 的最簡化醫師儀表板前端專案，提供患者與用藥紀錄查詢功能。

## 功能特點

- 🏥 患者列表查詢
- 💊 用藥紀錄查詢
- 🔌 可配置的 API 端點
- ⚡ 基於 Vite 的快速開發體驗

## 技術棧

- React 18
- Vite 5
- 純 JavaScript（無需額外 UI 框架）

## 快速開始

### 安裝依賴

```bash
npm install
```

### 配置環境變數

複製 `.env.example` 為 `.env` 並設定 API 端點：

```bash
cp .env.example .env
```

編輯 `.env` 文件：

```
VITE_API_URL=http://localhost:8000
```

### 開發模式

```bash
npm run dev
```

瀏覽器訪問：http://localhost:3000

### 生產構建

```bash
npm run build
```

構建文件將輸出到 `dist/` 目錄。

### 預覽生產構建

```bash
npm run preview
```

## 部署指示

### 1. 靜態網站託管（推薦）

#### Vercel 部署

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或通過 Vercel 網站導入 GitHub repo 自動部署。

#### Netlify 部署

```bash
# 安裝 Netlify CLI
npm i -g netlify-cli

# 構建並部署
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages 部署

1. 在 `vite.config.js` 添加 `base` 配置：
   ```js
   export default defineConfig({
     base: '/doctor-dashboard-web/',
     // ... 其他配置
   })
   ```

2. 構建並部署：
   ```bash
   npm run build
   git subtree push --prefix dist origin gh-pages
   ```

### 2. Docker 部署

創建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

構建並運行：

```bash
docker build -t doctor-dashboard .
docker run -p 80:80 doctor-dashboard
```

### 3. 傳統服務器部署

1. 構建專案：
   ```bash
   npm run build
   ```

2. 將 `dist/` 目錄內容上傳到服務器的 web 根目錄

3. 配置 Nginx/Apache 將所有請求重定向到 `index.html`（支持 SPA 路由）

Nginx 配置示例：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/doctor-dashboard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 環境變數說明

| 變數名 | 說明 | 預設值 |
|--------|------|--------|
| `VITE_API_URL` | 後端 API 端點 | `http://localhost:8000` |

## API 端點

專案預期以下 API 端點：

- `GET /api/patients` - 取得患者列表
- `GET /api/medications/:patientId` - 取得指定患者的用藥紀錄

## 專案結構

```
doctor-dashboard-web/
├── index.html          # HTML 入口
├── package.json        # 依賴配置
├── vite.config.js      # Vite 配置
├── .env.example        # 環境變數範例
├── .gitignore          # Git 忽略配置
├── README.md           # 專案文檔
└── src/
    ├── main.jsx        # 應用入口
    └── App.jsx         # 主要組件（醫師儀表板 UI）
```

## 瀏覽器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 開發建議

- 使用 Node.js 18 或更高版本
- 建議使用 npm 或 pnpm 作為包管理器
- 開發時確保後端 API 服務已啟動

## 授權

MIT
