<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get environment variables with fallbacks
$db_host = getenv('DB_HOST') ?: die('DB_HOST environment variable is not set');
$db_user = getenv('DB_USER') ?: die('DB_USER environment variable is not set');
$db_password = getenv('DB_PASSWORD') ?: die('DB_PASSWORD environment variable is not set');
$db_name = getenv('DB_NAME') ?: die('DB_NAME environment variable is not set');

// Debug connection info (remove in production)
echo "Attempting to connect to database:<br>";
echo "Host: " . $db_host . "<br>";
echo "User: " . $db_user . "<br>";
echo "Database: " . $db_name . "<br>";

// Create connection string for PostgreSQL
$conn_string = "host=$db_host dbname=$db_name user=$db_user password=$db_password";

// Create connection
try {
    $conn = pg_connect($conn_string);
    if (!$conn) {
        throw new Exception(pg_last_error());
    }
} catch (Exception $e) {
    die("Connection failed: " . $e->getMessage() . 
        "<br>Host: " . $db_host .
        "<br>User: " . $db_user .
        "<br>Database: " . $db_name);
}

// Set client encoding
pg_set_client_encoding($conn, "UTF8");
?>
