# Project Management Application

## Overview

This is a simple CRUD application designed to help users manage their projects efficiently. Built with Django as the backend and React.js as the frontend, this application allows users to create, update, delete, and track the progress of various projects.

## Features

- Create new projects with details such as name, status, start date, end date, description, project manager, and employees.
- Edit existing projects.
- Delete projects.
- View a list of all projects.
- Responsive design for better usability on different devices.

## Technologies Used

- **Frontend**: React.js, Material-UI, Axios, Day.js, Vite
- **Backend**: Django, Django REST Framework (DRF)
- **Database**: SQLite
- **Styling**: Material-UI for React components

## Installation

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- Django (v3.2 or later)
- Django REST Framework
- SQLite (comes pre-installed with Python)

### Clone the Repository

```
git clone https://github.com/Harsh2607/project-management-app.git
cd project-management-app
```

### Setup Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:

   ```bash
   venv\Scripts\activate
   ```

   - On macOS/Linux:

   ```bash
   source venv/bin/activate
   ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

5. Run migrations to set up the database:
   ```
   python manage.py migrate
   ```

6. Create a superuser (optional, for accessing the admin panel):
   ```
   python manage.py createsuperuser
   ```

7. Start the Django server:
   ```
   python manage.py runserver
   ```

### Setup Frontend

1. Navigate to the frontend directory:
   ```
   cd ../frontend
   ```

2. Install the required packages:
   ```
   npm install
   ```
   
   * These below modules need to be installed for the frontend to work properly:
     
   ```
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-hook-form @hookform/resolvers yup @mui/x-date-pickers axios dayjs material-react-table react-router-dom
   ```
  
3. Start the Vite development server:
   ```
   npm run dev
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the application.
- Use the provided UI to create, edit, delete, and view projects.

## API Endpoints

- **GET** `/api/project/` - Retrieve a list of all projects.
- **POST** `/api/project/` - Create a new project.
- **GET** `/api/project/{id}/` - Retrieve a specific project by ID.
- **PUT** `/api/project/{id}/` - Update a specific project by ID.
- **DELETE** `/api/project/{id}/` - Delete a specific project by ID.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

Thanks to the contributors and the open-source community for their support and resources.

