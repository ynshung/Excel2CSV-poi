<?php

if (isset($_POST['file'])) {
    // Check for both csv and excel files
    $file = $_POST['file'];
    $csv_file = "../csv/$file";
    $excel_file = "../excel/$file";

    if (file_exists($csv_file)) {
        unlink($csv_file);
    } else if (file_exists($excel_file)) {
        unlink($excel_file);
    }

    echo "File deleted successfully";
} else {
    echo "File not found";
}