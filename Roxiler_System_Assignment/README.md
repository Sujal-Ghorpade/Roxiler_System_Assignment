# Roxiler_System_Assignment ( Store Rating System )

This is a full-stack store rating platform where users can provide ratings (1–5) for stores. The application introduces role-based access control, enabling distinct functionalities for Administrators, Store Owners, and Regular Users.

---

👨‍💻 Author
This project was developed by Sujal Sanjay Ghorpade as part of the Roxiler_System_Assignment.

## 🛠 Tech Stack

**Frontend:**

- React, JavaScript, CSS

**Backend:**

- Node.js, Express.js
- Authentication: JWT, bcryptjs
- Security & Middleware: dotenv, cors

**Database:**

- MySQL

## 🏗 Architecture

This project follows a **three-tier architecture**:

1. **Frontend (React):** Handles UI, API calls, and user interactions.
2. **Backend (Express.js):** Provides RESTful API endpoints, authentication, and validation middleware.
3. **Database (MySQL):** Stores users, stores, and ratings.

---

## 📌 Project Overview

The Store Rating System enables users to:

- Register and log in.
- View available stores.
- Submit and update ratings.
- Store Owners can track ratings on their stores.
- Admins can manage users and stores, and view platform statistics.

---

## 🚀 Features

### 🔑 User Authentication

- Registration & login with JWT-based authentication.
- Passwords hashed using `bcryptjs`.
- Role-based access control.

### 👥 User Roles & Functionalities

**System Administrator**

- Add new stores and users (Admin/Normal/Store Owner).
- Dashboard:
  - Total users
  - Total stores
  - Total ratings
- Manage users (Name, Email, Role, Address).
- Manage stores (Name, Email, Address, Rating).
- Apply filters and sorting on listings.

**Normal User**

- Register & login.
- Update password.
- View & search stores by name or address.
- Submit ratings (1–5) for stores.
- Modify submitted ratings.

**Store Owner**

- Login & update password.
- Dashboard:
  - View ratings received from users.
  - View average store rating.

### 📝 Validations

- **Name:** 20–60 characters
- **Address:** Max 400 characters
- **Password:** 8–16 characters, must include at least 1 uppercase & 1 special character
- **Email:** Must be valid format

---

## 📂 Folder Structure

```
├── README.md
├── backend
│   ├── config/        # DB & JWT setup
│   ├── controllers/   # Business logic
│   ├── database/      # SQL schema
│   ├── middleware/    # Auth & validation
│   ├── routes/        # API endpoints
│   └── server.js      # Entry point
└── frontend
    ├── public/
    ├── src/
    │   ├── components/ # UI components (admin, user, storeowner, auth)
    │   ├── context/    # Global Auth Context
    │   ├── services/   # API integration
    │   └── utils/      # Validation helpers

```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Sujal-Ghorpade/Roxiler_System_Assignment.git
cd Roxiler_System_Assignment
```

### 2️⃣ Backend Setup

```bash
cd backend
npm i
```

- Configure `.env`:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=store_rating
  JWT_SECRET=your_jwt_secret
  ```
- Create MySQL schema:
  ```sql
  source database/schema.sql;
  ```
- Start server:
  ```bash
  npm start
  ```

### 3️⃣ Frontend Setup

```bash
cd Roxiler_System_Assignment
cd frontend
npm install
npm run dev
```

---
