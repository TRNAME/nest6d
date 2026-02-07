# Dockerfile 多阶段
# 1. 依赖层（仅生产依赖）
# 别名deps
FROM node:20-alpine AS deps
# 设置容器内工作目录为 /app
WORKDIR /app
# 只复制 package.json 和 package-lock.json（利用 Docker 缓存，依赖不变时这层不重建）
COPY package*.json ./
# npm ci：严格按 package-lock.json 安装（比 npm i 快且稳）
# --omit=dev：不装开发依赖（typescript、jest、@types 等）
# npm cache clean --force：强制清缓存，减镜像体积
RUN npm ci --omit=dev && npm cache clean --force

# 2. 构建层（全量装 → 编译 → 彻底剪干净）
FROM node:20-alpine AS builder
WORKDIR /app
# ① 全量依赖（含 devDeps）
COPY package*.json ./
RUN npm ci
COPY . .
# ② 编译，生成 dist/ 目录
RUN npm run build
# ③ 一把剪刀：删掉所有源码、测试、文档、dev 依赖
# 把 dev 依赖全删掉，只留生产需要的；--ignore-scripts：不执行 postinstall 脚本（防某些包下载二进制）
RUN npm ci --omit=dev --ignore-scripts && \
    # 删所有文档（readme、changelog）
    find node_modules -name '*.md' -delete && \
    # 删 SourceMap（生产环境不需要调试）
    find node_modules -name '*.map' -delete && \
    find node_modules -name 'test' -type d -exec rm -rf {} + && \
    find node_modules -name 'docs' -type d -exec rm -rf {} + && \
    # 把“巨型包”文档也干掉（按实际大小删）；|| true：找不到文件也不报错，继续执行
    find node_modules/lodash -name '*.js' -path '*/doc/*' -delete || true && \
    find node_modules/@types -name '*.md' -delete || true

# 3. 运行层（最小）
FROM node:20-alpine
WORKDIR /app
# 设置环境变量，NestJS 会切到生产模式（关闭调试、启用缓存等）
ENV NODE_ENV=production
# 拷“剪完”的 node_modules + 编译产物
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
# 最后清系统缓存，Alpine 的包管理缓存、临时文件、帮助文档
RUN rm -rf /var/cache/apk/* /tmp/* /usr/share/man/*
# 不复制 tsconfig、测试、文档等
# 告诉 Docker 这容器会监听 3000
EXPOSE 3000
# 启动命令，直接运行编译后的 dist/main.js
CMD ["node", "dist/main"]