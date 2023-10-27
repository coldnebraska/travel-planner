async function getFlights () {

    const url = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=LAX&to=LHR&date=2023-10-31&adult=1&child=1&type=economy&currency=USD';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd9bb9edea5msh1422754f7752fe3p1b627ejsnb707032c5420',
            'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

getFlights()