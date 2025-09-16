# SaaS Notes App - Backend

This is the **backend service** for the SaaS Notes Application.  
Built with **Express, Prisma, PostgreSQL (Supabase), and JWT authentication**.  
It handles multi-tenancy, user roles, subscription limits, and CRUD operations for notes.

---

## 🚀 Features
- Multi-tenant support (Acme & Globex seeded)
- JWT authentication
- Role-based access:  
  - **Admin**: invite users, upgrade subscription  
  - **Member**: manage notes only
- Free plan (max 3 notes per tenant)
- Pro plan (unlimited notes)
- Upgrade endpoint (`/api/tenants/:slug/upgrade`)
- CRUD APIs for notes
- Health endpoint (`/health`)

---

## 🛠️ Tech Stack
- Node.js + Express
- Prisma ORM
- PostgreSQL (Supabase in production)
- JSON Web Tokens (JWT)
- Bcrypt for password hashing

---

## ⚙️ Setup Instructions

### 1. Install dependencies
```bash
cd backend
npm install
