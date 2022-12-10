<?php


if (isset($_POST['file'])) {

    $file = $_POST['file'];
    $file_name = explode('.', $file)[0];
    
    $output = var_dump(shell_exec("java -classpath \"../lib/*\" ../ExcelToCSV.java \"../excel/$file\" \"../csv/$file_name.csv\" 2>&1"));
    
    unlink("../excel/$file");
    echo $output;

} else {
    echo "File not found";
}