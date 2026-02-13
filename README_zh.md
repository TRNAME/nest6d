# nest6d

---

6天NestJS入门实战项目
> 作者：[@TRNAME](https://github.com/TRNAME)  
> 项目地址：https://github.com/TRNAME/nest6d  
> 协议：MIT License

---

#### 语言: 中文 | [English](README.md)

--- 

## 技术栈
NestJS + TypeScript + TypeORM + MySQL/PostgreSQL + JWT + Docker

--- 

## 6 天学习路线图
> 每天 5 小时，6 天掌握 NestJS 全栈开发。


| Day | 上午 2h | 下午 2h | 晚上 1h | 产出物 |
|:---:|:---|:---|:---|:---|
| **D1** | 骨架 + Ping | TypeORM + User 表 | 全局验证 | 可 CRUD 用户 |
| **D2** | JWT 三接口 | 守卫 + 装饰器 | Swagger 文档 | 认证体系完工 |
| **D3** | RBAC + 软删 | 全局异常 + 日志 | 事务脚本 | 安全 + 日志 |
| **D4** | 分页 + 搜索 | 配置多环境 | Docker 化 | 容器镜像 |
| **D5** | CI 脚本 | 云服务器准备 | HTTPS | 自动部署 |
| **D6** | 补测试 & 文档 | 上线 + 域名 | 整理 README | 🎉 生产地址 |

### 学习建议
- **D1-D2**：重点理解 NestJS 的模块化思想和依赖注入
- **D3**：RBAC 是企业级项目必备，务必掌握
- **D4-D5**：DevOps 技能
- **D6**：完善文档

--- 

## 快速开始

```bash
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
- 数据：TypeORM + MySQL/PostgreSQL + 软删
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
; DB_HOST=postgres
; DB_PORT=5432
DB_USER=root
DB_PASS=root
DB_NAME=test

# MySQL容器本身 专用（只有第一次启动时生效，初始化数据库）
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=root

# 【可选】PostgreSQL容器本身 专用（只有第一次启动时生效，初始化数据库）
; POSTGRES_USER=root
; POSTGRES_PASSWORD=root
; POSTGRES_DB=test

# App
APP_PORT=3000
NODE_ENV=development
```

--- 

## 镜像部署

推送代码后GitHub Actions自动构建推送至 ghcr.io/trname/nest6d。
服务器拉取运行：
```bash
docker pull ghcr.io/<your-username>/nest6d:latest  # <your-username> 改成自己的，必须小写
docker-compose up -d    # 进入docker-compose.yml下启动，yml根据备注按需更改
```

--- 

## 常用命令

### 测试
```bash
npm run test
npm run test:e2e
```

### 本地 Docker部署
```bash
docker build -t nest6d .
docker-compose up -d    // docker-compose.yml根据备注按需更改
```

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
