<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get database credentials from environment variables
$db_host = getenv('MYSQL_HOST');
$db_port = getenv('MYSQL_PORT');
$db_user = getenv('MYSQL_USER');
$db_password = getenv('MYSQL_PASSWORD');
$db_name = getenv('MYSQL_DATABASE');

// Debug output (be careful with password in production)
echo "Database Configuration:<br>";
echo "Host: " . $db_host . "<br>";
echo "Port: " . $db_port . "<br>";
echo "User: " . $db_user . "<br>";
echo "Database: " . $db_name . "<br>";
echo "Password is " . ($db_password ? 'set' : 'NOT SET') . "<br><br>";

try {
    // Create connection with port
    $conn = mysqli_connect($db_host, $db_user, $db_password, $db_name, $db_port);

    // Check connection
    if (!$conn) {
        throw new Exception(mysqli_connect_error());
    }

    echo "Connected successfully to MySQL!<br>";
    
} catch (Exception $e) {
    die("Connection failed: " . $e->getMessage() . 
        "<br>Host: " . $db_host . 
        "<br>Port: " . $db_port . 
        "<br>User: " . $db_user . 
        "<br>Database: " . $db_name);
}

// Set charset
mysqli_set_charset($conn, "utf8");
?>
