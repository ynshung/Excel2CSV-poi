<?php

// Set the directory paths
$csv_dir = '../csv';
$excel_dir = '../excel';

// Initialize the file names array
$file_names = array();

// Scan the '../csv' directory for files
$csv_files = scandir($csv_dir);
foreach ($csv_files as $file) {
  if ($file != '.' && $file != '..') {
    $file_names[] = $file;
  }
}

// Scan the '../excel' directory for files
$excel_files = scandir($excel_dir);
foreach ($excel_files as $file) {
  if ($file != '.' && $file != '..') {
    $file_names[] = $file;
  }
}

// Encode the file names array as JSON
$json = json_encode($file_names);

// Output the JSON
echo $json;

