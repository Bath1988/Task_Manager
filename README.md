# Task_Manager
This is a web application to manage work of people.

## Features

- **People Management:**  
  - Add new people with name, phone, email, and job.
  - View people in a paginated table.
  - Delete people from the list.

- **Task Management:**  
  - Add tasks for people.
  - Search and select a person from a searchable, scrollable dropdown.
  - View tasks in a paginated table.
  - Delete tasks.
  - Show all tasks or filter by person.

- **Navigation:**  
  - Navbar with buttons to switch between People and Tasks pages.

## Technologies

- React
- React Router
- CSS (App.css)
- Node.js/Express backend (API endpoints)
- Sequelize ORM (for database)

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
    ```
    git clone <repository-url>
    cd customerApp
    ```

2. Install dependencies for frontend:
    ```
    cd frontend
    npm install
    ```

3. Install dependencies for backend:
    ```
    cd ../api
    npm install
    ```

### Running the Application

1. Start the backend server:
    ```
    cd api
    npm start
    ```

2. Start the frontend development server:
    ```
    cd ../frontend
    npm start
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
customerApp/
├── api/           # Backend (Express, Sequelize)
├── frontend/      # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── List.js
│   │   │   ├── Chil.js
│   │   │   ├── Navbar.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
```

## API Endpoints

- `GET /api/people` - Get all people (or paginated with `limit` and `offset`)
- `POST /api/people` - Add a person
- `DELETE /api/people/:id` - Delete a person
- `GET /api/tasks` - Get all tasks (or paginated)
- `POST /api/tasks` - Add a task
- `DELETE /api/tasks/:id` - Delete a task

## Customization

- Edit `App.css` for UI changes.
- Update backend models/controllers for additional features.