/* */
const controller = require('lib/wiring/controller')

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDgzo8T8525gSc5HkvI5AAKXfbd_KKaKCs'
})

// Geocode an address.
const index = (req, res, next) => {
  googleMapsClient.geocode({
    address: 'Boston'
  }, function (err, response) {
    if (!err) {
      console.log(response.json.results)
    }
  })
}

module.exports = controller({
  index
})
