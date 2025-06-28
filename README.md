# Portfolio Web Application Project

## Project Overview

This is a full-stack web application that serves as a personal portfolio website. The project demonstrates modern web development practices using a microservices architecture with separate frontend and backend services, containerized with Docker for easy deployment and development.

## Architecture Overview

The application follows a **three-tier architecture**:

1. **Frontend Layer**: React-based single-page application (SPA)
2. **Backend Layer**: Node.js/Express REST API
3. **Data Layer**: MongoDB NoSQL database

### System Architecture Diagram
```
┌─────────────────┐    HTTP/API     ┌─────────────────┐    Database     ┌─────────────────┐
│   Frontend      │ ──────────────► │    Backend      │ ──────────────► │    MongoDB      │
│   (React)       │                 │   (Node.js)     │                 │   (NoSQL)       │
│   Port: 3000    │                 │   Port: 5000    │                 │   Port: 27017   │
└─────────────────┘                 └─────────────────┘                 └─────────────────┘
```

## Technology Stack

### Frontend Technologies
- **React 19.1.0**: Modern JavaScript library for building user interfaces
  - Uses functional components with hooks (useState, useEffect)
  - Implements component-based architecture for reusability
- **Vite 6.3.5**: Build tool and development server
  - Provides fast hot module replacement (HMR)
  - Optimized build process for production
- **CSS3**: Custom styling with modern CSS features
  - Flexbox and Grid layouts for responsive design
  - CSS animations and transitions

### Backend Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework
  - RESTful API design principles
  - Middleware architecture for request processing
- **MongoDB 8.16.0**: NoSQL document database
  - Flexible schema design
  - JSON-like document storage
- **Mongoose**: MongoDB object modeling tool
  - Schema validation and type casting
  - Middleware support for data processing

### DevOps & Containerization
- **Docker**: Containerization platform
  - Isolated environments for each service
  - Consistent deployment across different platforms
- **Docker Compose**: Multi-container orchestration
  - Automated service dependency management
  - Volume management for data persistence

## Project Structure

```
deneme/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Application styles
│   │   └── index.js         # Application entry point
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── Dockerfile           # Frontend container configuration
├── backend/                  # Node.js backend API
│   ├── models/              # MongoDB data models
│   │   ├── User.js          # User schema and model
│   │   ├── Project.js       # Project schema and model
│   │   └── Media.js         # Media file schema and model
│   ├── uploads/             # File upload directory
│   ├── index.js             # Express server and API routes
│   ├── package.json         # Backend dependencies
│   └── Dockerfile           # Backend container configuration
├── docker-compose.yml       # Multi-container orchestration
└── README.md               # Project documentation
```

