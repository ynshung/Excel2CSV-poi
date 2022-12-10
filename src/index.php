<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CAT201 Assignment 1</title>

    <link href="https://fonts.googleapis.com/css2?family=Blinker:wght@200;300;400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- <link rel="stylesheet" href="styles/style.css" /> -->
    <link rel="stylesheet" href="styles/home-page.css">
    <link rel="stylesheet" href="styles/upload.css">

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

    <div class="center-border" id="upload">
        <div class="rectangle">
            <!-- Drag and drop -->
            <div class="smallrect" id="drop-area">
                <div class="rect-info">
                    <img class="excel-icon" src="icon/excel.png">
                    <img class="arrow-icon" src="icon/arrow.png">
                    <img class="csv-icon" src="icon/csv1.png">
                </div>

                <div class="upload-info">
                    <input type="file" name="files[]" id="file" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" multiple />
                    <label for="file" class="upload-button">
                        <img class="file-icon" src="icon/file.png" width="24px">
                        UPLOAD FILE
                        <img class="arrowdown-icon" src="icon/arrow-down.png" width="21px">
                    </label>
                </div>

                <div class="upload-bottom">
                    <p class="upload-words">
                        or drop Excel files here
                    </p>
                </div>
            </div>
        </div>
    </div>
    
    <script src="/js/upload.js"></script>
</body>

</html>