Quiz App
A full-stack quiz application built with React frontend and Node.js backend, featuring real-time quiz functionality and score calculation.

Quick Start
Run the entire application with Docker:

bash
docker compose up
This will start both frontend and backend services automatically.

Manual Setup
Backend Setup
Navigate to the backend directory:

bash
cd /backend
Install dependencies:

bash
npm install
Set up environment variables:

bash
# Create .env file or rename .example to .env
DATABASE_URL="file:./dev.db"
Generate Prisma client:

bash
npx prisma generate
Note: Dummy data is already seeded in the database

Start the backend server:

bash
npm start
Note: Pre-built version is included to save setup time

Frontend Setup
Navigate to the frontend directory:

bash
cd /frontend
Install dependencies:

bash
npm install
Start the development server:

bash
npm run dev
Testing
Test the backend score calculation logic:

bash
cd /backend
npm run test:submit
Tech Stack
Frontend: React with Vite, TypeScript, Tailwind CSS, Recoil

Backend: Node.js with Prisma ORM

Database: SQLite

Containerization: Docker & Docker Compose

Features
Interactive quiz interface

Real-time score calculation

Database persistence with Prisma

Containerized deployment