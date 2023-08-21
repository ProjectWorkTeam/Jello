# Jello
<div>An App Academy Group Project</div>
<div></div>
Welcome to Jello! This web application is a task and project management tool, mimicking the functionality and design of the popular tool Trello. Users can create boards for different projects or aspects of their work or personal life. Within these boards, users can create lists to further categorize tasks. Individual tasks, represented by cards, can be added to these lists. These cards can be moved between listss, making this a flexible and intuitive tool for managing tasks and tracking project progress. Whether you're coordinating a large team project, planning your next big event, or just making a shopping list, our Jello is designed to keep you organized and in control.

## Live Link

<https://jello-project-management.onrender.com/>

## Index
[MVP Feature List](https://github.com/ProjectWorkTeam/Jello/wiki/Feature-List) |
[User Stories](https://github.com/ProjectWorkTeam/Jello/wiki/User-Stories) |
[Wireframe](https://github.com/ProjectWorkTeam/Jello/wiki/Wireframes) |
[API Documentation](https://github.com/ProjectWorkTeam/Jello/wiki/Documentation)

## Database Schema
<img src="https://github.com/ProjectWorkTeam/Jello/blob/main/zJello.png">

# Technologies Used

 Jello is powered by an array of modern web development technologies across the stack. Here's a brief rundown:

- **JavaScript**: The core language of the application, used for building interactive elements on the client side.
- **React**: A JavaScript library for building user interfaces. We've used React to build the components of our app in a modular and maintainable way.
- **JSX**: Syntax extension for JavaScript, used with React to describe what the UI should look like.
- **Redux**: A predictable state container for JavaScript apps. We used Redux alongside React for state management.
- **Python**: The core language on the server side, used to build the backend of the application.
- **Flask**: A Python web framework used to create the server side of the application. We've used Flask to handle requests and responses.
- **React-beautiful-dnd (Drag and Drop)**: A highly customizable library for implementing drag and drop functionality, developed by Atlassian. In our application, it allows intuitive, visually pleasing drag-and-drop interactions for tasks across different categories and boards, closely replicating the user-friendly interface of Trello. With features like auto-scrolling and droppable placeholders, it's designed to create a natural drag and drop experience.
- **Flask-CORS**: A Flask extension for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.
- **Flask-SQLAlchemy**: A Flask extension that simplifies the use of SQLAlchemy (a SQL toolkit and Object-Relational Mapping system) with Flask by providing useful defaults and extra helpers.
- **Alembic**: A database migration tool for SQLAlchemy, used to handle changes in the database schema.
- **Python-Pillow (PIL)**: An open-source Python Imaging Library that adds image processing capabilities to our Python interpreter.
- **Font Awesome**: A toolkit for vector icons and social logos, used for adding intuitive icons throughout the application.
- **WTForms**: A flexible forms validation and rendering library for Python, used in the server side for form validation.

These technologies work together to create a seamless, interactive, and user-friendly web application that replicates the key features of Trello.

## Landing Page
<img src="https://github.com/ProjectWorkTeam/Jello/blob/main/assets/Jellofrontpage.jpg">

## All Boards
<img src="https://github.com/ProjectWorkTeam/Jello/blob/main/assets/Jelloboardpage.jpg">

## Board
<img src="https://github.com/ProjectWorkTeam/Jello/blob/main/assets/Jellotask.jpg">

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

 ## Team
- [Alex-Kim-SD](https://github.com/Alex-Kim-SD)
- [scarlettrobe](https://github.com/scarlettrobe)
- [Jojovial](https://github.com/Jojovial)
- [RetepG](https://github.com/RetepG)
