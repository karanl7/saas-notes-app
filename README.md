# SaaS Notes App (Multi-Tenant)

A **multi-tenant SaaS Notes Application** with authentication, role-based access, subscription limits, and upgrade to Pro.  
Built with **Express + Prisma + PostgreSQL** (backend) and **React + Vite + Tailwind** (frontend).  
Deployed on **Vercel**.

---

## ✨ Features
- Multi-tenancy (Acme & Globex tenants)
- JWT authentication (Admin / Member roles)
- Free plan → limit 3 notes per tenant
- Pro plan → unlimited notes
- Tenant upgrade endpoint
- CRUD APIs for notes
- React frontend (login, notes dashboard, upgrade)
- Health check endpoint (`/health`)

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, Prisma, PostgreSQL, JWT, Bcrypt
- **Frontend:** React, Vite, TailwindCSS, Axios
- **Deployment:** Vercel

---

## ⚙️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/karanl7/saas-notes-app.git
cd saas-notes-app
```
---
### Test Acoounts
### | Email                                         | Role   | Tenant |
### | --------------------------------------------- | ------ | ------ |
### | [admin@acme.test](mailto:admin@acme.test)     | ADMIN  | Acme   |
### | [user@acme.test](mailto:user@acme.test)       | MEMBER | Acme   |
### | [admin@globex.test](mailto:admin@globex.test) | ADMIN  | Globex |
### | [user@globex.test](mailto:user@globex.test)   | MEMBER | Globex |
---