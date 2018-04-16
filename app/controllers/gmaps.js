/* */
const controller = require('lib/wiring/controller')

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDgzo8T8525gSc5HkvI5AAKXfbd_KKaKCs',
  Promise: Promise
})

// Geocode an address.
const index = (req, res, next) => {
  googleMapsClient.geocode({
    input: 'Boston'
  })
    .asPromise()
    .then((response) => {
      console.log(response.json.results)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = controller({
  index
})
