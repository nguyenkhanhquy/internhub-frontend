# Internhub Frontend

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![Material UI](https://img.shields.io/badge/Material-UI-0081CB)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## 📋 Overview

Internhub is a platform connecting students with businesses for internship positions. This project is the frontend part of the Internhub platform, built using React and modern technologies.

### ✨ Key Features

- 🔍 Search and filter internship opportunities by various criteria
- 📝 Register and manage student profiles
- 💼 Manage job postings for recruiters
- 🎓 Management system for faculty of Faculty of Information Technology
- 🔄 Manage application processes and feedback
- 📊 Dashboards and reports

## 🔧 System Requirements

- [Node.js](https://nodejs.org/en/download) v22.14.0 (LTS) or higher
- NPM v10.x or higher (included with Node.js)
- Modern web browsers (Chrome, Firefox, Edge, Safari)

## 🚀 Installation Guide

### 1. Clone the project from repository

```sh
git clone https://github.com/nguyenkhanhquy/internhub-frontend.git
cd internhub-frontend
```

### 2. Open the project in your preferred IDE (Visual Studio Code recommended)

### 3. Create a `.env.local` file

Ensure the `.env.local` file is placed in the root directory of the project:

```plaintext
internhub-frontend/
  |-- ...
  |-- public/
  |-- src/
  |-- .env.local 👈
  |-- ...
```

Add the following environment variables to the `.env.local` file:

```plaintext
# Backend API URL
VITE_BACKEND_URL=http://localhost:8080/api/v1

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_REDIRECT_URI=your_redirect_uri_here
VITE_GOOGLE_AUTH_URI=your_auth_uri_here
```

### 4. Install dependencies

```sh
npm install
```

### 5. Run the project in development mode

```sh
npm run dev
```

### 6. Open your browser and access

```plaintext
http://localhost:3000
```

### 7. Stop the project

Press `Ctrl + C` in the terminal.

## 📦 Available Scripts

```sh
# Run development environment
npm run dev

# Build for production
npm run build

# Check for errors with ESLint
npm run lint

# Preview the build
npm run preview
```

## ⚙️ Technology Stack

- **Programming Language**: JavaScript
- **Framework/Libraries**:
  - React (Frontend library)
  - Material UI (Component library)
  - Redux Toolkit (State management)
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS
- **IDE**: Visual Studio Code
- **Deployment**: Vercel
- **Version Control**: Git

## 📁 Directory Structure

```plaintext
src/
  |-- api/          # API clients and constants
  |-- assets/       # Static assets
  |-- components/   # React components
  |-- contexts/     # React contexts
  |-- hooks/        # Custom hooks
  |-- layouts/      # Layout components
  |-- pages/        # Page components
  |-- providers/    # Provider components
  |-- routes/       # Application routes
  |-- services/     # Service modules
  |-- store/        # Redux store
  |-- utils/        # Utility functions
```

## 👨‍💻 Development Team

| Full Name | Student ID | GitHub |
|-----------|------------|--------|
| Nguyen Khanh Quy | 21110282 | [@nguyenkhanhquy](https://github.com/nguyenkhanhquy) |
| Dinh Trung Nguyen | 21110259 | [@NguyenDink](https://github.com/NguyenDink) |

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
