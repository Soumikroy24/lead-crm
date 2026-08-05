# Lead Management System

### Developed by Soumik Roy

A full-stack **Lead Management System** built using the **MERN Stack**.

This application enables organizations to capture, manage, assign, and track leads through secure authentication, role-based access control, activity tracking, notes, and a public lead capture form.

---

## Assignment Objectives

This project was developed to satisfy the requirements of the Digital Heroes Full Stack Development Assignment, including:

- Public lead capture form
- Secure authentication using JWT
- Role-based access control (Admin & Member)
- Lead management (Create, Read, Update, Delete)
- Lead assignment to team members
- Lead activity timeline
- Lead notes with timestamps
- Search, filtering, and pagination
- RESTful backend API
- Automated backend testing
- Deployment-ready architecture

---

## Features

### Authentication & Authorization

- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access (Admin & Member)

### Lead Management

- Create new leads
- View all leads
- Update lead information
- Delete leads (Admin only)
- Public Lead Capture Form

### Lead Assignment

- Assign leads to team members
- View assigned member for each lead

### Notes

- Add notes to leads
- Timestamped notes
- Author information displayed with every note

### Activity Timeline

Automatically records important actions including:

- Lead creation
- Lead updates
- Lead assignment
- Lead deletion
- Notes added

### Search & Filtering

- Search by lead details
- Filter by status
- Filter by source
- Pagination support

### User Interface

- Dashboard
- Lead Management
- Sidebar Navigation
- Responsive Layout
- Professional Branding

### Testing

Automated backend tests using:

- Jest
- Supertest
- mongodb-memory-server

---

## Technology Stack

### Frontend

- React.js
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt

### Testing

- Jest
- Supertest
- mongodb-memory-server

---

## Project Structure

```text
lead-management-system/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   └── package.json
│
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file inside the **server** directory.

Example:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
```

---

## Future Improvements

- User profile management
- Dashboard analytics
- File attachments
- Email notifications
- Advanced reporting
- CSV import/export

---

## Author

**Soumik Roy**

Final Year B.Tech Student (Computer Science & Business Systems)  
Heritage Institute of Technology, Kolkata

GitHub: https://github.com/Soumikroy24

Email: birbanshisoumik@gmail.com

---

## Copyright & Usage

© 2026 Soumik Roy

This repository is made publicly available solely for academic evaluation and portfolio purposes.

No permission is granted to copy, reproduce, modify, redistribute, or reuse this source code, in whole or in part, without the author's prior written permission.