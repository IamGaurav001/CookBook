<?php
session_start();
require_once "../../config.php";

// Check if type and id parameters are set
if (!isset($_GET['type']) || !isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

$type = $_GET['type'];
$recipe_id = $_GET['id'];

// Validate type
if (!in_array($type, ['ingredients', 'instructions'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid type parameter']);
    exit;
}

// Prepare the query based on type
if ($type === 'ingredients') {
    $sql = "SELECT ingredient FROM recipe_ingredients WHERE recipe_id = ? ORDER BY id";
} else {
    $sql = "SELECT instruction FROM recipe_instructions WHERE recipe_id = ? ORDER BY step_number";
}

// Prepare and execute the query
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "i", $recipe_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// Fetch all results
$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($data);
?> 