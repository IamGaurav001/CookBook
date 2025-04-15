<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database credentials
$db_host = "containers-us-west-207.railway.app";  // MySQL host
$db_port = "7107";                               // MySQL port
$db_user = "root";                              // MySQL username
$db_password = "4nPHHzxVMJxWDxhbLHpr";         // MySQL password
$db_name = "cookBook";                          // Your database name

// Debug output
echo "Database Configuration:<br>";
echo "Host: " . $db_host . "<br>";
echo "Port: " . $db_port . "<br>";
echo "User: " . $db_user . "<br>";
echo "Database: " . $db_name . "<br>";
echo "Password is " . ($db_password ? 'set' : 'NOT SET') . "<br><br>";

// Create connection with port
$conn = mysqli_connect($db_host, $db_user, $db_password, $db_name, $db_port);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error() . 
        "<br>Error number: " . mysqli_connect_errno());
}

// Set charset
mysqli_set_charset($conn, "utf8");

echo "Connected successfully to MySQL!<br>";
echo "Server version: " . mysqli_get_server_info($conn) . "<br>";
echo "Character set: " . mysqli_character_set_name($conn) . "<br>";
?>
