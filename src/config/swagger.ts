import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DailyDrip App Service API',
      version: '1.0.0',
      description: 'Comprehensive API documentation for DailyDrip App Service. This service provides user authentication, user management, category management, news summaries, and user mixes functionality.',
      contact: {
        name: 'API Support',
        email: 'support@dailydrip.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'https://api.bodopod.in/api',
        description: 'Development server'
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Local development server'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      },
      {
        name: 'Users',
        description: 'User management operations'
      },
      {
        name: 'Categories',
        description: 'News category management'
      },
      {
        name: 'News Summaries',
        description: 'AI-generated news summaries'
      },
      {
        name: 'User Mixes',
        description: 'User audio mix management'
      }
    ],
    components: {
      schemas: {
        UserCreateRequest: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User full name (2-50 characters)',
              example: 'John Doe',
              minLength: 2,
              maxLength: 50
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address (must be unique)',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              description: 'User password (minimum 6 characters)',
              example: 'password123',
              minLength: 6
            },
            provider: {
              type: 'string',
              enum: ['local', 'google', 'facebook', 'apple'],
              description: 'Authentication provider (defaults to local)',
              default: 'local'
            },
            providerId: {
              type: 'string',
              description: 'Provider-specific user ID (for social login)'
            }
          }
        },
        UserLoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123'
            }
          }
        },
        UserResponse: {
          type: 'object',
          properties: {
            userID: {
              type: 'string',
              description: 'Unique user identifier (UUID)',
              example: '550e8400-e29b-41d4-a716-446655440000'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              description: 'User email address',
              example: 'john.doe@example.com'
            },
            provider: {
              type: 'string',
              description: 'Authentication provider',
              example: 'local'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
              example: '2024-01-15T10:30:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp',
              example: '2024-01-15T10:30:00.000Z'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          description: 'Authentication response containing JWT token',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token (valid for 7 days)',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySUQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMCIsImlhdCI6MTcwNTMyNzAwMCwiZXhwIjoxNzA1OTMzNDAwfQ.example_signature'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          description: 'Standard error response format',
          properties: {
            error: {
              type: 'string',
              description: 'Human-readable error message',
              example: 'User already exists with this email'
            }
          }
        },
        Category: {
          type: 'object',
          description: 'News category information',
          properties: {
            id: {
              type: 'string',
              description: 'MongoDB ObjectId of the category',
              example: '507f1f77bcf86cd799439011'
            },
            name: {
              type: 'string',
              description: 'Category name',
              example: 'Technology'
            },
            imageUrl: {
              type: 'string',
              nullable: true,
              description: 'Category image URL (can be null)',
              example: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop'
            }
          }
        },
        CategoryArray: {
          type: 'array',
          description: 'Array of news categories',
          items: {
            $ref: '#/components/schemas/Category'
          }
        }
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtained from login/signup endpoints'
        }
      },
      examples: {
        SignupSuccess: {
          summary: 'Successful user registration',
          value: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySUQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMCIsImlhdCI6MTcwNTMyNzAwMCwiZXhwIjoxNzA1OTMzNDAwfQ.example_signature'
          }
        },
        LoginSuccess: {
          summary: 'Successful user login',
          value: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJ1c2VySUQiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMCIsImlhdCI6MTcwNTMyNzAwMCwiZXhwIjoxNzA1OTMzNDAwfQ.example_signature'
          }
        },
        UserExistsError: {
          summary: 'User already exists error',
          value: {
            error: 'User exists'
          }
        },
        InvalidCredentialsError: {
          summary: 'Invalid credentials error',
          value: {
            error: 'Invalid credentials'
          }
        },
        CreateUserSuccess: {
          summary: 'Successful user creation',
          value: {
            _id: "507f1f77bcf86cd799439011",
            userID: "550e8400-e29b-41d4-a716-446655440000",
            name: "John Doe",
            email: "john.doe@example.com",
            provider: "local",
            createdAt: "2024-01-15T10:30:00.000Z",
            updatedAt: "2024-01-15T10:30:00.000Z"
          }
        },
        UserProfileSuccess: {
          summary: 'Successful user profile retrieval',
          value: {
            user: {
              userID: "550e8400-e29b-41d4-a716-446655440000",
              name: "John Doe",
              email: "john.doe@example.com",
              provider: "local",
              createdAt: "2024-01-15T10:30:00.000Z",
              updatedAt: "2024-01-15T10:30:00.000Z"
            },
            categories: [
              {
                name: "Technology",
                id: "507f1f77bcf86cd799439011",
                imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
              },
              {
                name: "Sports",
                id: "507f1f77bcf86cd799439012",
                imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
              }
            ]
          }
        },
        HomeScreenSuccess: {
          summary: 'Successful home screen data retrieval',
          value: {
            main: [
              {
                id: "morning_mix",
                type: "morning",
                title: "Morning Mix",
                text: "Start your day informed",
                image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150&h=150&fit=crop"
              },
              {
                id: "afternoon_mix",
                type: "afternoon",
                title: "Afternoon Mix",
                text: "Catch up on the day's events",
                image: "https://images.unsplash.com/photo-1553341829-4c9f53513b3b?w=150&h=150&fit=crop"
              }
            ],
            categories: [
              {
                id: "507f1f77bcf86cd799439011",
                type: "technology",
                title: "Technology News",
                text: "Technology",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
              }
            ]
          }
        },
        CategoryPreferencesSuccess: {
          summary: 'Successful category preferences update',
          value: {
            _id: "507f1f77bcf86cd799439013",
            userId: "550e8400-e29b-41d4-a716-446655440000",
            preferredCategories: [
              {
                categoryID: "507f1f77bcf86cd799439011",
                categoryName: "Technology"
              },
              {
                categoryID: "507f1f77bcf86cd799439012",
                categoryName: "Sports"
              }
            ],
            createdAt: "2024-01-15T10:30:00.000Z",
            updatedAt: "2024-01-15T10:30:00.000Z"
          }
        },
        CategoriesSuccess: {
          summary: 'Successful categories retrieval',
          value: [
            {
              id: "507f1f77bcf86cd799439011",
              name: "Technology",
              imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
            },
            {
              id: "507f1f77bcf86cd799439012",
              name: "Sports",
              imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
            },
            {
              id: "507f1f77bcf86cd799439013",
              name: "Politics",
              imageUrl: null
            },
            {
              id: "507f1f77bcf86cd799439014",
              name: "Entertainment",
              imageUrl: "https://images.unsplash.com/photo-1489599835382-acb29302e9be?w=150&h=150&fit=crop"
            },
            {
              id: "507f1f77bcf86cd799439015",
              name: "Business",
              imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=150&h=150&fit=crop"
            },
            {
              id: "507f1f77bcf86cd799439016",
              name: "Health",
              imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
            }
          ]
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi }; 