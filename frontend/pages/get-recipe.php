<?php
require_once "../../config.php";

if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(["success" => false, "error" => "Recipe ID is required"]);
    exit;
}

$recipe_id = intval($_GET['id']);
$sql = "SELECT * FROM recipes WHERE id = ?";
if ($stmt = mysqli_prepare($conn, $sql)) {
    mysqli_stmt_bind_param($stmt, "i", $recipe_id);
    if (mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);
        if ($recipe = mysqli_fetch_assoc($result)) {
            echo json_encode(["success" => true, "recipe" => $recipe]);
        } else {
            echo json_encode(["success" => false, "error" => "Recipe not found"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Failed to execute query"]);
    }
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["success" => false, "error" => "Failed to prepare query"]);
}
?>