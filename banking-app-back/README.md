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

#### Application - back-end side:

1. Clone the repository:
    ```bash
    git clone https://github.com/Paveu99/banking-app-back
    cd banking-app-back
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the application in development mode:
    ```bash
    npm run start:dev
    ```
**Main route: http://localhost:3001**

4. If you want to build the production version:
    ```bash
    npm run build
    ```

# API references:

**Main route: http://localhost:3001**

- Add/register user:

```http
    POST /register
```
**Body**:
| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `username` | `string` | **Required**. Username of user              |
| `password` | `string` | **Required**. Password                      |
| `balance`  | `number` | **Not Required**. Starting balance of user  |

- Log in:

```http
    POST /login
```
**Body**:
| Parameter  | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `username` | `string` | **Required**. Username of user  |
| `password` | `string` | **Required**. Password          |

- Get user credentials:

```http
    GET /api/user/me
```

- Get other users credentials - logged in user not inlcuded:

```http
    GET /api/users
```

- Transfer money between users:

```http
    POST /transfer
```

**Body**:
| Parameter   | Type     | Description                                                              |
| :---------- | :------- | :----------------------------------------------------------------------- |
| `amount`    | `string` | **Required**. Amount of money to transfer between accounts               |
| `recipient` | `string` | **Required**. Recipient id - necessary to identify person to transfer to |

- Get all the transaction of logged in person:

```http
    GET /api/transactions
```

- Log out:

```
    GET /logout
```

# Tech stack

Application was created using:
**Dev dependencies**:
- @types/cors: ^2.8.17,
- @types/express: ^4.17.21,
- @types/express-session: ^1.18.0,
- @types/node: ^22.1.0,
- @types/uuid: ^10.0.0,
- ts-node: ^10.9.2,
- ts-node-dev: ^2.0.0,
- typescript: ^5.5.4.

**Depenedencies**:
- cors: ^2.8.5,
- express": ^4.19.2,
- express-async-errors: ^3.1.1,
- express-session: ^1.18.0,
- uuid: ^10.0.0.