# Daily Task Manager

A MERN stack application designed to help users efficiently manage their daily tasks, focusing on productivity and effective time management.

## Features:

- Daily Task Management: Users can easily add, edit, and  delete tasks for each day. This feature allows for a structured approach to managing daily activities and goals, ensuring that users stay on track with their personal and professional objectives.

- Time Constraints: Each task can be assigned a specific time limit. This encourages users to focus on time management and prioritization, which are crucial for enhancing overall productivity. By setting time constraints, users can allocate their time more effectively, ensuring that important tasks are completed within deadlines.

- Express-Powered Backend: At the core of the application is a robust backend powered by Express. This ensures efficient processing of HTTP requests for task creation, storage, and retrieval. The use of Express allows for scalable and maintainable server-side operations, making the application reliable for handling user data.

## Getting Started

To get the application running locally on your machine, follow these steps:

1. **Clone the repository**

```bash
git clone https://github.com/your-username/daily-task-manager.git
cd daily-task-manager

## Install backend dependencies
npm install

## Navigate to the frontend directory
cd client

## Install frontend dependencies
npm install

 ## Configure Environment Variables
Create a .env file in the root directory and add the necessary environment variables:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


Run the Application

# Start the backend server
npm start

# In another terminal, start the frontend application
cd client
npm start
