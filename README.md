# Internhub Frontend

Internhub is a platform that connects students with companies for internships. This project is the frontend part of the Internhub platform. It is built using React.

## Prerequisites

- [Node.js](https://nodejs.org/en/download) v22.14.0 (LTS) or later

## Installation

1. Clone the project from the repository:

    ```sh
    git clone https://github.com/nguyenkhanhquy/internhub-frontend.git
    ```

2. Open the project in your favorite IDE (Visual Studio Code is recommended).

3. Create the `.env.local` file:

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
   VITE_BACKEND_URL= # Your backend URL (e.g. http://localhost:8080/api/v1)
   VITE_GOOGLE_CLIENT_ID=
   VITE_GOOGLE_REDIRECT_URI=
   VITE_GOOGLE_AUTH_URI=
   ```

4. Install dependencies:

    ```sh
    npm install
    ```

5. Run the project:

    ```sh
    npm run dev
    ```

6. Open `http://localhost:3000` with your browser to see the result.

7. Stop the project:

    Press `Ctrl + C` in the terminal.

## Technology Stack

- Programming Language: JavaScript
- Frameworks/Libraries: React, Material UI
- Build Tool: Vite
- CSS Framework: Tailwind CSS
- IDE: Visual Studio Code
- Deployment: Vercel
- Version Control: Git

## Contributors

1. [@nguyenkhanhquy](https://github.com/nguyenkhanhquy) - Nguyễn Khánh Quy - 21110282
2. [@NguyenDink](https://github.com/NguyenDink) - Đinh Trung Nguyên - 21110259
