'use strict'

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')
.resources('gmaps')
.resources('places')

.patch('/updateSortOrder/:id', 'places#updateSortOrder')
.patch('/updateCategory/:id', 'places#updateCategory')
.get('/placesOfInterest', 'places#showPlacesOfInterest')
.get('/destinations', 'places#showDestinations')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
