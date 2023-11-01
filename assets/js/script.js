let token = ""
const hotel = {
  city: "AUS", //user input 
  userRadius: 10 - 1, //user input
  name: [],
  radius: [], 
  rating: []
}

function getHotelToken () {
    const requestTokenURL = "https://test.api.amadeus.com/v1/security/oauth2/token"
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
        const requestUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=" + hotel.city + "&radius=" + hotel.userRadius + "&radiusUnit=MILE" + "&ratings=5,4,3,2"
        fetch(requestUrl, {
            method: "GET",
            headers: {'Authorization': 'Bearer ' + token}
        })
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            createHotelList(data)
          })
        })

      .then( function () {
        const requestUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AUS&destinationLocationCode=PAR&departureDate=2023-12-02&adults=1"
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

function createHotelList(data) {
  const hotelList = $("#hotel-list") // !jquery to the hotel list div
  
  for (i = 0; i < data.data.length; i++) {
    const createDiv = document.createElement("div")
    const createHeader = document.createElement("h1")
    const createPara = document.createElement("p")
    const createStar = document.createElement("p")

    // create a hotel div for each returned hotel
    createDiv.setAttribute("class", "hotel")
    createDiv.setAttribute("hotelID", data.data[i].hotelId)
    hotelList.append(createDiv)
    
    // add rating stars
    let ratingString = ""
    let x = 0
    while (x < data.data[i].rating) {
      ratingString += "★"
      x++
    }
    
    if (x < 5) {
      while (x < 5) {
        ratingString += "☆"
        x++
      }
    }
    
    // add each hotel value to its respective key
    hotel.name.push(data.data[i].name)
    hotel.radius.push(data.data[i].distance.value + " Mi") 
    hotel.rating.push(ratingString + " Stars")
    
    // append each hotel element to a hotel div
    createHeader.textContent = hotel.name[i]
    hotelList.children().eq(i).append(createHeader)
    createPara.textContent = hotel.radius[i]
    hotelList.children().eq(i).append(createPara)
    createStar.textContent = hotel.rating[i]
    hotelList.children().eq(i).append(createStar)
  }
} 

getHotelToken()
