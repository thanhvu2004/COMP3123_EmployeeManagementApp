# Employee Management App

## Conor Le - 101411302

This project is an Employee Management Application built with React for the frontend and Node.js/Express for the backend. It allows users to manage employee data, including creating, editing, viewing, and deleting employee records.

## Features

- Docker container set up
- User authentication (login and signup)
- Create, edit, view, and delete employee records
- Search employees by department or position
- Responsive UI with React Bootstrap

## Screenshots

### Docker Container Set Up
![Docker Container Set Up](./screenshot/Docker-Container.png)

### Postman Test User Sign Up
![PM Test User Sign Up](./screenshot/PM-user-signup.png)

### Postman Test User Log In
![PM Test User Log In](./screenshot/PM-user-login.png)

### Postman Test Create Employee
![PM Test Create Employee](./screenshot/PM-create-employee.png)

### Postman Test Get All Employee
![PM Test Get All Employee](./screenshot/PM-get-all-employee.png)

### Postman Test Get Employee By Id
![PM Test Get Employee By Id](./screenshot/PM-get-employee-by-id.png)

### Postman Test Update Employee
![PM Test Update Employee](./screenshot/PM-update-employee.png)

### Postman Test Delete Employee
![PM Test Delete Employee](./screenshot/PM-delete-employee.png)

### Postman Test Search
![PM Test Search](./screenshot/PM-search.png)

### Home Screen Not Log In
![Home Screen Not Log In](./screenshot/Home-Screen-not-log-in.png)

### Signup Page
![Signup Page](./screenshot/Sign-Up-Screen.png)

### Login Page
![Login Page](./screenshot/Log-In-Screen.png)

### Home Screen Log In
![Home Screen Log In](./screenshot/Home-Screen-log-in.png)

### Employee List
![Employee List](./screenshot/Employee-management-page.png)

### Create Employee
![Create Employee](./screenshot/Create-Employee.png)

### Result After Create Employee
![Result After Create Employee](./screenshot/Result.png)

### Edit Employee
![Edit Employee](./screenshot/Edit-Employee.png)

### Result After Edit Employee
![Result After Edit Employee](./screenshot/Result2.png)

### Employee Details
![Employee Details](./screenshot/View-Employee-Details.png)

### Search Function
![Search By Department](./screenshot/Search1.png)
![Search By Position](./screenshot/Search2.png)
![Search By Position But No Match](./screenshot/Search3.png)

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Sign up for a new account or log in with an existing account.
3. Use the application to manage employee records.

## API Endpoints

### User Routes

- `POST /api/v1/user/signup` - Sign up a new user
- `POST /api/v1/user/login` - Log in an existing user

### Employee Routes

- `GET /api/v1/emp/employees` - Get all employees
- `POST /api/v1/emp/employees` - Create a new employee
- `GET /api/v1/emp/employees/:eid` - Get an employee by ID
- `PUT /api/v1/emp/employees/:eid` - Update an employee by ID
- `DELETE /api/v1/emp/employees` - Delete an employee by ID
- `GET /api/v1/emp/employees?department=&position=` - Search employees by department or position