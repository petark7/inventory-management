# Project Overview
The project helps with inventory management within a warehouse, allowing for managing products as well as making transactions (adding items or selling items), ensuring easier workflow.

![image](https://github.com/petark7/inventory-management/assets/73505122/75eb8c9f-ddb3-434e-af06-0568a59e364b)

## 1. Features

### User Management
- Registration of new users.
- Authentication and login functionality.
- Refreshing authentication tokens.
- Logout functionality.

### Transaction Management
- Creation and retrieval of transactions.
- Ability to associate transactions with items and users.
- Retrieval of items based on transaction details.

### Item Management
- Retrieval of all items.
- Addition of new items to the inventory.
- Updating existing item details.
- Deletion of items from the inventory.

## 2. Screenshots
![image](https://github.com/petark7/inventory-management/assets/73505122/6195ad2e-7e3b-4c4e-a097-30f6accf737e)
![image](https://github.com/petark7/inventory-management/assets/73505122/65938952-3e69-4ced-aa63-5246fbb7b608)
![image](https://github.com/petark7/inventory-management/assets/73505122/9f481a2a-3cdc-4e52-9392-a4e63ce0b3d1)
![image](https://github.com/petark7/inventory-management/assets/73505122/bf6fed1c-ffb6-42eb-9b64-6c59427c82b6)
![image](https://github.com/petark7/inventory-management/assets/73505122/fa2dd42d-9775-495c-9f39-d5020d26ef26)
![image](https://github.com/petark7/inventory-management/assets/73505122/121551a8-410b-47e0-b044-dacfe81a1d46)
![image](https://github.com/petark7/inventory-management/assets/73505122/52646066-6a65-400b-ba35-1ff8e1bd14ad)

## 2. Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your MongoDB and keys in the .env file
4. Start the server: `npm start`

## 3. Frontend Description

### Overview

The frontend of this project is built using modern web technologies such as React.js and Material-UI to provide an intuitive user interface for efficient inventory management. It leverages Redux for robust state management and Redux Saga for handling asynchronous operations. Axios is used for seamless communication with the backend API.

### Technologies Used

- **React.js**: A powerful JavaScript library for building dynamic and interactive user interfaces.
- **Material-UI**: A comprehensive React UI framework offering a wide range of customizable and responsive components for creating sleek designs.
- **Redux**: A predictable state container that simplifies the management of application state, ensuring consistency and scalability.
- **Redux Saga**: A middleware library for managing side effects and asynchronous actions in Redux, facilitating clean and maintainable code.
- **Axios**: A promise-based HTTP client that simplifies making asynchronous requests to the backend server.

## Backend Description

### Overview

This project is a RESTful API built using Node.js and Express.js that serves as a backend for managing users, transactions, and items in a simple inventory management system. It leverages MongoDB for data storage and JWT (JSON Web Tokens) for authentication and authorization.

### Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js used for building RESTful APIs.
- **MongoDB**: A NoSQL database used for storing application data.
- **JWT (JSON Web Tokens)**: A method for securely transmitting information between parties as a JSON object.

## Endpoints

The API has the following routes:
## User Endpoints

### Fetch User(s)
- **GET /users**: Fetches all users or a specific user if `userID` is provided.

### Register User
- **POST /users/register**: Registers a new user.

### Login User
- **POST /users/login**: Logs in a user and returns access token.

### Refresh Token
- **POST /users/token**: Refreshes access token using refresh token.

### Logout User
- **POST /users/logout**: Logs out a user by clearing JWT cookie.

## Transaction Endpoints

### Fetch All Transactions
- **GET /transactions**: Fetches all transactions.

### Create Transaction
- **POST /transactions**: Creates a new transaction.

### Get Item by ID
- **GET /transactions/item/:id**: Fetches an item by its ID.

## Item Endpoints

### Fetch All Items
- **GET /items**: Fetches all items.

### Add New Item
- **POST /items**: Adds a new item.

### Update Item
- **PUT /items/:id**: Updates an existing item.

### Delete Item
- **DELETE /items/:id**: Deletes an item.

