function getFlights() {
    document.addEventListener('submit', async function (event) {
        event.preventDefault();
        let depart = document.getElementById("outgoing").value;
        let destination = document.getElementById("destination").value;
        let dateOut = document.getElementById("outgoing-date").value;
        let returnDate = document.getElementById("return-date").value;
        let passengers = document.getElementById("passengers").value;
        let departApi = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=' + depart + '&to=' + destination + '&date=' + dateOut + '&adult=' + passengers + '&child=0&type=economy&currency=USD';
        let returnApi = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=' + destination + '&to=' + depart + '&date=' + returnDate + '&adult=' + passengers + '&child=0&type=economy&currency=USD';
        // let toCity = '&to=' + destination;
        // let date = '&date=' + dateOut;
        // let seats = '&adult=' + passengers;
        // let endUrl = '&child=0&type=economy&currency=USD'
        // let returnFlight = destination;
        // let returnDestination = '&to=' + depart;
        // let dateBack = '&date=' + returnDate;
        // let departUrl = api + depart + toCity + date + seats + endUrl;
        // let returnUrl = api + returnFlight + returnDestination + dateBack + seats + endUrl;
        console.log(departApi);
        console.log(returnApi)

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'd9bb9edea5msh1422754f7752fe3p1b627ejsnb707032c5420',
                'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(departApi, options);
            const result = await response.json();
            const returnResponse = await fetch(returnApi, options);
            const returnResult = await returnResponse.json();

            console.log(result);
            console.log(returnResult)
        } catch (error) {
            console.log(error);
        }
    })
}
getFlights()

