<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// TODO: Switch back to environment variables when deployed
$db_host = getenv('MYSQLHOST');
$db_port = getenv('MYSQLPORT');
$db_user = getenv('MYSQLUSER');
$db_password = getenv('MYSQLPASSWORD');
$db_name = getenv('MYSQLDATABASE');

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