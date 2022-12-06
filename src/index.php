<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CAT201 Assignment 1</title>
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>
        <div id="container">
            <h1>Excel to CSV Converter</h1>
    
            <div id="files-container"></div>
            <br/>
            <!-- Excel File input -->
            <form method="post" enctype="multipart/form-data" id="upload-form">
                <label for="file">Select an Excel file to upload:</label><br/>
                <input type="file" name="files[]" id="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple />
                <input type="submit" name="submit" value="Upload" />
            </form>
        </div>

        <script src="/js/script.js"></script>
        <script src="/js/upload.js"></script>
    </body>
</html>
