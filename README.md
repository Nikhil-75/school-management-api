# School Management API

This is a Node.js + Express.js + MongoDB API for managing Schools, Classes, and Students. The API supports CRUD operations with JWT-based authentication.

---

## Table of Contents

- [Technologies](#technologies)  
- [Setup](#setup)  
- [Authentication](#authentication)  
- [API Endpoints](#api-endpoints)  
  - [User](#user)  
  - [School](#school)  
  - [Class](#class)  
  - [Student](#student)  
- [File Upload](#file-upload)  
- [License](#license)  

---

## Technologies

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Multer (File Upload)

---

## Setup

1. Clone the repository:  
```bash
git clone <your-github-repo-url>
cd schollapi

2. Install dependencies:
npm install

3. Create a .env file in root:
DB=your-mongodb-uri
PORT=4000
JWT_SECRET=your-secret-key

4. Start the server:
node index.js

Server will run at http://localhost:4000.

Authentication

Signup: POST /api/signup

Login: POST /api/login

Use the returned token in headers for protected routes:

Authorization: Bearer <token>

API Endpoints
User
Endpoint	Method	Body	Description
/api/signup	POST	{ name, email, password }	Register new user
/api/login	POST	{ email, password }	Login user & get JWT
School
Endpoint	Method	Body	Description
/api/schools	POST	{ name, photo }	Create a school (requires auth)
Class
Endpoint	Method	Body	Description
/api/classes	POST	{ name }	Create a class (requires auth)
Student
Endpoint	Method	Body	Description
/api/students	POST	{ name, rollNumber, school, class }	Create student (requires auth)
/api/students/assign	POST	{ studentId, classId }	Assign student to a class
/api/students	GET	-	Get all students
/api/students/class/:classId	GET	-	Get students in a class
/api/students/classmates/:studentId	GET	-	Get classmates of a student

File Upload

Photos for schools are uploaded using multipart/form-data.

Field name: photo

Stored in /uploads folder.

URL example: http://localhost:4000/uploads/<filename>