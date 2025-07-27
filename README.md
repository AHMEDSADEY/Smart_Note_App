# Smart Note App

## Authentication APIs

### Login
- **POST** `/auth/logIn`
- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: `{ "token": "..." }`

### Logout
- **POST** `/auth/logout`
- **Headers**: `Authorization: Bearer <token>` or `Authorization: Admin <token>`
- **Body**: `{ "email": "...", "password": "..." }`
- **Response**: Success message confirming logout

### Signup
- **POST** `/auth/signUp`
- **Body**: User registration data

### Confirm Email
- **PATCH** `/auth/confrmEmail`
- Email confirmation endpoint

## Security Features

- **Token Revocation**: When a user logs out, their token is stored in a revoked tokens collection
- **Authentication Middleware**: All protected routes check if the token has been revoked before allowing access
- **Automatic Cleanup**: Revoked tokens are automatically deleted when they expire