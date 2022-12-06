<?php

// Get query string, path and file
$file = $_GET['file'];

// Delete file from excel folder
// Check if file exists
if (file_exists("../excel/$file")) {
    unlink("../excel/$file");

    // Delete file from csv folder
    $file_name = explode('.', $file)[0];

    if (file_exists("../csv/$file_name.csv")) {
        unlink("../csv/$file_name.csv");
    }
} else {
    echo "File does not exist";
}

