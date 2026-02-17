# User Management App (Express + EJS)

This project is a simple user management system built with **Node.js**, **Express**, and **EJS** templates.  
It simulates database operations using an in-memory storage class.

---

## Live Demo
The app is deployed on Render (Free Tier):

👉 [Mini Message Board on Render](https://user-management-app-bvvh.onrender.com)

## Features Implemented

### 1. User CRUD
- **Create**: Add new users with first name, last name, email, age, and bio.
- **Read**: View a list of all users.
- **Update**: Edit existing user details.
- **Delete**: Remove a user from the list.

### 2. Validation
- Implemented with `express-validator`.
- Rules:
  - First/Last name: only letters, 1–10 characters.
  - Email: must be valid.
  - Age: optional, must be between 18–120.
  - Bio: optional, max 200 characters.

### 3. Search
- Added a **search form** (GET method) in `index.ejs`.
- New route `/search` handles queries.
- Controller uses `req.query` to filter users by **name** or **email** (or both).
- Results are displayed in a new view `search.ejs` with **full user details**.

---

## File Overview

- **`index.ejs`**  
  Displays all users and includes the search form.

- **`usersRouter.js`**  
  Defines routes for CRUD and search:
  - `/` → list users
  - `/create` → create user
  - `/:id/update` → update user
  - `/:id/delete` → delete user
  - `/search` → search users

- **`usersController.js`**  
  Contains controller logic:
  - CRUD operations
  - Validation
  - `usersSearchGet` → handles search requests using `req.query`.

- **`usersStorage.js`**  
  In-memory storage class:
  - `addUser`, `getUsers`, `getUser`, `updateUser`, `deleteUser`
  - `searchUsers` → filters users by name/email.

- **`search.ejs`**  
  Displays search results with full user details (ID, name, email, age, bio).

---

## How Search Works

1. User enters **name** or **email** in the search form.
2. Form submits a GET request to `/search`.
3. Controller reads query params via `req.query`.
4. Storage filters users.
5. Results are rendered in `search.ejs`.

---

## Next Steps

- Add pagination for large user lists.
- Improve search to support partial matches and case-insensitive queries.
- Connect to a real database (e.g., MongoDB, PostgreSQL) instead of in-memory storage.

---

## Running the App

```bash
npm install
npm start