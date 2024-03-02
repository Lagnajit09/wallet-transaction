# Wallet Transaction App

This is a MERN (MongoDB, Express, React, Node.js) stack project for managing wallet transactions.

## Project Overview

- **Frontend**: React.js application created with Vite.js
- **Backend**: Express.js server interacting with MongoDB

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Lagnajit09/wallet-transaction.git
```

### Frontend Setup

1. Navigate to the cloned repository:

```bash
cd wallet-transaction
```

2. Move to the `frontend` directory:

```bash
cd frontend
```

3. Install frontend dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

### Backend Setup

1. Navigate back to the root directory:

cd ..

2. Move to the `backend` directory:

```bash
cd backend
```

3. Install backend dependencies:

```bash
npm install
```

4. Create a `.env` file with the following variables:

```bash
MONGODB_URL=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_KEY
```

Replace `YOUR_MONGODB_URL` with your MongoDB connection URL and `YOUR_JWT_KEY` with a secret key for JWT token generation.

5. Start the backend server using nodemon:

```bash
nodemon index.js
```

## Dependencies

### Frontend

- React.js
- Vite.js
- axios
- react-dom
- react-router-dom
- recoil

### Backend

- Express.js
- MongoDB
- dotenv (for loading environment variables)
- cors
- bcrypt
- express-router
- jsonwebtoken
- mongoose
- zod
- nodemon

## Contributing

Contributions are welcome! Feel free to open issues or pull requests on [GitHub](https://github.com/Lagnajit09/wallet-transaction).
