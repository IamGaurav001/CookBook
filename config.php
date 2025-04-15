<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$db_host = "localhost";     // MySQL host
$db_user = "root";         // MySQL username
$db_password = "";         // MySQL password
$db_name = "cookBook";     // Your database name

// Debug output
echo "Database Configuration:<br>";
echo "Host: " . ($db_host ?: 'NOT SET') . "<br>";
echo "User: " . ($db_user ?: 'NOT SET') . "<br>";
echo "Database: " . ($db_name ?: 'NOT SET') . "<br>";
echo "Password is " . ($db_password ? 'set' : 'NOT SET') . "<br><br>";

// Create connection
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set charset
mysqli_set_charset($conn, "utf8");

echo "Connected successfully to MySQL!<br>";
echo "Server version: " . mysqli_get_server_info($conn) . "<br>";
echo "Character set: " . mysqli_character_set_name($conn) . "<br>";
?>
