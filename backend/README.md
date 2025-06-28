# Portfolio - Backend

This is the backend for the personal portfolio project, built with Node.js, Express, and MongoDB.

## Features
- Serves project data via a RESTful API (`/api/projects`).
- Connects to a MongoDB database to fetch and manage projects.

## Getting Started

### Prerequisites
- Node.js
- MongoDB (running locally or on a remote server)

### Installation & Running
1. Clone the repository.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node index.js
   ```
The server will be running on `http://localhost:5000`.

### Environment Variables
You can create a `.env` file to specify the MongoDB connection string:
```
MONGO_URI=mongodb://your-mongodb-uri
```
If not provided, it defaults to `mongodb://0.0.0.0:27017/portfolio`. 