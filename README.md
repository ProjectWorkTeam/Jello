# Jello
App Academy Group Project

## Live Link!!

https://jello-project-management.onrender.com/

## Check out our wiki for additional docs!

https://github.com/ProjectWorkTeam/Jello

## API Documentation

## Table of Contents

- [Users](#users)
  - [Create a New User (POST /users)](#post-users)
  - [Get User Information (GET /users/{UserID})](#get-usersuserid)
  - [Update User Information (PUT /users/{UserID})](#put-usersuserid)
  - [Delete a User (DELETE /users/{UserID})](#delete-usersuserid)

## Database Schema Design

<!--!!START SILENT -->
![jello-database-schema]

[jello-database-schema]:zJello.png

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

## Boards

### GET /boards/{boardID}

**Description:** Get the details of a specific board

**Require Authentication:** True

**Request:**
- Method: GET
- URL: /api/boards/{boardID}
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
      "board": {
        "id": 1,
        "name": "Board Name",
        "owner_id": 1,
        "position_id": 1
      }
    }
    ```

**Error response: Board not found**
- Status Code: 404
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Board not found."
    }
    ```

### GET /boards

**Description:** Get all boards owned by the user

**Require Authentication:** True

**Request:**
- Method: GET
- URL: /api/boards
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
      "boards": [
          {
            "id": 1,
            "name": "Board Name",
            "owner_id": 1,
            "position_id": 1
          },
          //...
      ]
    }
    ```

### POST /boards

**Description:** Create a new board

**Require Authentication:** True

**Request:**
- Method: POST
- URL: /api/boards
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "name": "New Board Name"
    }
    ```

**Successful Response:**
- Status Code: 200
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Board created successfully.",
      "board": {
        "id": 1,
        "name": "New Board Name",
        "owner_id": 1,
        "position_id": 1
      }
    }
    ```

**Error response: Invalid form submission**
- Status Code: 400
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Invalid form submission."
    }
    ```

### PUT /boards/{boardID}

**Description:** Update a board's name and/or position

**Require Authentication:** True

**Request:**
- Method: PUT
- URL: /api/boards/{boardID}
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "name": "Updated Board Name",
      "position_id": "New Position ID"
    }
    ```

**Successful Response:**
- Status Code: 200
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Board updated successfully."
    }
    ```

**Error response: Board not found**
- Status Code: 404
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Board not found."
    }
    ```

### DELETE /boards/{boardID}

**Description:** Delete a specific board

**Require Authentication:** True

**Request:**
- Method: DELETE
- URL: /api/boards/{boardID}
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
      "message": "Board deleted successfully."
    }
    ```

**Error response: Board not found**
- Status Code: 404
- Headers:
    - Content-Type: application/json
- Body:
    ```
    {
      "message": "Board not found."
    }
    ```
