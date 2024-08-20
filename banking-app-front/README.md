# Transaction App

This application is a simple fullstack solution consisting of back and front-end. Web application is simulating a basic banking system where users can register, log in, view their balance, transfer money to other users, and view their transaction history.

# NOTE!

Application on purpose has couple of vulnerabilities:
- storing credentials in plain json files,
- usage of endpoints which allow downloading other clients credentials,
- lack of hashing,
- possibility to transfer negative amounts of money between users - "stealing" from other users is a possibility,
- possibility to start with negative balance,
- no rate limiting: The login functionality is vulnerable to brute-force attacks due to the absence of rate limiting.

# Running the application

To run the application, follow these steps:

#### Application - front-end side:

1. Clone the repository:
    ```bash
    git clone https://github.com/Paveu99/banking-app-front
    cd banking-app-front
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application in development mode:
    ```bash
    npm run dev
    ```
**Main route: http://localhost:5173**

4. If you want to build the production version:
    ```bash
    npm run build
    ```

# Tech stack

Application was created using:
**Dev dependencies**:
- @eslint/js: ^9.8.0,
- @types/react: ^18.3.3,
- @types/react-dom: "^18.3.0,
- @vitejs/plugin-react-swc: ^3.5.0,
- eslint: ^9.8.0,
- eslint-plugin-react-hooks: ^5.1.0-rc.0,
- eslint-plugin-react-refresh: ^0.4.9,
- globals: ^15.9.0,
- typescript: ^5.5.3,
- typescript-eslint: ^8.0.0,
- vite: ^5.4.0.

**Depenedencies**:
- axios: ^1.7.3,
- react: ^18.3.1,
- react-dom: ^18.3.1,
- react-router-dom: ^6.26.0.