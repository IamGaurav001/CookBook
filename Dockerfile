FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mysqli mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . /var/www/html/

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader --ignore-platform-reqs

# Configure Apache
RUN a2enmod rewrite
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Configure VirtualHost
RUN echo "<VirtualHost *:80>" > /etc/apache2/sites-available/000-default.conf
RUN echo "    DocumentRoot /var/www/html/main" >> /etc/apache2/sites-available/000-default.conf
RUN echo "    <Directory /var/www/html/main>" >> /etc/apache2/sites-available/000-default.conf
RUN echo "        Options Indexes FollowSymLinks" >> /etc/apache2/sites-available/000-default.conf
RUN echo "        AllowOverride All" >> /etc/apache2/sites-available/000-default.conf
RUN echo "        Require all granted" >> /etc/apache2/sites-available/000-default.conf
RUN echo "        DirectoryIndex index.php index.html" >> /etc/apache2/sites-available/000-default.conf
RUN echo "    </Directory>" >> /etc/apache2/sites-available/000-default.conf
RUN echo "</VirtualHost>" >> /etc/apache2/sites-available/000-default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache in foreground
CMD ["apache2-foreground"] 