# Jello
App Academy Group Project


## Database Schema Design

<!--!!START SILENT -->
![jello-database-schema]

[jello-database-schema]:Jello.png


## API Documentation

## Table of Contents

- [Sign Up a User](#sign-up-a-user)
- [User Endpoints](#user-endpoints)
- [Board Endpoints](#board-endpoints)
- [List Endpoints](#list-endpoints)
- [Card Endpoints](#card-endpoints)
- [Label Endpoints](#label-endpoints)


# API Documentation

## Users

### POST /users

**Description:** Create a new user

**Require Authentication:** False

**Request:**
- Method: POST
- URL: /api/users
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "password": "secret password"
    }
    ```

**Successful Response:**
- Status Code: 200
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

**Error response: User already exists with the specified email**
- Status Code: 500
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

**Error response: User already exists with the specified username**
- Status Code: 500
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

**Error response: Body validation errors**
- Status Code: 400
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Bad Request", 
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

### GET /users/{UserID}

**Description:** Get Information about a user

**Require Authentication:** True

**Request:**
- Method: GET
- URL: /api/users/{UserID}
- Headers: 
    - Content-Type: application/json
- Body: None

**Successful Response:**
- Status Code: 200
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "user": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "email": "john.smith@gmail.com",
        "username": "JohnSmith"
      }
    }
    ```

**Error response: User not found**
- Status Code: 404
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User not found"
    }
    ```

### PUT /users/{UserID}

**Description:** Update a user's information

**Require Authentication:** True

**Request:**
- Method: PUT
- URL: /api/users/{UserID}
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "firstName": "UpdatedFirstName",
      "lastName": "UpdatedLastName",
      "email": "updated.email@gmail.com",
      "username": "UpdatedUsername"
    }
    ```

**Successful Response:**
- Status Code: 200
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User information updated successfully"
    }
    ```

**Error response: User not found**
- Status Code: 404
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User not found"
    }
    ```

### DELETE /users/{UserID}

**Description:** Delete a specific user

**Require Authentication:** True

**Request:**
- Method: DELETE
- URL: /api/users/{UserID}
- Headers: 
    - Content-Type: application/json
- Body: None

**Successful Response:**
- Status Code: 200
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User deleted successfully"
    }
    ```

**Error response: User not found**
- Status Code: 404
- Headers: 
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "User not found"
    }
    ```
