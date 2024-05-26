Certainly! Here's the updated README file with interactive formatting and additional details:

---

# MERN CRUD Employee Management Project

This project is a comprehensive employee management system developed using the MERN stack (MongoDB, Express.js, React, Node.js). It facilitates Create, Read, Update, and Delete (CRUD) operations for employee records while incorporating role-based authentication and authorization.

## Project Structure

```
+---client
¦   +---public
¦   +---src
¦       +---assets
¦       +---components
+---server
    +---middleware
    +---models
```

## Features

- **Role-Based Login and Authentication**: Users are categorized into two roles, namely Manager and Employee. Authentication is enforced based on these roles, allowing managers full control over employee data while restricting employees to viewing the employee list.

- **Sorting Functionality**: The system offers sorting capabilities based on location name and designation. Users can simply click on the respective header to sort the data accordingly.

- **Password Encryption**: User passwords are securely encrypted using bcrypt, ensuring the confidentiality of sensitive information.

- **Session Management**: Sessions are managed via JSON Web Tokens (JWT), providing a secure and stateless means of authentication.

- **Basic Functionality**: The project includes all fundamental operations such as adding, deleting, and updating employee records. Additionally, it supports seamless login and logout processes tailored to the respective user roles.

- **Route Protection (Pending)**: While the project currently lacks route protection, it remains a forthcoming feature aimed at enhancing security and access control.

## Technologies Used

- **Backend**: Express.js, Node.js
- **Frontend**: React (with Tailwind CSS)
- **Database**: MongoDB

## Installation and Setup

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

## Dependencies

### Frontend

- **axios**: For handling HTTP requests.
- **bootstrap**: CSS framework for styling.
- **react**: JavaScript library for building user interfaces.
- **react-bootstrap**: React components for Bootstrap.
- **react-dom**: Entry point to the React DOM.
- **react-router-dom**: Routing library for React.

### Backend

- **bcrypt**: Library for hashing passwords.
- **cookie-parser**: Middleware for parsing cookies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **express**: Web framework for Node.js.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT).
- **mongoose**: MongoDB object modeling for Node.js.
- **nodemon**: Utility for automatically restarting the server during development.

## Usage

- Access the application through the provided URL or local development server.
- Upon loading, users can log in based on their assigned roles (Manager or Employee).
- Managers can perform CRUD operations on employee records, while employees have view-only access to the employee list.
- Sorting functionality is available by clicking on the respective header columns.
- Log out from the application when done.

## License

This project is licensed under the [MIT License](LICENSE).
