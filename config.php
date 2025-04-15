<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get environment variables from Render
$db_host = getenv('MYSQL_HOST') ?: die("MYSQL_HOST not set");
$db_user = getenv('MYSQL_USER') ?: die("MYSQL_USER not set");
$db_password = getenv('MYSQL_PASSWORD') ?: die("MYSQL_PASSWORD not set");
$db_name = getenv('MYSQL_DATABASE') ?: die("MYSQL_DATABASE not set");
$db_port = getenv('MYSQL_PORT') ?: 3306;

// Debug output (remove in production)
echo "Database Configuration:<br>";
echo "Host: " . $db_host . "<br>";
echo "Port: " . $db_port . "<br>";
echo "User: " . $db_user . "<br>";
echo "Database: " . $db_name . "<br>";
echo "Password is " . ($db_password ? 'set' : 'NOT SET') . "<br><br>";

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name, $db_port);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error() . 
        "<br>Error number: " . mysqli_connect_errno() . 
        "<br>Host: " . $db_host . 
        "<br>Port: " . $db_port . 
        "<br>User: " . $db_user . 
        "<br>Database: " . $db_name);
}

// Set charset
mysqli_set_charset($conn, "utf8");

echo "Connected successfully to MySQL!";
?>
