-- Create database
CREATE DATABASE IF NOT EXISTS task_db;
USE task_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table with user_id and position for drag-and-drop
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add sample user (password: test123)
INSERT INTO users (username, password, email) VALUES
    ('testuser', '$2b$10$YourHashedPasswordHere', 'test@example.com');

-- Add sample tasks
INSERT INTO tasks (user_id, title, description, status, position) VALUES
    (1, 'Complete project documentation', 'Write comprehensive documentation for the project', 'pending', 1),
    (1, 'Review code changes', 'Review pull requests and merge if approved', 'pending', 2),
    (1, 'Setup development environment', 'Install and configure necessary tools', 'completed', 3); 