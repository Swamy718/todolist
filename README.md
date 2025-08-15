# 📝 ToDo List App – FastAPI + React + MongoDB

A full-stack ToDo List application built with **FastAPI** (Backend), **React** (Frontend), and **MongoDB** for data storage.  
Supports **JWT authentication**, user registration/login, and CRUD operations on todos.

---

## 🚀 Features

### 🔐 Authentication
- User registration with hashed passwords (`bcrypt`)
- Login with JWT token
- Protected routes (only logged-in users can manage their todos)

### 🗒️ Todo Management
- Add new todos
- Mark todos as completed
- Edit todo text
- Delete todos
- Todos are stored **per user** in MongoDB

### 💻 Tech Stack
- **Backend**: FastAPI, PyMongo, Passlib, Python-JOSE
- **Frontend**: React (Hooks + Axios + React Router)
- **Database**: MongoDB Atlas