## Data Models & Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  profileImage: String (default: 'profile.jpg'),
  bio: String,
  projects: [ObjectId references to Project],
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  title: String (required),
  description: String (required),
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  isPublic: Boolean,
  owner: ObjectId reference to User,
  media: [ObjectId references to Media]
}
```

### Media Model
```javascript
{
  filename: String,
  originalName: String,
  url: String,
  type: String (image/video/document),
  mimeType: String,
  size: Number,
  uploadedBy: ObjectId reference to User
}
```

## API Endpoints

### Health Check
- `GET /api/health` - Server status and timestamp

### User Management
- `GET /api/users` - Retrieve all users with populated projects
- `GET /api/users/:id` - Get specific user by ID
- `GET /api/users/:id/profile-image` - Serve user profile image

### Project Management
- `GET /api/projects` - Get all public projects
- `GET /api/projects/:id` - Get specific project by ID

### Media Management
- `POST /api/media` - Upload media files (multipart/form-data)
- `GET /api/media` - Retrieve all media files

## Key Features & Functionality

### Frontend Features
1. **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
2. **Single Page Application**: Smooth navigation without page reloads
3. **Dynamic Content Loading**: Projects loaded from backend API
4. **Error Handling**: Graceful fallbacks when API calls fail
5. **Static Asset Serving**: Profile images and other media files

### Backend Features
1. **RESTful API**: Standard HTTP methods and status codes
2. **File Upload System**: Multer middleware for handling file uploads
3. **Database Integration**: MongoDB with Mongoose ODM
4. **CORS Support**: Cross-origin resource sharing enabled
5. **Error Handling**: Comprehensive error responses
6. **Data Validation**: Schema-based validation with Mongoose

### DevOps Features
1. **Containerization**: Isolated service environments
2. **Service Orchestration**: Automated startup and dependency management
3. **Volume Persistence**: Database data persistence across container restarts
4. **Port Mapping**: Exposed services for development access

## How the Application Works

### 1. Application Startup
1. Docker Compose starts three services:
   - MongoDB database (port 27017)
   - Backend API server (port 5000)
   - Frontend development server (port 3000)

### 2. Data Flow
1. **Frontend Initialization**: React app loads and makes API call to `/api/projects`
2. **Backend Processing**: Express server receives request and queries MongoDB
3. **Database Query**: Mongoose retrieves project data with populated references
4. **Response**: JSON data returned to frontend
5. **UI Update**: React state updates and re-renders components

### 3. File Handling
1. **Upload Process**: Files uploaded via POST to `/api/media`
2. **Storage**: Multer saves files to `uploads/` directory
3. **Database Record**: Media metadata stored in MongoDB
4. **Serving**: Static file middleware serves uploaded files

## Development Workflow

### Local Development
```bash
# Start all services
docker-compose up

# Access applications
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MongoDB: localhost:27017
```

### Production Deployment
The application is containerized and can be deployed to any platform supporting Docker:
- Cloud platforms (AWS, Google Cloud, Azure)
- Container orchestration (Kubernetes)
- PaaS services (Heroku, DigitalOcean App Platform)

## Technical Decisions & Justifications

### Why React?
- **Component Reusability**: Modular UI components
- **State Management**: Efficient state updates with hooks
- **Virtual DOM**: Optimized rendering performance
- **Ecosystem**: Rich library ecosystem and community support

### Why Node.js/Express?
- **JavaScript Full-Stack**: Same language for frontend and backend
- **Non-blocking I/O**: Efficient handling of concurrent requests
- **Middleware Architecture**: Flexible request processing pipeline
- **RESTful Design**: Standard API patterns for scalability

### Why MongoDB?
- **Flexible Schema**: Easy to modify data structure
- **JSON-like Documents**: Natural fit for JavaScript applications
- **Scalability**: Horizontal scaling capabilities
- **Mongoose ODM**: Type safety and validation

### Why Docker?
- **Environment Consistency**: Same environment across development and production
- **Service Isolation**: Independent service scaling and management
- **Easy Deployment**: Containerized applications deploy anywhere
- **Development Efficiency**: Quick setup and teardown

## Performance Considerations

1. **Frontend Optimization**: Vite provides fast development and optimized builds
2. **API Efficiency**: Database queries use population to reduce HTTP requests
3. **File Handling**: Multer limits file sizes and provides secure upload handling
4. **Caching**: Static file serving for media assets
5. **Error Resilience**: Fallback data when database is unavailable

## Security Features

1. **CORS Configuration**: Controlled cross-origin access
2. **File Upload Validation**: File type and size restrictions
3. **Input Validation**: Mongoose schema validation
4. **Error Sanitization**: Safe error messages without sensitive data exposure

## Future Enhancements

1. **Authentication System**: User login and authorization
2. **Admin Panel**: Content management interface
3. **Image Optimization**: Automatic image resizing and compression
4. **Caching Layer**: Redis for improved performance
5. **Testing Suite**: Unit and integration tests
6. **CI/CD Pipeline**: Automated testing and deployment

This project demonstrates modern full-stack web development practices, microservices architecture, and containerization technologies, making it suitable for academic evaluation and real-world deployment scenarios. 
