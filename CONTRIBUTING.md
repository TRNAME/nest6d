# Contributing Guide

Thank you for your interest in nest6d! This document helps you get started with contributing to the project.

---

## Before You Start

- Read the [README](./README.md) to understand the project
- Search existing [Issues](https://github.com/TRNAME/nest6d/issues) to avoid duplicates

---

## How to Contribute

### Reporting Bugs


When submitting an [Issue](https://github.com/TRNAME/nest6d/issues/new), include:
- Problem description
- Steps to reproduce
- Expected vs actual behavior
- Environment info (Node version, OS)
- Error logs or screenshots

### Suggesting Features

Start a topic in [Discussions](https://github.com/TRNAME/nest6d/discussions):
- Describe the use case
- Explain why this feature is needed
- Possible implementation approach (optional)

---

### Submitting Code

#### 1. Preparation

```
# Fork the repository and clone
git clone https://github.com/YOURNAME/nest6d.git
cd nest6d

# Add upstream remote
git remote add upstream https://github.com/TRNAME/nest6d.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```
   
#### 2. Development Workflow
```
# Sync with upstream latest code
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Develop and commit
npm run start:dev        # Local testing
npm run lint             # Check code style
npm run test             # Run tests

git add .
git commit -m "eat: add xxx feature"
git push origin feature/your-feature-name
```
 
#### 3. Create Pull Request
 - Title format: type: description (e.g., feat: add user search)
 - Reference related Issues in description (e.g., Closes #123)
 - Wait for Code Review
    
---

### Commit Convention
Use Conventional Commits：

|Type|Purpose|Example|
|---|---|---|
|feat:|New feature|feat: add JWT refresh token|
|fix:|	Bug fix| fix: fix login validation failure|
|docs:|	Documentation|	docs: update API documentation|
|style:|	Code formatting|	style: format indentation|
|refactor:|	Refactoring|	refactor: optimize query performance|
|test:|	Testing|	test: add user module tests|
|chore:|	Build/tools|	chore: update dependency versions|
            

--- 

### Code Standards
- TypeScript：Strict mode, avoid any
- Naming: camelCase for variables/functions, PascalCase for classes
- Comments: Explain complex logic
- Tests: New features need accompanying tests
```
# Pre-submission checks
npm run lint        # ESLint check
npm run format      # Prettier formatting
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
```

---

### Development Environment
```
# Start database with Docker
docker-compose up -d mysql

# Development mode
npm run start:dev

# Access
# Swagger: http://localhost:3000/docs
```
       
---

### Project Structure
```
src/
├── auth/          # Authentication module
├── user/          # User module
├── roles/         # Permission module
├── audit/         # Audit logs
└── types/         # Global types
```
Please maintain clear module boundaries when modifying.

---

### Getting Help
 - 💬 GitHub Discussions - Q&A
 - 🐛 GitHub Issues - Bug reports

---

### Code of Conduct
 - Respect others, communicate kindly
 - Accept constructive criticism
 - Focus on community best interests

---

**Thank you again for your contribution! 🎉**