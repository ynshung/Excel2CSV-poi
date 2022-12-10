// Adapted from https://github.com/taniarascia/upload

let CONVERTING_ALL = false;

const url = "/php/upload.php";
const form = document.querySelector("form");

// Implement the drag and drop functionality, id: drop-area
const dropArea = document.getElementById("drop-area");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropArea.classList.add("highlight");
}

function unhighlight(e) {
    dropArea.classList.remove("highlight");
}

dropArea.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

const input = document.getElementById("file");
input.addEventListener("change", (e) => {
    handleFiles(e.target.files);
});

const input2 = document.getElementById("file2");
input2.addEventListener("change", (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    files = [...files];

    submitFiles(files)
}

function submitFiles(files) {
    document.getElementById("upload-file").style.display = "none";
    document.getElementById("upload-loading").style.display = "flex";

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (!file.name.match(/\.(xls|xlsx)$/)) {
            alert(
                `File "${file.name}" is not a valid Excel file. Please try again.`
            );
            document.getElementById("upload-file").style.display = "flex";
            document.getElementById("upload-loading").style.display = "none";
            return;
        }

        formData.append("files[]", file);
    }

    fetch(url, {
        method: "POST",
        body: formData,
    }).then((response) => {
        if (response.status !== 200) {
            alert("There was an error uploading your file. Please check the console for more information.");
        }
        document.getElementById("upload-file").style.display = "flex";
        document.getElementById("upload-loading").style.display = "none";
        showUploadedFiles();
    });
};

document.addEventListener("DOMContentLoaded", showUploadedFiles);

async function showUploadedFiles() {
    // Loop through the files 
    const response = await fetch("/php/get_files.php");
    const data = await response.json();


    // Check if there are any files
    if (data.length === 0) {
        document.getElementById("no-file-upload").style.display = "flex";
        document.getElementById("contains-files").style.display = "none";
        document.getElementById("sidebar").style.display = "none";
        return;
    }

    document.getElementById("no-file-upload").style.display = "none";
    document.getElementById("contains-files").style.display = "flex";
    document.getElementById("sidebar").style.display = "flex";

    const filesContainer = document.getElementById("files-container");
    filesContainer.innerHTML = "";
    
    data.forEach((file) => {
        const fileItem = document.createElement("div");
        fileItem.classList.add("grid-item");
        let fileEle = `
            <div class="file-border" data-file="${file}" onclick="selectFile('${file}')">
                <button class="delete-file-icon" onclick="deleteFile('${file}', event)">
                    <img class="cross-icon" src="icon/cross.png" width="20px">
                </button>
                <div class="file">`;

        if (file.match(/\.(csv)$/)) {
            fileEle += `
                <img class="file-icon" src="icon/csv1.png" width="50px">
                `;
        } else {
            fileEle += `
                <img class="file-icon" src="icon/excel.png" width="50px">
                `;
        }
        
        fileEle += `
                </div>
                <div class="file-info">
                    <p class="file-name">
                        ${file}
                    </p>
                </div>
            </div>
        `;
        fileItem.innerHTML = fileEle;
        filesContainer.appendChild(fileItem);
    });

}

function selectFile(fileName) {
    const fileElements = document.querySelectorAll(".file-border");
    fileElements.forEach((fileElement) => {
        if (fileElement.dataset.file === fileName) {
            fileElement.classList.add("selected");
        } else {
            fileElement.classList.remove("selected");
        }
    });

    // Change filename-sidebar to the selected file
    document.getElementById("filename-sidebar").innerHTML = fileName;

    if (fileName.match(/\.(csv)$/)) {
        document.getElementById("sidebar-excel").style.display = "none";
        document.getElementById("sidebar-csv").style.display = "flex";

        document.getElementById("download").style.display = "flex";
        document.getElementById("convert-single").style.display = "none";

        document.getElementById("download-link").href = `/csv/${fileName}`;
    } else {
        document.getElementById("sidebar-csv").style.display = "none";
        document.getElementById("sidebar-excel").style.display = "flex";

        document.getElementById("download").style.display = "none";
        document.getElementById("convert-single").style.display = "flex";
    }
}

