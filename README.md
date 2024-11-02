# ArenaSync

ArenaSync is an advanced eSports platform designed to bring players, organizers, and fans together in one place. This project includes a comprehensive website that allows users to sign up, manage preferred games, register for events, and engage with other eSports enthusiasts. The platform also features an admin dashboard for managing games and events, complete with the ability to download registration details for specific events.

## Features

- **User Registration & Profile Management**: Users can sign up and maintain profiles that showcase their preferred games and past event participation.
- **Event Registration**: Users can view and register for upcoming eSports events.
- **Admin Dashboard**: Administrators have full control to:
  - Add new games and events.
  - View, edit, and delete event details.
  - Download registration details for each event.
- **Graph Database Integration**: Leveraging Neo4j for a recommendation engine that provides tailored game and event suggestions.
- **PostgreSQL Database**: Used for standard relational data management.

## Tech Stack

- **Frontend**: Developed using modern web technologies for a responsive and intuitive user experience.
- **Backend**: Built with Python and Flask.
- **Databases**:
  - **Neo4j**: A graph database used for the recommendation engine.
  - **PostgreSQL**: The primary relational database for storing user and event data.
- **Containerization**: Docker and Docker Compose are used for easy setup and deployment.

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ArenaSync.git
   cd ArenaSync
   ```

2. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

3. Access the platform:
   - The website will be accessible at `http://localhost:3000` (or a specified port in your `docker-compose.yml`).
   - Admin and user functionality will be available through the web interface.

## Project Structure

```
ArenaSync/
│
├── frontend/              # Frontend source code
├── backend/               # Backend Flask application code
│   ├── models/            # Database models for PostgreSQL
│   ├── routes/            # API route handlers
│   └── utils/             # Utility functions
│
├── migrations/            # Alembic migration scripts
│
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

## Key Functionalities

### User Dashboard
- Sign up, log in, and manage game preferences.
- Register for upcoming events and receive updates.

### Admin Dashboard
- Manage game entries and event details.
- Monitor event registrations and download participant data in CSV format.

### Recommendation Engine
- Utilizes Neo4j to deliver personalized game and event recommendations.

## Screenshots

### Home Page
![image](https://github.com/user-attachments/assets/aa0076ea-4771-457d-afa2-7706166bd5b5)


### Event Registration
![image](https://github.com/user-attachments/assets/f721f4c2-923f-40fc-b805-7b27bdefaf1a)

### Game Management
![image](https://github.com/user-attachments/assets/4961fdb7-8854-4c63-9a09-85cfb05133a5)

## How to Contribute

We welcome contributions! To contribute:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Description of changes"`.
4. Push to your branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact [your.email@example.com](mailto:tharooshavihidun@gmail.com) or open an issue on GitHub.

