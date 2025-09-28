# Quiz Application

A full-stack **Quiz Application** that allows users to take interactive quizzes in real time with instant score calculation. 
The project is designed for learning, practicing, and testing knowledge with a seamless experience across frontend and backend.

## 📌 Project Overview

This project demonstrates a modern full-stack web application with features like:
- **Interactive Quiz Gameplay**: Answer multiple-choice questions with a clean UI.  
- **Real-time Score Calculation**: Instant feedback on quiz completion.  
- **Database Persistence**: User progress and quiz data stored using Prisma ORM with SQLite.  
- **Scalable Architecture**: Containerized using Docker for easy setup and deployment.  

The app is built to be simple for learners while showcasing production-ready technologies and practices.

---

## 🚀 Quick Start

Run the entire application with Docker: 

*Note: You must have docker or docker engine on your system*
```bash
docker compose up
```

This will start both **frontend** and **backend** services automatically.

---

## ⚙️ Manual Setup

### Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:  
Create a `.env` file or rename `.env.example` to `.env`

```env
DATABASE_URL="file:./dev.db"
```

3. Generate Prisma client:

```bash
npx prisma generate
```

*Note: Dummy data is already seeded in the database*

4. Start the backend server:

```bash
npm start
```

*Note: A pre-built version is included to save setup time.*

#### Testing Backend

Run backend tests to verify score calculation logic:

```bash
cd backend
npm run test:submit
```

---

### Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite, TypeScript, Tailwind CSS, Recoil)  
- **Backend**: Node.js with Prisma ORM  
- **Database**: SQLite  
- **Containerization**: Docker & Docker Compose  

---

## ✨ Features

- Clean and interactive quiz interface  
- Real-time score calculation and feedback  
- Persistent storage with Prisma + SQLite  
- Easy deployment using Docker  
- Example backend tests for quiz submission logic  

---

## 📖 About This Project

This project was built to demonstrate the fundamentals of **full-stack development** using modern tools.  
It’s a great starting point for learning how frontend and backend communicate, how databases can persist application state, 
and how Docker simplifies deployment.  

The quiz application can be extended with features like user authentication, leaderboards, different quiz categories, and more.  
