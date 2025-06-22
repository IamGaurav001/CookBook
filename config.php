<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Unset any environment variables that might interfere with the connection
foreach ($_ENV as $key => $value) {
    if (strpos($key, 'MYSQL_') === 0) {
        unset($_ENV[$key]);
    }
}

// ✅ Railway public MySQL connection details
$db_host = 'shinkansen.proxy.rlwy.net'; // Public host from Railway
$db_port = 50253;
$db_user = 'root';
$db_pass = 'PdtMhBXYJCincDyhpKkqVXjbrYfywsWA';
$db_name = 'railway';

try {
    // 🌐 Create MySQL connection
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);

    // ❌ Check for connection error
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // ✅ Set UTF-8 character encoding
    $conn->set_charset("utf8mb4");

    // ✅ Optional: Show success message
    // echo "✅ Connected to Railway MySQL successfully!<br>";

    // 🔍 Optional: Show all tables in the DB
    // $result = $conn->query("SHOW TABLES");
    // while ($row = $result->fetch_row()) {
    //     echo "📦 Table: $row[0]<br>";
    // }

} catch (Exception $e) {
    // Log and show database error
    error_log("Database connection error: " . $e->getMessage());
    die("Database Error: " . $e->getMessage());
}
