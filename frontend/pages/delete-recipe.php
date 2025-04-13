<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// session_start();

// if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//     header('Content-Type: application/json');
//     echo json_encode(['success' => false, 'message' => 'User not logged in']);
//     exit;
// }

// require_once "../../config.php";

// if(!isset($_POST["id"]) || empty($_POST["id"])){
//     header('Content-Type: application/json');
//     echo json_encode(['success' => false, 'message' => 'Recipe ID not provided']);
//     exit;
// }

// $recipe_id = intval($_POST["id"]);

// $sql = "SELECT id, image_path FROM recipes WHERE id = ? AND user_id = ?";
// if($stmt = mysqli_prepare($conn, $sql)){
//     mysqli_stmt_bind_param($stmt, "ii", $recipe_id, $_SESSION["id"]);
    
//     if(mysqli_stmt_execute($stmt)){
//         $result = mysqli_stmt_get_result($stmt);
        
//         if(mysqli_num_rows($result) == 1){
//             $recipe = mysqli_fetch_assoc($result);
            
//             mysqli_begin_transaction($conn);
            
//             try {
//                 $sql_delete_ingredients = "DELETE FROM recipe_ingredients WHERE recipe_id = ?";
//                 $stmt_delete_ingredients = mysqli_prepare($conn, $sql_delete_ingredients);
//                 mysqli_stmt_bind_param($stmt_delete_ingredients, "i", $recipe_id);
//                 mysqli_stmt_execute($stmt_delete_ingredients);
                
//                 $sql_delete_instructions = "DELETE FROM recipe_instructions WHERE recipe_id = ?";
//                 $stmt_delete_instructions = mysqli_prepare($conn, $sql_delete_instructions);
//                 mysqli_stmt_bind_param($stmt_delete_instructions, "i", $recipe_id);
//                 mysqli_stmt_execute($stmt_delete_instructions);
                
//                 $sql_delete_meal_plans = "DELETE FROM meal_plan_items WHERE recipe_id = ?";
//                 $stmt_delete_meal_plans = mysqli_prepare($conn, $sql_delete_meal_plans);
//                 mysqli_stmt_bind_param($stmt_delete_meal_plans, "i", $recipe_id);
//                 mysqli_stmt_execute($stmt_delete_meal_plans);
                
//                 $sql_delete_recipe = "DELETE FROM recipes WHERE id = ?";
//                 $stmt_delete_recipe = mysqli_prepare($conn, $sql_delete_recipe);
//                 mysqli_stmt_bind_param($stmt_delete_recipe, "i", $recipe_id);
//                 mysqli_stmt_execute($stmt_delete_recipe);
                
//                 mysqli_commit($conn);
                
//                 if(!empty($recipe['image_path'])){
//                     $image_path = "../" . $recipe['image_path'];
//                     if(file_exists($image_path)){
//                         unlink($image_path);
//                     }
//                 }
                
//                 header('Content-Type: application/json');
//                 echo json_encode(['success' => true, 'message' => 'Recipe deleted successfully']);
//             } catch (Exception $e) {
//                 mysqli_rollback($conn);
                
//                 header('Content-Type: application/json');
//                 echo json_encode(['success' => false, 'message' => 'Error deleting recipe: ' . $e->getMessage()]);
//             }
//         } else {
//             header('Content-Type: application/json');
//             echo json_encode(['success' => false, 'message' => 'Recipe not found or unauthorized']);
//         }
//     } else {
//         header('Content-Type: application/json');
//         echo json_encode(['success' => false, 'message' => 'Database error']);
//     }
    
//     mysqli_stmt_close($stmt);
// } else {
//     header('Content-Type: application/json');
//     echo json_encode(['success' => false, 'message' => 'Database error']);
// }

// mysqli_close($conn);
?>