function deleteFile(fileName, event) {
    event.stopPropagation();

    const formData = new FormData();
    formData.append("file", fileName);

    fetch("/php/delete_file.php", {
        method: "POST",
        body: formData,
    }).then((response) => {
        if (response.status !== 200) {
            alert("There was an error deleting your file. Please check the console for more information.");
        } else {
            if (document.getElementById("filename-sidebar").innerHTML === fileName) {
                noFileSelected();
            }
        }
        showUploadedFiles();

        response.text().then((data) => {
            console.log(data);
        });
    });
}

function noFileSelected() {
    document.getElementById("download").style.display = "none";
    document.getElementById("convert-single").style.display = "none";

    document.getElementById("filename-sidebar").innerHTML = "No file selected!";
    document.getElementById("sidebar-excel").style.display = "none";
    document.getElementById("sidebar-csv").style.display = "none";
}

function convertCSV() {
    if (CONVERTING_ALL) return;

    const fileName = document.getElementById("filename-sidebar").innerHTML;
    const formData = new FormData();
    formData.append("file", fileName);

    document.getElementById("convert-text").style.display = "none";
    document.getElementById("converting").style.display = "flex";

    // Disable button
    document.getElementById("convert-button-id").disabled = true;
    document.getElementById("convert-button-id").style.cursor = "not-allowed";

    fetch("/php/convert_file.php", {
        method: "POST",
        body: formData,
    }).then((response) => {
        document.getElementById("convert-button-id").disabled = false;
        document.getElementById("convert-button-id").style.cursor = "pointer";
        if (response.status !== 200) {
            alert("There was an error converting your file. Please check the console for more information.");
        } else {
            const newFileName = fileName.split(".").slice(0, -1).join(".") + ".csv";
            showUploadedFiles().then(() => {
                // Check if user still has the same file selected
                if (document.getElementById("filename-sidebar").innerHTML === fileName) {
                    selectFile(newFileName);
                    document.getElementById("convert-text").style.display = "block";
                    document.getElementById("converting").style.display = "none";
                }
            });
        }

        response.text().then((data) => {
            console.log(data);
        });
    });
}

function convertAll() {
    const fileElements = document.querySelectorAll(".file-border");
    let allConverted = true;
    fileElements.forEach((fileElement) => {
        if (fileElement.dataset.file.match(/\.(xls|xlsx)$/)) {
            allConverted = false;
        }
    });

    if (allConverted) {
        alert("All files are already converted!");
        return;
    }

    CONVERTING_ALL = true;

    document.getElementById("convert-all-text").style.display = "none";
    document.getElementById("converting-all").style.display = "flex";

    document.getElementById("convert-all-button-id").disabled = true;
    document.getElementById("convert-all-button-id").style.cursor = "not-allowed";

    document.getElementById("convert-button-id").disabled = true;
    document.getElementById("convert-button-id").style.cursor = "not-allowed";

    // convert-all-progress
    let converted = 0;
    document.getElementById("convert-all-progress").innerHTML = `0/${fileElements.length}`;

    const fetchReq = (fileName) => {
        const formData = new FormData();
        formData.append("file", fileName);

        return fetch("/php/convert_file.php", {
            method: "POST",
            body: formData,
        }).then((response) => {
            converted++;
            document.getElementById("convert-all-progress").innerHTML = `${converted}/${fileElements.length}`;

            if (response.status !== 200) {
                alert("There was an error converting your file. Please check the console for more information.");
            } else {
                const newFileName = fileName.split(".").slice(0, -1).join(".") + ".csv";
                showUploadedFiles().then(() => {
                    // Check if user still has the same file selected
                    if (document.getElementById("filename-sidebar").innerHTML === fileName) {
                        selectFile(newFileName);
                    }
                });
            }

            response.text().then((data) => {
                console.log(data);
            });
        });
    };

    const promises = [];
    fileElements.forEach((fileElement) => {
        const fileName = fileElement.dataset.file;
        if (!fileName.match(/\.(csv)$/)) {
            promises.push(fetchReq(fileName));
        }
    });
    
    // Run all conversions in parallel
    Promise.all(promises).then(() => {
        document.getElementById("convert-all-text").style.display = "block";
        document.getElementById("converting-all").style.display = "none";

        document.getElementById("convert-all-button-id").disabled = false;
        document.getElementById("convert-all-button-id").style.cursor = "pointer";

        document.getElementById("convert-button-id").disabled = false;
        document.getElementById("convert-button-id").style.cursor = "pointer";
        CONVERTING_ALL = false;
    });
}