# Quiz App

A full-stack quiz application built with React frontend and Node.js backend, featuring real-time quiz functionality and score calculation.

## Quick Start

Run the entire application with Docker:

```bash
docker compose up
```

This will start both frontend and backend services automatically.

## Manual Setup

### Backend Setup

Navigate to the backend directory:

```bash
cd /backend
```

1. Install dependencies:

```bash
npm /install
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

*Note: Pre-built version is included to save setup time*

### Testing

Test the backend score calculation logic:

```bash
cd /backend
npm run test:submit
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd /frontend
```

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

## Tech Stack

- **Frontend**: React with Vite, TypeScript, Tailwind CSS, Recoil  
- **Backend**: Node.js with Prisma ORM  
- **Database**: SQLite  
- **Containerization**: Docker & Docker Compose  

## Features

- Interactive quiz interface  
- Real-time score calculation  
- Database persistence with Prisma  
- Containerized deployment  
