<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CAT201 Assignment 1</title>

    <link href="https://fonts.cdnfonts.com/css/bitsumishi" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Blinker:wght@200;300;400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- <link rel="stylesheet" href="styles/style.css" /> -->
    <link rel="stylesheet" href="styles/home-page.css">

    <script src="https://kit.fontawesome.com/2673427424.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="background">
        <div class="first-section">
            <p class="excel">EXCEL</p>
            <i class="fa-solid fa-arrow-turn-down fa-inverse"></i>
            <!-- <span class="big-circle"></span> -->
        </div>
        <div class="second-section">
            <div class="title">
                <p class="csv">.CSV</p>
            </div>
            <div class="button">
                <a class="convert-button" href="#upload">Convert</a>
            </div>
        </div>
    </div>

    <!-- <div id="container">
            <h1>Excel to CSV Converter</h1>
    
            <div id="files-container"></div>
            <br/>
            
            <form method="post" enctype="multipart/form-data" id="upload-form">
                <label for="file">Select one or more Excel file(s) to upload:</label><br/>
                <input type="file" name="files[]" id="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple />
                <input type="submit" name="submit" value="Upload" />
            </form>
        </div> -->

    <script src="/js/script.js"></script>
    <script src="/js/upload.js"></script>
</body>

</html>