## Backend

### Description

This is a Node.js RESTful API for a simple shop. It uses MongoDB as the database and Express.js as the web framework.

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
