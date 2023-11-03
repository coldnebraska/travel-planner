const toggleReturnDateButton = document.getElementById("toggle-return-date");
const returnDateInput = document.getElementById("return-date");
    toggleReturnDateButton.addEventListener("click", function () {
        if (returnDateInput.style.display === "none" || returnDateInput.style.display === "") {
            returnDateInput.style.display = "block";
        } else {
            returnDateInput.style.display = "none";
        }
    });
