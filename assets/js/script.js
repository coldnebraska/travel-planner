function getFlights() {
    document.addEventListener('submit', async function (event) {
        event.preventDefault();
        let depart = document.getElementById("outgoing").value;
        let destination = document.getElementById("destination").value;
        let dateOut = document.getElementById("outgoing-date").value;
        let returnDate = document.getElementById("return-date").value;
        let passengers = document.getElementById("passengers").value;
        const api = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=';
        let toCity = '&to=' + destination;
        let date = '&date=' + dateOut;
        let seats = '&adult=' + passengers;
        let endUrl = '&child=0&type=economy&currency=USD'
        let returnFlight = destination;
        let returnDestination = '&to=' + depart;
        let dateBack = '&date=' + returnDate;
        let departUrl = api + depart + toCity + date + seats + endUrl;
        let returnUrl = api + returnFlight + returnDestination + dateBack + seats + endUrl;
        console.log(departUrl);
        console.log(returnUrl)

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd9bb9edea5msh1422754f7752fe3p1b627ejsnb707032c5420',
                'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(departUrl, options);
            const result = await response.json();
            const returnResponse = await fetch(returnUrl, options);
            const returnResult = await returnResponse.json();

            console.log(result);
            console.log(returnResult)
        } catch (error) {
            console.log(error);
        }
    })
}
getFlights()

// function returnFlight() {
//     document.addEventListener('submit', async function (event) {
//         event.preventDefault();
//         let depart = document.getElementById("outgoing").value;
//         let destination = document.getElementById("destination").value;
//         // let dateOut = document.getElementById("outgoing-date").value;
//         let returnDate = document.getElementById("return-date").value;
//         let passengers = document.getElementById("passengers").value;
//         const api = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=';
//         let returnCity = destination;
//         let homeCity = '&to=' + depart;
//         let homeDate = '&date=' + returnDate;
//         let seatsReturn = '&adult=' + passengers;
//         let endUrl = '&child=0&type=economy&currency=USD'
//         let returnUrl = api + returnCity + homeCity + homeDate + seatsReturn + endUrl;
//         console.log(returnUrl);

//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': 'd9bb9edea5msh1422754f7752fe3p1b627ejsnb707032c5420',
//                 'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
//             }
//         };

//         try {
//             const response = await fetch(returnUrl, options);
//             const result = await response.json();
//             console.log(result);
//         } catch (error) {
//             console.log(error);
//         }
//     })
// }

// departFlight()
// returnFlight()