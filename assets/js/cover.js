const getStartedButton = document.getElementById("getStartedButton");
    
    getStartedButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
    
        // Slide up the page
        document.body.style.transform = "translateY(-100%)";
        setTimeout(() => {
            // Redirect to the next page after the transition
            window.location.href = "flight.html";
        }, 500); // Adjust the time to match the transition duration
    });