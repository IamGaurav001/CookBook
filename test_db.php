<?php
require_once 'config.php';

// Test database connection
echo "Testing database connection...\n";
if ($conn) {
    echo "✅ Database connection successful!\n";
} else {
    echo "❌ Database connection failed!\n";
    exit;
}

// Test table existence
$tables = ['users', 'recipes', 'recipe_ingredients', 'recipe_instructions', 
           'meal_plans', 'meal_plan_slots', 'meal_plan_items', 
           'shopping_lists', 'shopping_list_items'];

echo "\nChecking table existence...\n";
foreach ($tables as $table) {
    $result = $conn->query("SHOW TABLES LIKE '$table'");
    if ($result->num_rows > 0) {
        echo "✅ Table '$table' exists\n";
    } else {
        echo "❌ Table '$table' is missing\n";
    }
}

// Test inserting a test user
echo "\nTesting user creation...\n";
$test_email = "test" . time() . "@example.com";
$test_password = password_hash("test123", PASSWORD_DEFAULT);
$test_name = "Test User";

$stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $test_name, $test_email, $test_password);

if ($stmt->execute()) {
    echo "✅ Test user created successfully\n";
    
    // Test retrieving the user
    $result = $conn->query("SELECT * FROM users WHERE email = '$test_email'");
    if ($result->num_rows > 0) {
        echo "✅ Test user retrieved successfully\n";
        
        // Clean up test data
        $conn->query("DELETE FROM users WHERE email = '$test_email'");
        echo "✅ Test data cleaned up\n";
    } else {
        echo "❌ Failed to retrieve test user\n";
    }
} else {
    echo "❌ Failed to create test user\n";
    echo "Error: " . $stmt->error . "\n";
}

$conn->close();
?> 