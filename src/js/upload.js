// Adapted from https://github.com/taniarascia/upload

const url = "/php/upload.php";
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const files = document.querySelector("[type=file]").files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (!file.name.match(/\.(xls|xlsx)$/)) {
            alert(`File "${file.name}" is not a valid Excel file. Please try again.`);
            return;
        }

        formData.append("files[]", file);
    }

    fetch(url, {
        method: "POST",
        body: formData,
    }).then((response) => {
        console.log(response);
        location.reload();
    });
});
