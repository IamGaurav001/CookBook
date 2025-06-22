<?php
session_start();
require_once "../../config.php";

// Check if id parameter is set
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing recipe ID']);
    exit;
}

$recipe_id = $_GET['id'];
$user_id = $_SESSION["id"];

// Fetch main recipe data
$sql = "SELECT * FROM recipes WHERE id = ? AND user_id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "ii", $recipe_id, $user_id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $recipe_data = $row;
    
    // Fetch ingredients
    $sql_ingredients = "SELECT * FROM recipe_ingredients WHERE recipe_id = ? ORDER BY id";
    $stmt_ingredients = mysqli_prepare($conn, $sql_ingredients);
    mysqli_stmt_bind_param($stmt_ingredients, "i", $recipe_id);
    mysqli_stmt_execute($stmt_ingredients);
    $result_ingredients = mysqli_stmt_get_result($stmt_ingredients);
    
    $ingredients = [];
    while ($row_ingredient = mysqli_fetch_assoc($result_ingredients)) {
        $ingredients[] = $row_ingredient;
    }
    
    // Fetch instructions
    $sql_instructions = "SELECT * FROM recipe_instructions WHERE recipe_id = ? ORDER BY step_number";
    $stmt_instructions = mysqli_prepare($conn, $sql_instructions);
    mysqli_stmt_bind_param($stmt_instructions, "i", $recipe_id);
    mysqli_stmt_execute($stmt_instructions);
    $result_instructions = mysqli_stmt_get_result($stmt_instructions);
    
    $instructions = [];
    while ($row_instruction = mysqli_fetch_assoc($result_instructions)) {
        $instructions[] = $row_instruction;
    }
    
    // Combine all data
    $recipe_data['ingredients'] = $ingredients;
    $recipe_data['instructions'] = $instructions;
    
    // Ensure all nutrition fields are included
    $recipe_data['protein'] = isset($row['protein']) ? $row['protein'] : null;
    $recipe_data['calories'] = isset($row['calories']) ? $row['calories'] : null;
    $recipe_data['carbs'] = isset($row['carbs']) ? $row['carbs'] : null;
    $recipe_data['fiber'] = isset($row['fiber']) ? $row['fiber'] : null;
    
    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'recipe' => $recipe_data]);
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Recipe not found']);
}
?> 