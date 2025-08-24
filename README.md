# DailyDrip App Service

A Node.js/Express service for the DailyDrip application with comprehensive API documentation using Swagger.

## Features

- User authentication (signup, login, social login)
- User management
- Category management
- News summaries
- User mixes
- Comprehensive API documentation with Swagger

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Accessing Swagger UI

Once the server is running, you can access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

### API Endpoints

#### Development Server
- **Base URL**: `https://api.bodopod.in/api`
- **Swagger Docs**: `https://api.bodopod.in/api/api-docs`

#### Local Development
- **Base URL**: `http://localhost:3000/api`
- **Swagger Docs**: `http://localhost:3000/api-docs`

### Available Endpoints

#### Authentication (`/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /social` - Social media login

#### User Management (`/user`)
- `POST /createUser` - Create a new user
- `POST /updateUserCategoryPreference` - Update user's preferred news categories
- `GET /profile` - Get user profile with preferred categories
- `GET /home` - Get user home screen data with mixes and categories
- `GET /categories` - Get all categories formatted for home screen

#### Categories (`/categories`)
- `GET /getAllCategories` - Get all active news categories
- Protected routes requiring authentication

#### User Mixes (`/mixes`)
- Protected routes requiring authentication

#### News Summaries (`/news-summaries`)
- Protected routes requiring authentication

## API Examples

### User Signup
```bash
curl -X POST https://api.bodopod.in/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### User Login
```bash
curl -X POST https://api.bodopod.in/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Get All Categories
```bash
curl -X GET https://api.bodopod.in/api/categories/getAllCategories \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Development

### Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

### Project Structure

```
src/
├── config/          # Configuration files (Swagger, etc.)
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── app.ts          # Main application file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC 