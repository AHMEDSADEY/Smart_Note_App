# Smart Note App 📝
A modern, secure note-taking application built with Node.js, Express, MongoDB, and GraphQL. This application provides a robust backend API for creating, managing, and organizing personal notes with user authentication and authorization.
## 🚀 Features
- **User Authentication & Authorization**
  - Secure user registration and login
  - JWT-based authentication
  - Role-based access control (User/Admin)
  - Email confirmation system
  - Password reset functionality
  - - **Note Management**
  - Create, read, update, and delete notes
  - Soft delete functionality
  - Rich text content support (up to 60,000 characters)
  - Note ownership and privacy
  - Pagination and filtering
  - - **Advanced Features**
  - GraphQL API for flexible data querying
  - RESTful API endpoints
  - File upload support with Multer
  - Email notifications
  - Data encryption and security
  - Input validation and sanitization
  - Error handling and logging
  - 
- **Security Features**
  - Password hashing with bcrypt
  - JWT token management
  - Token blacklisting for logout
  - CORS protection
  - Input validation with Joi
  - Data encryption
  - ## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API + GraphQL
- **Validation**: Joi
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: bcrypt, crypto-js
- **Development**: ES6 Modules
- 
## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager
- ## 🚀 Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Smart_Note_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
3. **Start the development server**
   ```bash
   npm run dev
   ```
