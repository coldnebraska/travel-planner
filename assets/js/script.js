// function getFlights() {
//     document.addEventListener('submit', async function (event) {
//         event.preventDefault();
//         let depart = document.getElementById("outgoing").value;
//         let destination = document.getElementById("destination").value;
//         let dateOut = document.getElementById("outgoing-date").value;
//         let returnDate = document.getElementById("return-date").value;
//         let passengers = document.getElementById("passengers").value;
//         let departApi = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=' + depart + '&to=' + destination + '&date=' + dateOut + '&adult=' + passengers ;
//         let returnApi = 'https://flight-fare-search.p.rapidapi.com/v2/flights/?from=' + destination + '&to=' + depart + '&date=' + returnDate + '&adult=' + passengers ;
        
//         console.log(departApi);
//         console.log(returnApi)

//         const options = {
//             method: 'GET',
//             headers: {
//                 'X-RapidAPI-Key': 'd9bb9edea5msh1422754f7752fe3p1b627ejsnb707032c5420',
//                 'X-RapidAPI-Host': 'flight-fare-search.p.rapidapi.com'
//             }
//         };

//         try {
//             const response = await fetch(departApi, options);
//             const result = await response.json();
//             const returnResponse = await fetch(returnApi, options);
//             const returnResult = await returnResponse.json();

//             console.log(result);
//             console.log(returnResult)
//         } catch (error) {
//             console.log(error);
//         }
//     })
// }
// getFlights()

function getHotelToken () {
    let requestTokenURL = "https://test.api.amadeus.com/v1/security/oauth2/token"
    fetch(requestTokenURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=guryqLQUIRoKA4EyXNaj5uAeyAG1pG22&client_secret=byRpyX39LG4bx9Ap'
    })
    .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        token = data.access_token
      })
      .then(function () {
        let requestUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PHL"
        fetch(requestUrl, {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            // for (i = 0; i < data.meta.count; i++) {
            //   hotel.name.push(data.data[i].name)
            //   hotel.radius.push(data.data[i].distance.value + " KM")
            //   hotel.rating.push(data.data[i].rating + " Stars")
            // }
            console.log(hotel)
        })
      })
      .then(function () {
        let requestUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=CLT&destinationLocationCode=PHL&departureDate=2023-12-02&adults=1&nonStop=false&max=250"
        fetch(requestUrl, {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
        })
      })
    }
    getHotelToken()


