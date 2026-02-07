# nest6d

---

6天NestJS入门实战项目
> 作者：[@TRNAME](https://github.com/TRNAME)  
> 项目地址：https://github.com/TRNAME/nest6d  
> 协议：MIT License

---

#### 语言: 中文 | [English](README.md)

--- 

## 快速开始

```
# 安装
npm install

# 配置.env（复制后修改）
cp .env.example .env

# Docker部署，进入docker-compose.yml下启动，yml根据备注按需更改
docker-compose up -d

# 开发模式
npm run start:dev
```
⚠️ 注意：数据库必须先创建 admin 角色，否则无法分配管理员权限。

--- 

## 核心功能

- 认证：JWT + APP_GUARD 全局守卫
- 权限：RBAC角色控制（user/admin）
- 数据：TypeORM + MySQL + 软删
- 工具：Swagger / Pino日志 / 全局验证 / 分页搜索
- 部署：Docker / GitHub Actions / HTTPS / Railway

--- 

## 项目结构
```
src/
├── audit/         # 审计日志
├── auth/          # JWT认证
├── roles/         # RBAC 角色权限模块
├── types/         # 全局类型定义
├── user/          # 用户CRUD（含软删）
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts        # 入口
```

--- 

## 环境变量
```
# NestJS 应用MySQL
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=test

# MySQL容器本身 专用（只有第一次启动时生效，初始化数据库）
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=root

# App
APP_PORT=3000
NODE_ENV=development
```

--- 

## 镜像部署

推送代码后GitHub Actions自动构建推送至 ghcr.io/trname/nest6d，服务器拉取运行：
```
docker pull ghcr.io/<your-username>/nest6d:latest  //<your-username>改成自己的，Docker 镜像名必须是小写
docker-compose up -d    // 进入docker-compose.yml下启动，yml根据备注按需更改
```

--- 

## 常用命令

### 测试
```
npm run test
npm run test:e2e
```

### 本地 Docker部署
```
docker build -t nest6d .
docker-compose up -d    // docker-compose.yml根据备注按需更改
```

--- 

## 技术栈
NestJS + TypeScript + TypeORM + MySQL + JWT + Docker

--- 

## 贡献

🎉欢迎提交 Issue 和 PR！详见 [CONTRIBUTING.md](./CONTRIBUTING_zh.md)。

--- 

## 作者

- **项目地址**: https://github.com/trname/nest6d
- **GitHub**: [@TRNAME](https://github.com/TRNAME)

--- 

## 许可证

MIT© 2026 TRNAME
