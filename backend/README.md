# Task Manager Backend

This is the backend server for the Task Manager application, built with Node.js, Express, and MySQL.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=task_db
PORT=5000
```

3. Set up the database:
   - Make sure MySQL is installed and running
   - Log in to MySQL and run the commands in `database.sql`
   - Or use the MySQL command line:
   ```bash
   mysql -u your_username -p < database.sql
   ```

4. Start the server:
```bash
node server.js
```

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
  - Body: `{ "title": "Task title", "description": "Task description" }`
- `PUT /tasks/:id` - Update a task
  - Body: `{ "title": "Updated title", "description": "Updated description", "status": "pending" }`
- `DELETE /tasks/:id` - Delete a task
- `PATCH /tasks/:id/toggle` - Toggle task status between 'pending' and 'completed'

## Error Handling

The API includes proper error handling for:
- Database connection errors
- Invalid requests
- Missing required fields
- Not found resources
- Server errors

## Security

- Uses environment variables for sensitive data
- Implements CORS for frontend access
- Input validation for all endpoints
- Proper error messages without exposing sensitive information 