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
// ✅ Database connection details from Environment Variables
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_port = getenv('DB_PORT') ?: 3306;
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';
$db_name = getenv('DB_NAME') ?: 'cookbook';

$db_name = getenv('DB_NAME') ?: 'cookbook';

// 🔍 Debugging: Log the connection details (Mask password)
error_log("Attempting to connect to DB_HOST: " . $db_host);
error_log("Using DB_PORT: " . $db_port);
error_log("Using DB_USER: " . $db_user);
error_log("CA Cert Path: " . __DIR__ . '/ca.pem');

try {
    // 🌐 Create MySQL connection with SSL support
    $conn = mysqli_init();
    if (!$conn) {
        throw new Exception("mysqli_init failed");
    }

    // 🔒 Configure SSL if ca.pem exists
    $ca_cert = __DIR__ . '/ca.pem';
    if (file_exists($ca_cert)) {
        // mysqli_ssl_set(connection, key, cert, ca, capath, cipher)
        $conn->ssl_set(NULL, NULL, $ca_cert, NULL, NULL);
    }

    // 🔌 Connect to the database
    // Note: real_connect returns boolean, check $conn->connect_error on failure
    if (!$conn->real_connect($db_host, $db_user, $db_pass, $db_name, $db_port)) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // ✅ Set UTF-8 character encoding
    $conn->set_charset("utf8mb4");

    // ✅ Optional: Show success message (Disable in production)
    // echo "✅ Connected to MySQL successfully!<br>";

    // 🔍 Optional: Show all tables in the DB
    // $result = $conn->query("SHOW TABLES");
    // while ($row = $result->fetch_row()) {
    //     echo "📦 Table: $row[0]<br>";
    // }
    //     echo "📦 Table: $row[0]<br>";
    // }
} catch (Exception $e) {
    // Log and show database error
    error_log("Database connection error: " . $e->getMessage());
    die("Database Error: " . $e->getMessage());
}
