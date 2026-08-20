# E-Commerce Web Application (MERN Stack)

Full-stack e-commerce app with separate User and Admin interfaces.

## Structure
```
ecommerce/
  backend/         Node.js + Express + MongoDB API
  user-app/        React app - customer storefront (browse, cart, checkout)
  admin-app/        React app - admin panel (manage products & orders)
```

## Features
- JWT auth with role field (`user` / `admin`)
- Public product browsing, admin-only product CRUD
- Cart (persisted in browser localStorage) → checkout → order
- Server calculates order totals from real product prices (never trusts the frontend)
- Stock is reduced automatically when an order is placed
- Admin dashboard: stats, product management, order status updates

## Running locally

### 1. Backend
```
cd backend
cp .env.example .env      # then edit .env with your MongoDB URI + JWT secret
npm install
npm start
```
Then create your first admin account:
```
node createAdmin.js
```
This creates `admin@shop.com` / `admin123` — change the password after first login, or edit the values at the top of `createAdmin.js` before running it.

### 2. User app
```
cd user-app
npm install
npm run dev
```
Open the URL Vite gives you (usually http://localhost:5173).

### 3. Admin app
```
cd admin-app
npm install
npm run dev
```
Runs on a different port automatically (Vite avoids clashes) — usually http://localhost:5174.
Log in with the admin account created above.

## Before deploying
In both `user-app/src/api/api.js` and `admin-app/src/api/api.js`, change:
```js
export const API_BASE = 'http://localhost:5001/api';
```
to your live backend URL (e.g. your Render URL) once deployed.

## API summary

| Method | Endpoint | Auth | Description |
|---|---|:--:|---|
| POST | /api/auth/register | No | Customer signup |
| POST | /api/auth/login | No | Login (user or admin) |
| GET | /api/products | No | List products |
| GET | /api/products/:id | No | Product detail |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/:id | Admin | Update product |
| DELETE | /api/products/:id | Admin | Delete product |
| POST | /api/orders | User | Place an order (checkout) |
| GET | /api/orders/mine | User | My order history |
| GET | /api/orders | Admin | All orders |
| PUT | /api/orders/:id/status | Admin | Update order status |
