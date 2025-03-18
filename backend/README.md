# 🔥 Backend - Registration Application

This is the **backend** of the registration application built using **Node.js, Express, and MongoDB**.

## 🚀 **Technologies Used**
- 🌐 **Node.js** (JavaScript runtime)
- ⚡ **Express.js** (Backend framework)
- 🗄 **MongoDB** (Database)
- 🔐 **Mongoose** (ODM for MongoDB)

## 📂 **Project Structure**
```
backend/
│── src/
│   │── controllers/    # Handles API logic
│   │── models/         # Mongoose schemas
│   │── routes/         # API endpoints
│   │── middleware/     # Validation and authentication
│   │── config/         # Database connection
│
│── package.json        # Backend dependencies
│── .env.example        # Environment variables
│── README.md           # Backend documentation
```

## 🛠 **Setup & Installation**

### **1️⃣ Install Dependencies**
```sh
cd backend
npm install
```

### **2️⃣ Start the Backend**
```sh
npm run dev
```

### **3️⃣ API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/customers/register` | Register a new customer |

## 🛠 **Database Setup**
- Uses **MongoDB Atlas** (or local MongoDB instance).
- **Connection String**: Defined in `.env`:
```ini
DATABASE_URL=mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.mongodb.net/${DB_NAME}
```
- Ensure **MongoDB is running** before starting the backend.

## 📜 **License**
This project is licensed under the **MIT License**.
