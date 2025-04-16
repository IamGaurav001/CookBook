<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get database credentials from environment variables
$db_host = getenv('MYSQLHOST') ?: 'localhost';
$db_port = getenv('MYSQLPORT') ?: '3306';
$db_user = getenv('MYSQLUSER') ?: 'root';
$db_pass = getenv('MYSQLPASSWORD') ?: '';
$db_name = getenv('MYSQLDATABASE') ?: 'cookBook';

// Debug output (remove in production)
echo "Database Configuration:\n";
echo "Host: " . $db_host . "\n";
echo "Port: " . $db_port . "\n";
echo "User: " . $db_user . "\n";
echo "Database: " . $db_name . "\n";

try {
    // Create connection
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Set charset to utf8mb4
    $conn->set_charset("utf8mb4");
    
    // Debug output (remove in production)
    echo "Connected successfully to the database!\n";
    
} catch (Exception $e) {
    // Log the error
    error_log("Database connection error: " . $e->getMessage());
    
    // Display a user-friendly error message
    die("We're experiencing some technical difficulties. Please try again later.");
}
?>