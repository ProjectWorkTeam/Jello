# Jello

An App Academy Group Project

## Live Link

<https://jello-project-management.onrender.com/>

## Check out our wiki for additional docs

<https://github.com/ProjectWorkTeam/Jello>

# Jello

Welcome to Jello! This web application is a task and project management tool, mimicking the functionality and design of the popular tool Trello. Users can create boards for different projects or aspects of their work or personal life. Within these boards, users can create lists to further categorize tasks. Individual tasks, represented by cards, can be added to these lists. These cards can be moved between listss, making this a flexible and intuitive tool for managing tasks and tracking project progress. Whether you're coordinating a large team project, planning your next big event, or just making a shopping list, our Jello is designed to keep you organized and in control.

# Technologies Used

 Jello is powered by an array of modern web development technologies across the stack. Here's a brief rundown:

- **JavaScript**: The core language of the application, used for building interactive elements on the client side.
- **React**: A JavaScript library for building user interfaces. We've used React to build the components of our app in a modular and maintainable way.
- **JSX**: Syntax extension for JavaScript, used with React to describe what the UI should look like.
- **Redux**: A predictable state container for JavaScript apps. We used Redux alongside React for state management.
- **Python**: The core language on the server side, used to build the backend of the application.
- **Flask**: A Python web framework used to create the server side of the application. We've used Flask to handle requests and responses.
- **Flask-CORS**: A Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- **Flask-SQLAlchemy**: A Flask extension that simplifies the use of SQLAlchemy (a SQL toolkit and Object-Relational Mapping system) with Flask by providing useful defaults and extra helpers.
- **Alembic**: A database migration tool for SQLAlchemy, used to handle changes in the database schema.
- **Python-Pillow (PIL)**: An open-source Python Imaging Library that adds image processing capabilities to our Python interpreter.
- **Font Awesome**: A toolkit for vector icons and social logos, used for adding intuitive icons throughout the application.
- **WTForms**: A flexible forms validation and rendering library for Python, used in the server side for form validation.

These technologies work together to create a seamless, interactive, and user-friendly web application that replicates the key features of Trello.

## API Documentation

## Table of Contents

1. [Users](#users)
2. [Boards](#boards)
3. [Lists](#lists)
4. [Cards](#cards)

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

## Lists

### GET /lists/board/{boardID}

**Description:** Get all lists belonging to a specific board

**Require Authentication:** True

**Request:**

- Method: GET
- URL: /api/lists/board/{boardID}
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
      "lists": [
          {
            "id": 1,
            "name": "List Name",
            "board_id": 1,
            "position_id": 1
          },
          //...
      ]
    }
    ```

**Error response: No lists found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "No lists found."
    }
    ```

### POST /lists

**Description:** Create a new list

**Require Authentication:** True

**Request:**

- Method: POST
- URL: /api/lists
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "list_name": "New List Name",
      "board_id": 1
    }
    ```

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "list": {
        "id": 1,
        "name": "New List Name",
        "board_id": 1,
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

### PUT /lists/{listID}

**Description:** Update a list's name

**Require Authentication:** True

**Request:**

- Method: PUT
- URL: /api/lists/{listID}
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "list_name": "Updated List Name"
    }
    ```

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "id": 1,
      "name": "Updated List Name",
      "board_id": 1,
      "position_id": 1
    }
    ```

**Error response: List not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "List not found."
    }
    ```

### DELETE /lists/{listID}

**Description:** Delete a specific list

**Require Authentication:** True

**Request:**

- Method: DELETE
- URL: /api/lists/{listID}
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
      "message": "List deleted successfully."
    }
    ```

**Error response: List not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "List not found."
    }
    ```

### PUT /lists/{listID}/position

**Description:** Update a list's position

**Require Authentication:** True

**Request:**

- Method: PUT
- URL: /api/lists/{listID}/position
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
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
      "id": 1,
      "name": "List Name",
      "board_id": 1,
      "position_id": "New Position ID"
    }
    ```

**Error response: List not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "List not found."
    }
    ```

## Cards

### GET /cards/list/<list_id>

**Description:** Get all cards of a specific list

**Require Authentication:** True

**Request:**

- Method: GET
- URL: /api/cards/list/<list_id>

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    [
      {
        "id": 1,
        "title": "Card Title",
        "text": "Card description",
        "list_id": <list_id>,
        "position_id": 1
      },
      ...
    ]
    ```

**Error response: List not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "List not found"
    }
    ```

### GET /cards/<card_id>

**Description:** Get a specific card

**Require Authentication:** True

**Request:**

- Method: GET
- URL: /api/cards/<card_id>

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "id": 1,
      "title": "Card Title",
      "text": "Card description",
      "list_id": <list_id>,
      "position_id": 1
    }
    ```

**Error response: Card not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Card not found"
    }
    ```

### POST /cards/

**Description:** Create a new card

**Require Authentication:** True

**Request:**

- Method: POST
- URL: /api/cards
- Headers:
  - Content-Type: application/json
  - csrf_token: <csrf_token>
- Body:

    ```
    {
      "title": "New Card",
      "description": "Card description",
      "list_id": <list_id>
    }
    ```

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "id": 2,
      "title": "New Card",
      "text": "Card description",
      "list_id": <list_id>,
      "position_id": 2
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
        "title": "Title is required",
        "list_id": "List ID is required"
      }
    }
    ```

### PUT /cards/<card_id>

**Description:** Update a card

**Require Authentication:** True

**Request:**

- Method: PUT
- URL: /api/cards/<card_id>
- Headers:
  - Content-Type: application/json
  - csrf_token: <csrf_token>
- Body:

    ```
    {
      "title": "Updated Card",
      "description": "Updated description"
    }
    ```

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "id": <card_id>,
      "title": "Updated Card",
      "text": "Updated description",
      "list_id": <list_id>,
      "position_id": <position_id>
    }
    ```

**Error response: Card not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Card not found"
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
        "title": "Title is required"
      }
    }
    ```

### DELETE /cards/<card_id>

**Description:** Delete a card

**Require Authentication:** True

**Request:**

- Method: DELETE
- URL: /api/cards/<card_id>

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Card deleted successfully"
    }
    ```

**Error response: Card not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Card not found"
    }
    ```

### PUT /cards/<card_id>/position

**Description:** Update a card's position

**Require Authentication:** True

**Request:**

- Method: PUT
- URL: /api/cards/<card_id>/position
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "new_list_id": <new_list_id>,
      "new_position_id": <new_position_id>
    }
    ```

**Successful Response:**

- Status Code: 200
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Card updated successfully"
    }
    ```

**Error response: Card not found**

- Status Code: 404
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Card not found"
    }
    ```

**Error response: List_id or position_id not provided**

- Status Code: 400
- Headers:
  - Content-Type: application/json
- Body:

    ```
    {
      "message": "Both list_id and position_id must be provided"
    }
    ```
