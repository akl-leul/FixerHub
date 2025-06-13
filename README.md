# FixerHub Backend

This is the backend server for the FixerHub application, built with Node.js and Express.js.

## Features

- RESTful API architecture
- User authentication and authorization
- File upload functionality
- Email notifications
- PostgreSQL database integration
- Input validation using Joi
- Secure password hashing with bcrypt
- JWT-based authentication

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd FixerHub-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fixerhub
DB_USER=postgres
DB_PASSWORD=enteryourpassword
JWT_SECRET=your_jwt_secret
NODEMAILER_USER=daniel.ayele@anbesg.com
NODEMAILER_PASS=lonjvqsuqrbdaled
```

## Project Structure

```
FixerHub-Backend/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
├── uploads/        # File upload directory
├── server.js       # Main application file
└── package.json    # Project dependencies
```

## Available Scripts

- `npm start` - Start the server
- `npm test` - Run tests (not configured yet)

## API Endpoints

The API documentation will be added here.

## Dependencies

- express: Web framework
- pg: PostgreSQL client
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- multer: File upload handling
- nodemailer: Email functionality
- joi: Input validation
- cors: Cross-origin resource sharing
- dotenv: Environment variables
- body-parser: Request body parsing

## Security

- Passwords are hashed using bcrypt
- JWT for secure authentication
- Input validation using Joi
- CORS enabled for secure cross-origin requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request to the `main` branch


