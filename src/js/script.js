const listExeclFilesURL = "/php/list_excel_file.php";
const listCSVFilesURL = "/php/list_csv_file.php";

window.addEventListener("DOMContentLoaded", async () => {
    const listExcelFiles = await fetch(listExeclFilesURL);
    const listCSVFiles = await fetch(listCSVFilesURL);

    const excelFiles = await listExcelFiles.json();
    const csvFiles = await listCSVFiles.json();

    // List all the excel files available, if the csv file does not exist, then show the button to convert the file
    excelFiles.forEach((file) => {
        const fileURL = `/excel/${file}`;
        const fileName = file.split(".")[0];

        const fileContainer = document.createElement("div");
        fileContainer.classList.add("file-container");

        // Show the file name
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.target = "_blank";
        fileLink.innerText = file;

        fileContainer.appendChild(fileLink);

        // Check if the csv file exists
        const fileExists = csvFiles.find(
            (csvFile) => csvFile === `${fileName}.csv`
        );

        // If file exists
        if (fileExists) {
            // Show download button
            const downloadButton = document.createElement("button");
            downloadButton.innerText = "Download CSV";
            downloadButton.classList.add("download-button");
            downloadButton.addEventListener("click", () => {
                window.open(`/csv/${fileName}.csv`);
            });

            fileContainer.appendChild(downloadButton);
        } else {
            // Show convert button
            const convertButton = document.createElement("button");
            convertButton.innerText = "Convert to CSV";
            convertButton.classList.add("convert-button");
            convertButton.addEventListener("click", () => {
                convertFile(file);
            });

            fileContainer.appendChild(convertButton);
        }

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            deleteFile(file);
        });

        fileContainer.appendChild(deleteButton);

        // Append the file container to the body
        document.querySelector("#files-container").appendChild(fileContainer);
    });

    function convertFile(file) {
        const convertFileURL = `/php/convert_file.php?file=${file}`;

        fetch(convertFileURL)
            .then((response) => response.text())
            .then((data) => {
                console.log(data);

                // Check if contains text "File outputted succesfully"
                if (data.includes("File outputted succesfully") && !data.toUpperCase().includes("ERROR")) {
                    location.reload();
                } else {
                    alert("Something went wrong, please check the console log for more information");
                }
            });
    }

    async function deleteFile(file) {
        const deleteFileURL = `/php/delete_file.php?file=${file}`;

        const response = await fetch(deleteFileURL);
        const data = await response.text();

        console.log(data);
        location.reload();
    }
});
