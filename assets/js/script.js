let token = ""
let hotel = {
  city: "AUS", //user input 
  name: [],
  radius: [],
  rating: []
}

let flights = {
    departTime: [],
    arrivalTime: [],
    returnDepartTime: [],
    returnArrivalTime: [],
    departAirline: [],
    returnAirline: [],
    departFlightNumber: [],
    returnFlightNumber: [],
    numPassengers: [],
    cost: [] ,
    button: []  
}

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
        let requestUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=PHL&destinationLocationCode=ORD&departureDate=2023-11-15&returnDate=2023-11-17&adults=2&nonStop=true&currencyCode=USD&max=25"
        fetch(requestUrl, {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            const flightOptions = $(".options")
            // const flightSave = $(".button")
            for(i = 0; i < data.data.length; ++i) {

                // const flightDiv = document.createElement("div");
                // flightDiv.setAttribute("class", "Flights");
                // flightOptions.append(flightDiv);
                
                const departFlightTime = document.createElement('h2');
                const arrivalFlightTime = document.createElement('h2');
                const returnDepartTime = document.createElement('h2');
                const returnArrivalTime = document.createElement('h2');
                const departAirlineCode = document.createElement('h2');
                // const returnAirlineCode = document.createElement('h2'); 
                // const departFlightNumber = document.createElement('h2');
                // const returnFlightNumber = document.createElement('h2');
                const passengers = document.createElement('h2')
                const flightPrice = document.createElement('h2');
                const flightSave = document.createElement('button');

            


                flights.departTime.push(data.data[i].itineraries[0].segments[0].departure.at)
                flights.arrivalTime.push(data.data[i].itineraries[0].segments[0].arrival.at)
                flights.returnDepartTime.push(data.data[i].itineraries[1].segments[0].departure.at)
                flights.returnArrivalTime.push(data.data[i].itineraries[1].segments[0].arrival.at)
                flights.departAirline.push(data.data[i].itineraries[0].segments[0].carrierCode)
                flights.returnAirline.push(data.data[i].itineraries[1].segments[0].carrierCode)
                flights.departFlightNumber.push(data.data[i].itineraries[0].segments[0].number)
                flights.returnFlightNumber.push(data.data[i].itineraries[1].segments[0].number)
                flights.cost.push(data.data[i].price.total)
                flights.numPassengers.push(data.data[i].travelerPricings.length)
                

                departFlightTime.textContent = flights.departTime[i];
                flightOptions.children().eq(0).append(departFlightTime);
                arrivalFlightTime.textContent = flights.arrivalTime[i];
                flightOptions.children().eq(1).append(arrivalFlightTime);
                returnDepartTime.textContent = flights.returnDepartTime[i];
                flightOptions.children().eq(2).append(returnDepartTime);
                returnArrivalTime.textContent = flights.returnArrivalTime[i];
                flightOptions.children().eq(3).append(returnArrivalTime);
                departAirlineCode.textContent = flights.departAirline[i];
                flightOptions.children().eq(4).append(departAirlineCode);
                // returnAirlineCode.textContent = flights.returnAirline[i];
                // flightOptions.children().eq(i).append(returnAirlineCode);
                // departFlightNumber.textContent = flights.departFlightNumber[i];
                // flightOptions.children().eq(i).append(departFlightNumber);
                // returnFlightNumber.textContent = flights.returnFlightNumber[i];
                // flightOptions.children().eq(i).append(returnFlightNumber);
                flightPrice.textContent = flights.cost[i];
                flightOptions.children().eq(5).append(flightPrice);
                passengers.textContent = flights.numPassengers[i];
                flightOptions.children().eq(6).append(passengers);

                flightSave.textContent = "💾 Save";
                flightOptions.children().eq(7).append(flightSave);

            }

           




            console.log(flights)
                
            });

      })
    }

getHotelToken()

