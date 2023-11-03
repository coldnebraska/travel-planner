let token = ""
let button = ""
const hotel = {
  iata: [],
  name: [],
  radius: [], 
  rating: []
}
const userInput = {
  city: "",
  region: "",
  radius: 5 - 1 // !recommended 5 mi (prevent 100+ hotel list)
}

const savedItems = {
  hotel: [],
  flight: {}
}

function searchIataCode() {
  $(".error-msg").css("display", "none")
  hotel.iata = []
  userInput.city = $("#outgoing-city")[0].value
  userInput.state = $("#outgoing-state")[0].value

  console.log(userInput)
  const requestUrl = "https://api.api-ninjas.com/v1/airports?city=" + userInput.city + "&region=" + userInput.region
  fetch (requestUrl, {
    method: "GET",
    headers: {"X-Api-Key": "y+Klmvc+pjWsfHoKkI2OSA==h5DjimMBO5bvqGQp"}
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data)
    for (i = 0; i < data.length; i++) {
      if (data[i].iata != "") {
        hotel.iata.push(data[i].iata)
      }
    }
    console.log(hotel.iata)
    getHotelToken()
  })
}

$(".search-button").click(searchIataCode)

let index = 0

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
    flightSearch()
    hotelSearch()
  })
}

function hotelSearch() {
  let iataCode = hotel.iata[index]
  const hotelUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=" + iataCode + "&radius=" + userInput.radius + "&radiusUnit=MILE" + "&ratings=5,4,3,2"
  fetch(hotelUrl, {
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
  .catch(error => {
    if (iataCode != undefined) {
      index += 1
      hotelSearch()
    } else {
      $(".error-msg").css("display", "block")
    }
  })
}

function flightSearch() {
  iataCode = hotel.iata[index]
  const flightUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + iataCode + "&destinationLocationCode=PAR&departureDate=2023-12-02&adults=1"
  fetch(flightUrl, {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + token}
  })
  .then(function(response){
      return response.json()
  })
  .then(function(data){
      console.log(data)
  })
}

function createHotelList(data) {
  const hotelList = $(".results-list") // !jquery to the hotel list div
  for (i = 0; i < data.data.length; i++) {
    const createDiv = document.createElement("div")
    const createHeader = document.createElement("h1")
    const createPara = document.createElement("p")
    const createStar = document.createElement("p")
    const saveButton = document.createElement("button")

    // create a hotel div for each returned hotel
    createDiv.setAttribute("class", "hotel")
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

    // append save button to each div
    saveButton.textContent =  "💾 Save"
    saveButton.setAttribute("id", i)
    hotelList.children().eq(i).append(saveButton)
  }
  $("button[id]").click(function() {
    let id = this.id
    savedItems.hotel.push(hotel.name[this.id])
    hideButton(id)
    console.log(savedItems)
  })
}

function hideButton(id) {
  const hotelList = $(".results-list")
  const createPara = document.createElement("p")

  document.getElementById(id).style.display = "none"
  createPara.textContent = "Saved"
  createPara.setAttribute("class", "saved")
  hotelList.children().eq(id).append(createPara)
  $(".saved").css("font-style", "italic")

  localStorage.setItem("savedTrips", JSON.stringify(savedItems))
}

function changeTimeDisplay() {
  let time = "2023-11-15T17:32:00"
  let date = time.split("-")
  let month = date[1]
  let year = date[0]
  let newDate = date[2]
  let date1 = newDate.split("T")
  console.log(date1)
  let day = date1[0]
  console.log(month + "/" + day + "/" + year, date1[1])
}

changeTimeDisplay()