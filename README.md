# nest6d

---

6-Day NestJS Beginner Practical Project
> Author：[@TRNAME](https://github.com/TRNAME)  
> Project address：https://github.com/TRNAME/nest6d  
> License：MIT License

---

#### Language: English | [中文](README_zh.md)

--- 

## 6-Day Learning Roadmap
> 5 hours per day, master NestJS full-stack development in 6 days.

| Day | Morning 2h | Afternoon 2h | Evening 1h          | Outcome |
|:---:|:---|:---|:--------------------|:---|
| **D1** | Scaffold + Ping | TypeORM + User Table | Global Validation   | CRUD Users |
| **D2** | JWT 3 Endpoints | Guards + Decorators | Swagger Docs        | Auth System Complete |
| **D3** | RBAC + Soft Delete | Global Exception + Logging | Transaction Scripts | Security + Logging |
| **D4** | Pagination + Search | Multi-env Config | Dockerization       | Container Image |
| **D5** | CI Scripts | Cloud Server Setup | HTTPS               | Auto Deployment |
| **D6** | Tests & Docs | Go Live + Domain | Finalize README     | 🎉 Production URL |

### Learning Tips
- **D1-D2**: Focus on NestJS modular architecture and dependency injection
- **D3**: RBAC is essential for enterprise projects, must master
- **D4-D5**: DevOps skills
- **D6**: Complete documentation

--- 

## Getting Started

```bash
# Install
npm install

# Configure .env (copy and modify)
cp .env.example .env

# Docker deployment (enter docker-compose.yml directory and start, modify yml as needed)
docker-compose up -d

# Development mode
npm run start:dev
```
⚠️ Note: The database must first create the admin role, otherwise administrator privileges cannot be assigned.

--- 

## Core Features

- Auth：JWT + APP_GUARD global guard
- RBAC：Role-based access control (user/admin)
- Data：TypeORM + MySQL + soft delete
- Tools：Swagger / Pino logger / global validation / pagination & search
- Deploy：Docker / GitHub Actions / HTTPS / Railway

--- 

## Project Structure
```
src/
├── audit/         # Audit logs
├── auth/          # JWT authentication
├── roles/         # RBAC role & permission module
├── types/         # Global type definitions
├── user/          # User CRUD (with soft delete)
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts        # Entry point
```

--- 

## Environment Variables
```
# NestJS App MySQL connection
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=test

# MySQL container config (only used on first startup for initialization)
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=root

# App
APP_PORT=3000
NODE_ENV=development
```

--- 

## Image Deployment

After pushing code, GitHub Actions automatically builds and pushes to ghcr.io/trname/nest6d. On your server:
```bash
docker pull ghcr.io/<your-username>/nest6d:latest   # Replace <your-username> with yours (must be lowercase)
docker-compose up -d    # Enter docker-compose.yml directory and start, modify yml as needed
```

--- 

## Common Commands

### Testing
```bash
npm run test
npm run test:e2e
```

### Local Docker Deployment
```bash
docker build -t nest6d .
docker-compose up -d    # Modify docker-compose.yml as needed
```

--- 

## Tech Stack
NestJS + TypeScript + TypeORM + MySQL + JWT + Docker

--- 

## Contributing

🎉 Issues and PRs are welcome! See [CONTRIBUTING.md](./CONTRIBUTING_zh.md) for details.

--- 

## Author

- **Repository**: https://github.com/trname/nest6d
- **GitHub**: [@TRNAME](https://github.com/TRNAME)

--- 

## License

MIT© 2026 TRNAME
