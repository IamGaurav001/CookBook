#!/bin/bash
set -e

# Start MySQL
service mysql start

# Wait for MySQL to be ready
while ! mysqladmin ping -h"localhost" --silent; do
    sleep 1
done

# Start Apache in foreground
apache2-foreground 