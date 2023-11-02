let token = ""
let hotel = {
  city: "AUS", //user input 
  userRadius: 5, //user input
  name: [],
  radius: [], 
  rating: []
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
        let requestUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=" + hotel.city + "&radius=" + hotel.userRadius
        fetch(requestUrl, {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            for (i = 0; i < data.meta.count; i++) {
              hotel.name.push(data.data[i].name)
              hotel.radius.push(data.data[i].distance.value + " KM")
              hotel.rating.push(data.data[i].rating + " Stars")
            }
            console.log(hotel)
        })
      })

      .then(function () {
        let requestUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AUS&destinationLocationCode=PAR&departureDate=2023-12-02&adults=1"
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

