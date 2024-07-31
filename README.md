# Task Management Application

## Introduction

This is a Trello-style task management application built using React.js, TypeScript, Node.js, Express, and MongoDB. It includes features like user authentication, task boards, task management, drag and drop functionality, and data persistence.

## Features

- User Authentication
- Task Board Management
- Drag and Drop for Tasks
- Light and Dark Theme Toggle
- Task Creation, Editing, and Deletion
- Task Prioritization and Deadline Management
- Responsive UI using CSS Grid and Flexbox
- Error Toast Notifications

## Tech Stack

- Frontend: React.js, TypeScript, CSS (Grid and Flexbox)
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Hosting: Netlify (Frontend), Render (Backend)

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/1-0-1PraDev/Trello-Web-App.git
    cd Trello-Web-App
    ```

2. **Install dependencies**

    ```bash
    cd backend
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    PORT=5000
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
    ```

4. **Run the server**

    ```bash
    npm start
    ```

    The backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory**

    ```bash
    cd ../frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the frontend**

    ```bash
    npm run dev
    ```

    The frontend should now be running on `http://localhost:5173`.

### Deploying the Application

#### Deploying the Backend

1. **Render Setup**

    - Create an account on [Render](https://render.com/).
    - Create a new Web Service and connect it to your backend repository.
    - Set the environment variables in the Render dashboard (`MONGO_URI`, `JWT_SECRET`).
    - Deploy the backend.

#### Deploying the Frontend

1. **Netlify Setup**

    - Create an account on [Netlify](https://www.netlify.com/).
    - Create a new site and connect it to your frontend repository.
    - Deploy the frontend.

### Troubleshooting

- **CORS Issues:** Ensure that the CORS settings in the backend are correctly configured to allow requests from your frontend domain.
- **Database Connection Errors:** Check that your `MONGO_URI` is correctly set and accessible.
- **Environment Variables:** Double-check that all required environment variables are set in both local and deployment environments.

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

### License

Distributed under the MIT License. See `LICENSE` for more information.

### Contact


Your Name - [@PraDev_101](https://twitter.com/@PraDev_101) - pranayhusukale@example.com

Project Link: [https://github.com/1-0-1PraDev/](https://github.com/1-0-1PraDev/Trello-Web-App)
