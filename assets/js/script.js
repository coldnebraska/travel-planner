let token = ""
let button = ""
const hotel = {
  outgoingIata: [],
  destinationIata: [],
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
  hotel.outgoingIata = []
  hotel.destinationIata = []
  $(".error-msg").css("display", "none")
  hotel.iata = []
  userInput.city = $("#outgoing-city")[0].value
  userInput.region = $("#outgoing-state")[0].value

  console.log(userInput)
  const requestUrl = "https://api.api-ninjas.com/v1/airports?city=" + userInput.city + "&region=" + userInput.region
  fetch(requestUrl, {
    method: "GET",
    headers: { "X-Api-Key": "y+Klmvc+pjWsfHoKkI2OSA==h5DjimMBO5bvqGQp" }
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // console.log(data)
      for (i = 0; i < data.length; i++) {
        if (data[i].iata != "") {
          hotel.outgoingIata.push(data[i].iata)
        }
      }
      console.log(hotel.outgoingIata)
      searchDestinationIataCode()
    })
}
console.log(searchDestinationIataCode)

function searchDestinationIataCode() {
  $(".error-msg").css("display", "none")
  hotel.iata = []
  userInput.city = $("#destination-city")[0].value
  userInput.region = $("#destination-state")[0].value

  // console.log(userInput)
  const requestUrl = "https://api.api-ninjas.com/v1/airports?city=" + userInput.city + "&region=" + userInput.region
  fetch(requestUrl, {
    method: "GET",
    headers: { "X-Api-Key": "y+Klmvc+pjWsfHoKkI2OSA==h5DjimMBO5bvqGQp" }
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      // console.log(data)
      for (i = 0; i < data.length; i++) {
        if (data[i].iata != "") {
          hotel.destinationIata.push(data[i].iata)
        }
      }
      console.log(hotel.destinationIata)
      getHotelToken()
    })
}

$(".search-button").click(searchIataCode)

let index = 0
// flight object for API Flight Info
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
  cost: []
}
function getHotelToken() {
  const requestTokenURL = "https://test.api.amadeus.com/v1/security/oauth2/token"
  fetch(requestTokenURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&client_id=guryqLQUIRoKA4EyXNaj5uAeyAG1pG22&client_secret=byRpyX39LG4bx9Ap'
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      token = data.access_token
      hotelSearch()
      flightSearch()
      console.log('hotel flight functions')
    })
}

function hotelSearch() {
  let iataCode = hotel.destinationIata[index]
  const hotelUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=" + iataCode + "&radius=" + userInput.radius + "&radiusUnit=MILE" + "&ratings=5,4,3,2"
  fetch(hotelUrl, {
    method: "GET",
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
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

// variables for creating dynamic url flight search
let $departDateInput = $('#outgoing-date');
let $returnDateInput = $('#return-date');
let $adultPassengerInput = $('#passengers');

// Flight Search Function
function flightSearch() {
  iataCode = hotel.outgoingIata[index]
  iataCodeDestination = hotel.destinationIata[index]
  console.log(iataCode)

  // Variable for the ID's set above grabbing the user input form the IDs for the dynamic url
  let departDate = $departDateInput.val();
  let returnDate = $returnDateInput.val();
  let adult = $adultPassengerInput.val();
  
  const flightUrl = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=" + iataCode + "&destinationLocationCode=" + iataCodeDestination + "&departureDate=" + departDate + "&returnDate=" + returnDate + "&adults=" + adult + "&max=30"
  console.log(flightUrl)
  fetch(flightUrl, {
    method: "GET",
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .catch(error => {
    if (iataCode != undefined) {
      index += 1
      flightSearch()
    }
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log(data)
    let resultsList = $(".flight-results")
    console.log('!!!!!!!!!!!!!!!!!!')
    for (i = 0;i < data.data.length; i++) {
      const createFlightDiv = document.createElement("div")
      createFlightDiv.setAttribute("class", "flight")
      resultsList.append(createFlightDiv)
      console.log('$$$$$$$$$$$$$$$')
      
      const createDt = document.createElement("p")
      const createAt = document.createElement("p")
      const createRdt = document.createElement("p")
      const createRat = document.createElement("p")
      const createDa = document.createElement("p")
      const createDfn = document.createElement("p")
      const createRfn = document.createElement("p")
      const createC = document.createElement("p")
      const createNp = document.createElement("p")
      const createButton = document.createElement("button")

      flights.departTime.push(data.data[i].itineraries[0].segments[0].departure.at)
      flights.arrivalTime.push(data.data[i].itineraries[0].segments[0].arrival.at)
      flights.returnDepartTime.push(data.data[i].itineraries[0].segments[0].departure.at)
      flights.returnArrivalTime.push(data.data[i].itineraries[0].segments[0].arrival.at)
      flights.departAirline.push(data.data[i].itineraries[0].segments[0].carrierCode)
      flights.returnAirline.push(data.data[i].itineraries[0].segments[0].carrierCode)
      flights.departFlightNumber.push(data.data[i].itineraries[0].segments[0].number)
      flights.returnFlightNumber.push(data.data[i].itineraries[0].segments[0].number)
      flights.cost.push(data.data[i].price.total)
      flights.numPassengers.push(data.data[i].travelerPricings.length)

      createDt.textContent = flights.departTime[i]
      resultsList.children().eq(i + 1).append(createDt)

      createAt.textContent = flights.arrivalTime[i]
      resultsList.children().eq(i + 1).append(createAt)

      createRdt.textContent = flights.returnDepartTime[i]
      resultsList.children().eq(i + 1).append(createRdt)

      createRat.textContent = flights.returnArrivalTime[i]
      resultsList.children().eq(i + 1).append(createRat)

      createDa.textContent = flights.departAirline[i]
      resultsList.children().eq(i + 1).append(createDa)

      createC.textContent = flights.cost[i]
      resultsList.children().eq(i + 1).append(createC)

      createNp.textContent = flights.numPassengers[i]
      resultsList.children().eq(i + 1).append(createNp)
      
      createButton.textContent = "Select Flight"
      resultsList.children().eq(i + 1).append(createButton)
    }

    if (data.data.length === 0) {
      $(".error-msg2").css("display", "block")
    }

    $("button[id]").click(function () {
      let id = this.id
      savedItems.flight.push(flights.departTime[this.id], flights.arrivalTime[this.id])
      hideButton(id)
      console.log(savedItems)
    })
  })

  function hideButton(id) {
    const flightList = $(".options")
    const createPara = document.createElement("p")

    document.getElementById(id).style.display = "none"
    createPara.textContent = "Saved"
    createPara.setAttribute("class", "saved")
    flightList.children().eq(id).append(createPara)
    $(".saved").css("font-style", "italic")

    localStorage.setItem("savedTrips", JSON.stringify(savedItems))
  }
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
    saveButton.textContent = "💾 Save"
    saveButton.setAttribute("id", i)
    hotelList.children().eq(i).append(saveButton)
  }
  $("button[id]").click(function () {
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
  // console.log(date1)
  let day = date1[0]
  // console.log(month + "/" + day + "/" + year, date1[1])
}

changeTimeDisplay()
