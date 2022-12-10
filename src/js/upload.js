// Adapted from https://github.com/taniarascia/upload

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
        console.log(response);
        
        if (response.status === 200) {
            document.getElementById("no-file-upload").style.display = "none";
            document.getElementById("contains-files").style.display = "flex";
            document.getElementById("sidebar").style.display = "flex";
        }
    });
};