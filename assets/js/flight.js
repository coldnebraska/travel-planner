const toggleReturnDateButton = document.getElementById("toggle-return-date");
const returnDateInput = document.getElementById("return-date");
toggleReturnDateButton.addEventListener("click", function () {
    if (returnDateInput.style.display === "none" || returnDateInput.style.display === "") {
        returnDateInput.style.display = "block";
    } else {
        returnDateInput.style.display = "none";
    }
});

const modal = document.getElementById("myModal");
modal.classList.remove("hidden");

const getStartedButton = document.getElementById("getStartedButton");
getStartedButton.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display= "none";
});

console.log("Get Started button clicked");


