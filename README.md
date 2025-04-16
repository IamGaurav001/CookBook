# 🍳 CookBook - Recipe Management Platform

![CookBook Logo](./main/img/logo.png)

## 🌟 Overview
CookBook is a comprehensive recipe management platform designed to transform your culinary journey. The platform is divided into two main modules:

### 👨‍🍳 User Module
Users can register, manage their recipes, create meal plans, and generate shopping lists.

### 👩‍💼 Admin Module
Admins can manage recipes, categories, ingredients, and track user activities.

This system ensures a seamless and efficient recipe management experience for all users.

## 🚀 Features

### 👨‍🍳 User Features:
- **📝 Registration & Authentication**: Secure user registration and login system
- **📊 Dashboard**: View recipes, meal plans, and shopping lists
- **📂 Recipe Management**: Add, edit, and delete recipes
- **📅 Meal Planning**: Create and manage weekly meal plans
- **🛒 Shopping Lists**: Generate and manage shopping lists
- **📱 Profile Management**: Update personal details and preferences
- **🔑 Password Management**: Secure password change and recovery
- **📧 Email Notifications**: Receive notifications for important updates

### 👩‍💼 Admin Features:
- **📊 Admin Dashboard**: View statistics on recipes, users, and activities
- **📂 Category Management**: Add, update, and delete recipe categories
- **📂 Ingredient Management**: Manage ingredient database
- **📂 Recipe Management**: Add, update, and delete recipes
- **👥 User Management**: View and manage user accounts
- **📊 Analytics**: Track platform usage and user engagement

## 🛠️ Tech Stack
The system is built using the following technologies:
- **Backend**: PHP 8.2
- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Database**: MySQL
- **Containerization**: Docker
- **Icons**: Font Awesome
- **Deployment**: Render support included

## 🖥️ Running Locally

### Prerequisites
- PHP 8.2 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- Composer (for PHP dependencies)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/CookBook.git
   cd CookBook
   ```

2. **Install Dependencies**
   ```bash
   composer install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`

4. **Set Up Database**
   - Create a new MySQL database
   - Import the database schema:
     ```bash
     mysql -u your_username -p your_database_name < database.sql
     ```

5. **Configure Web Server**
   - Point your web server to the `main` directory
   - Ensure proper permissions are set

### Using XAMPP
1. Place the project in your XAMPP's htdocs directory
2. Start Apache and MySQL services
3. Access the application at `http://localhost/CookBook`

### Using Docker
1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
2. Access the application at `http://localhost:8090`

## 📁 Project Structure
```
CookBook/
├── main/                  # Main application directory
│   ├── pages/            # PHP pages
│   ├── js/               # JavaScript files
│   ├── img/              # Images and assets
│   ├── src/              # Source files
│   └── index.php         # Main entry point
├── config.php            # Database configuration
├── database.sql          # Database schema
├── composer.json         # PHP dependencies
└── Dockerfile            # Docker configuration
```

## 🔒 Security Features
- Password hashing
- Session management
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact
- Email: info@cookbook.com
- Phone: +91 79893096
- Address: 123 CookBook St, HYD, 500054

## 🙏 Acknowledgments
- Font Awesome for icons
- Tailwind CSS for styling
- Unsplash for images 