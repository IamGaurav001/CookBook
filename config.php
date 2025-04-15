<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get environment variables with fallbacks
$db_host = getenv('DB_HOST');
$db_user = getenv('DB_USER');
$db_password = getenv('DB_PASSWORD');
$db_name = getenv('DB_NAME');

// Debug connection info (remove in production)
echo "Attempting to connect to database:<br>";
echo "Host: " . $db_host . "<br>";
echo "User: " . $db_user . "<br>";
echo "Database: " . $db_name . "<br>";

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error() . 
        "<br>Error number: " . mysqli_connect_errno());
}

mysqli_set_charset($conn, "utf8");
?>
