# 贡献指南

感谢你对 nest6d 的兴趣！本文档帮助你快速参与项目。

---

## 开始之前

- 阅读 [README](./README_zh.md) 了解项目
- 搜索已有 [Issues](https://github.com/TRNAME/nest6d/issues)，避免重复

---

## 如何贡献

### 报告 Bug

提交 [Issue](https://github.com/TRNAME/nest6d/issues/new) 时包含：
- 问题描述
- 复现步骤
- 预期行为 vs 实际行为
- 环境信息（Node 版本、操作系统）
- 错误日志或截图

### 建议功能

在 [Discussions](https://github.com/TRNAME/nest6d/discussions) 开启话题：
- 描述使用场景
- 解释为什么需要这个功能
- 可能的实现方案（可选）

--- 

### 提交代码

#### 1. 准备工作

```bash
# Fork 仓库后克隆
git clone https://github.com/YOURNAME/nest6d.git
cd nest6d

# 添加上游仓库
git remote add upstream https://github.com/TRNAME/nest6d.git

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env
```
   
#### 2. 开发流程
```
# 同步上游最新代码
git fetch upstream
git checkout main
git merge upstream/main

# 创建功能分支
git checkout -b feature/your-feature-name

# 开发并提交
npm run start:dev        # 本地测试
npm run lint             # 检查代码规范
npm run test             # 运行测试

git add .
git commit -m "feat: 添加某某功能"
git push origin feature/your-feature-name
```
 
#### 3. 创建 Pull Request
 - 标题格式：类型: 描述（如 feat: 添加用户搜索功能）
 - 描述中关联相关 Issue（如 Closes #123）
 - 等待 Code Review
    
---

### 提交规范
使用 Conventional Commits：

|类型|用途|示例|
|---|---|---|
|feat:|新功能|feat: 添加 JWT 刷新令牌|
|fix:|	修复|	fix: 修复登录验证失败|
|docs:|	文档更新|	docs: 更新 API 文档|
|style:|	代码格式|	style: 格式化缩进|
|refactor:|	重构|	refactor: 优化查询性能|
|test:|	测试相关|	test: 添加用户模块测试|
|chore:|	构建/工具|	chore: 更新依赖版本|
            

--- 

### 代码规范
- TypeScript：严格模式，避免 any
- 命名：变量/函数用 camelCase，类用 PascalCase
- 注释：复杂逻辑需说明原因
- 测试：新功能需配套测试
```
# 提交前检查
npm run lint        # ESLint 检查
npm run format      # Prettier 格式化
npm run test        # 单元测试
npm run test:e2e    # 端到端测试
```

---

### 开发环境
```
# Docker 启动数据库
docker-compose up -d mysql

# 开发模式
npm run start:dev

# 访问
# Swagger: http://localhost:3000/docs
```
       

---

### 项目结构
```
src/
├── auth/          # 认证模块
├── user/          # 用户模块
├── roles/         # 权限模块
├── audit/         # 审计日志
└── types/         # 全局类型
```
修改时请保持模块边界清晰。

---

### 获取帮助
 - 💬 GitHub Discussions - 提问交流
 - 🐛 GitHub Issues - Bug 报告

---

### 行为准则
 - 尊重他人，友善沟通
 - 接受建设性批评
 - 关注社区最佳利益

---

**再次感谢你的贡献！🎉**