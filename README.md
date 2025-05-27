# 🎓 STUDY-NOTION

> **Empower Learning, Create Courses, and Manage Content Seamlessly**

![Last Commit](https://img.shields.io/github/last-commit/ayu2046/Study-Notion?style=flat-square)
![React](https://img.shields.io/badge/Frontend-React-blue?style=flat-square)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=flat-square)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?style=flat-square)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=flat-square)

> Built with a modern full-stack architecture to deliver seamless course management and content creation.

![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-blue?style=flat-square)
![Express](https://img.shields.io/badge/-Express-black?style=flat-square)
![Cloudinary](https://img.shields.io/badge/-Cloudinary-lightblue?style=flat-square)
![Stripe](https://img.shields.io/badge/-Stripe-purple?style=flat-square)

---

## 🌐 Live Demo

🔗 **Hosted Frontend**: [Study Notion App](https://studynotionfrontend-ecru.vercel.app/)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Testing](#testing)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## 📌 Overview

**Study-Notion** is a full-featured ed-tech platform that allows educators to create and manage courses, while students can explore, enroll, and learn through a seamless interface. Built with a MERN stack and integrated with payment and media services, it's ideal for modern educational needs.

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary API keys
- Stripe account (for payments)
- JWT secret for authentication

---

### 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ayu2046/Study-Notion
   ```

2. **Navigate to the project directory**

   ```bash
   cd Study-Notion
   ```

3. **Install dependencies**

   ```bash
   cd server
   npm install

   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory with:

   ```env
   PORT=5000
   MONGODB_URL=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   CLOUDINARY_API_KEY=<API Key>
   CLOUDINARY_API_SECRET=<API Secret>
   STRIPE_SECRET_KEY=<Stripe Secret>
   ```

5. **Run the app**

   ```bash
   # Backend
   cd server
   npm run dev

   # Frontend
   cd ../client
   npm start
   ```

---

## 🧑‍💻 Usage

- **Instructors** can:
  - Create and publish detailed course content
  - Upload images/videos using Cloudinary
  - Set course pricing via Stripe

- **Students** can:
  - Discover and enroll in courses
  - Watch protected video content
  - Track course progress

---

## ✨ Features

- 🎓 Course Creation and Publishing
- 🧑‍🏫 Instructor Dashboard
- 👨‍🎓 Student Enrollments
- 💳 Stripe Payment Integration
- ☁️ Cloudinary File Hosting
- 🔐 JWT Auth with Role Management
- 📈 Real-time User Dashboard
- 🎨 Styled with Tailwind CSS (v3.2) & React (v18.2)

---

## 🧪 Testing

You can test backend routes using Postman or Thunder Client.

Frontend and backend both support modular structure for future test automation using:
```bash
npm test
```

---

## 🛠️ Tech Stack

| Category      | Tech                         |
|---------------|------------------------------|
| Frontend      | React, Tailwind CSS          |
| Backend       | Node.js, Express.js          |
| Database      | MongoDB Atlas                |
| Auth          | JWT                          |
| Payments      | Stripe                       |
| File Uploads  | Cloudinary                   |
| Styling Tool  | PostCSS, Tailwind CLI        |
| Deployment    | Vercel (Frontend), Render    |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests and feedback are welcome! Open an issue or fork and contribute.

---

> Developed with ❤️ by [@ayu2046](https://github.com/ayu2046)
