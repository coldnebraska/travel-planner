let token = ""

function getHotelToken () {
    let requestTokenURL = "https://test.api.amadeus.com/v1/security/oauth2/token"
    fetch(requestTokenURL, {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id={client key}&client_secret={secret key}'
    })
    .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        token = data.access_token
      })
      .then(function () {
        let requestUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL"
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