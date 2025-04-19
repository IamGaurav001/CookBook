<?php
$upload_dir = __DIR__ . "/main/img/recipes/";

// Create the directory if it doesn't exist
if (!file_exists($upload_dir)) {
    if (mkdir($upload_dir, 0755, true)) {
        echo "Created upload directory: $upload_dir\n";
    } else {
        echo "Failed to create upload directory: $upload_dir\n";
        exit(1);
    }
}

// Set proper permissions
if (chmod($upload_dir, 0755)) {
    echo "Set permissions for upload directory\n";
} else {
    echo "Failed to set permissions for upload directory\n";
    exit(1);
}

// Create .htaccess to prevent direct access to uploaded files
$htaccess_content = "Order deny,allow\nDeny from all";
$htaccess_file = $upload_dir . ".htaccess";

if (file_put_contents($htaccess_file, $htaccess_content)) {
    echo "Created .htaccess file to protect uploads\n";
} else {
    echo "Failed to create .htaccess file\n";
    exit(1);
}

echo "Setup completed successfully!\n";
?> 