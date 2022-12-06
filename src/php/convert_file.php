<?php

// Get query string
$file = $_GET['file'];

// Get file name
$file_name = explode('.', $file)[0];

$output = var_dump(shell_exec("java -classpath \"../lib/*\" ../ExcelToCSV.java \"../excel/$file\" \"../csv/$file_name.csv\" 2>&1"));

echo $output;