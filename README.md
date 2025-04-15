# CookBook Application

A web application for managing and sharing recipes.

## Deployment on Render

1. Fork this repository
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. The application will be automatically deployed

## Environment Variables

The following environment variables are automatically set by Render:

- `MYSQL_HOST`: Database host
- `MYSQL_PORT`: Database port
- `MYSQL_USER`: Database user
- `MYSQL_PASSWORD`: Database password
- `MYSQL_DATABASE`: Database name

## Local Development

1. Install XAMPP
2. Clone this repository to `/Applications/XAMPP/xamppfiles/htdocs/`
3. Start Apache and MySQL services
4. Access the application at `http://localhost/CookBook_copy/main`

## Database

The application uses MySQL for data storage. The database schema will be automatically created on first run.
