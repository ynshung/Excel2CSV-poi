<?php
$path    = '../csv';

// Scan the directory for files and skip the current and parent directories
$files = array_diff(scandir($path), array('.', '..'));

echo json_encode(array_values($files));