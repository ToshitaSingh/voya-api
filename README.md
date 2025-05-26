# Voya API - Tour Booking Platform

The **Voya API** is a secure, scalable RESTful API built with **Node.js**, **Express**, and **MongoDB**, designed to support tour browsing, reviews, bookings, and user management. Features include role-based access, geolocation queries, and secure authentication workflows.

## 🌐 Live API & Documentation

- **Postman Documentation**: [View Online](https://documenter.getpostman.com/view/19410057/2sB2qcCgM9)
- **Production URL**: `https://voya-api.onrender.com`
- **Dev URL**: `http://localhost:3000`
  Note: Add /api/v1/ followed by API endpoints at the end of above URLs. (Reference below)

## 🧩 Features

- 🔐 JWT Authentication with role-based access control
- ✈️ Browse tours, get stats, filter by geolocation
- 💬 Nested review routes for tour-specific feedback
- 👤 User profile management
- 📸 Planned: Image uploads, Stripe integration
- 🧪 Postman-based testing with dev/prod environments

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, bcrypt, Helmet, rate limiting
- **Testing**: Postman (dev/prod environments)

## 📁 API Endpoints Overview

### 📦 Tours

- `GET /tours`, `GET /tours/:id`, `POST /tours`, `PATCH /tours/:id`, `DELETE /tours/:id`
- `GET /tours/top-5-cheap`, `GET /tours/tour-stats`
- `GET /tours/monthly-plan/:year`
- `GET /tours-within/:distance/center/:latlng/unit/:unit`
- `GET /distances/:latlng/unit/:unit`

### 🧾 Reviews

- `GET /reviews`, `GET /reviews/:id`, `POST /reviews`, `PATCH /reviews/:id`, `DELETE /reviews/:id`
- Nested: `POST /tours/:tourId/reviews`, `GET /tours/:tourId/reviews`

### 👥 Users

- `GET /users`, `GET /users/:id`, `PATCH /users/:id`, `DELETE /users/:id`
- `GET /users/me`, `PATCH /users/updateMe`, `DELETE /users/deleteMe`
- `PATCH /users/updateMyPassword`

### 🔐 Authentication

- `POST /signup`, `POST /login`, `POST /forgotPassword`, `PATCH /resetPassword/:token`

## 🧪 Running Locally

```bash
git clone https://github.com/your-username/voya-api.git
cd voya-api
npm install
cp config.env.example config.env
npm run dev
```
