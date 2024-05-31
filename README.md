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

## 2. Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Add your MongoDB and keys in the .env file

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

