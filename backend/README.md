## Backend

### Description

This project is a RESTful API built using Node.js and Express.js that serves as a backend for managing users, transactions, and items in a simple inventory management system. It leverages MongoDB for data storage and JWT (JSON Web Tokens) for authentication and authorization.

## Technologies Used

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web application framework for Node.js used for building RESTful APIs.
- **MongoDB**: A NoSQL database used for storing application data.
- **JWT (JSON Web Tokens)**: A method for securely transmitting information between parties as a JSON object.

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your MongoDB and keys in the .env file

### Usage

1. Start the server: `npm start`

### Routes

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
