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
echo "Host: " . ($db_host ? $db_host : 'NOT SET') . "<br>";
echo "Port: " . ($db_port ? $db_port : 'NOT SET') . "<br>";
echo "User: " . ($db_user ? $db_user : 'NOT SET') . "<br>";
echo "Database: " . ($db_name ? $db_name : 'NOT SET') . "<br>";
echo "Password is " . ($db_password ? 'set' : 'NOT SET') . "<br><br>";

// Debug environment variables
echo "All Environment Variables:<br>";
foreach ($_ENV as $key => $value) {
    if (strpos($key, 'MYSQL_') === 0) {
        echo "$key: " . ($value ? 'set' : 'NOT SET') . "<br>";
    }
}
echo "<br>";

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
        "<br>Host: " . ($db_host ? $db_host : 'NOT SET') . 
        "<br>Port: " . ($db_port ? $db_port : 'NOT SET') . 
        "<br>User: " . ($db_user ? $db_user : 'NOT SET') . 
        "<br>Database: " . ($db_name ? $db_name : 'NOT SET'));
}

// Set charset
mysqli_set_charset($conn, "utf8");
?>
