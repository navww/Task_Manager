# Task Manager Application

A full-stack task management application built with React, Node.js, Express, and MongoDB. This application allows users to create, manage, and track their tasks with a modern and responsive user interface.

## Features

- User Authentication (Login/Register)
- Create, Read, Update, and Delete tasks
- Task filtering (All, Active, Completed)
- Responsive design for all screen sizes
- Modern and clean user interface
- Real-time task updates
- Secure API endpoints with JWT authentication

## Tech Stack

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- CSS3 for styling
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/navww/task-manager.git
cd task-manager
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login user
- GET `/auth/me` - Get current user profile

### Tasks
- GET `/tasks` - Get all tasks for the current user
- POST `/tasks` - Create a new task
- PUT `/tasks/:id` - Update a task
- DELETE `/tasks/:id` - Delete a task
- PATCH `/tasks/:id/complete` - Toggle task completion status

## Project Structure

```
task-manager/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── redux/
    │   ├── styles/
    │   └── App.js
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team for the amazing frontend framework
- MongoDB team for the database solution
- All contributors who have helped with the project 