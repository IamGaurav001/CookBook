<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// TODO: Switch back to environment variables when deployed
// $db_host = getenv('MYSQL_HOST');
// $db_port = getenv('MYSQL_PORT');
// $db_user = getenv('MYSQL_USER');
// $db_password = getenv('MYSQL_PASSWORD');
// $db_name = getenv('MYSQL_DATABASE');

// Temporary direct credentials for development
$db_host = "containers-us-west-207.railway.app";
$db_port = "7107";
$db_user = "root";
$db_password = "4nPHHzxVMJxWDxhbLHpr";
$db_name = "cookBook";

// Debug output
echo "Database Configuration:<br>";
echo "Host: " . $db_host . "<br>";
echo "Port: " . $db_port . "<br>";
echo "User: " . $db_user . "<br>";
echo "Database: " . $db_name . "<br>";
echo "Password is set<br><br>";

$conn = null; // Initialize the connection variable

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
} finally {
    // Set charset after successful connection (if connection was established)
    if ($conn) {
        mysqli_set_charset($conn, "utf8");
    }
}
?>