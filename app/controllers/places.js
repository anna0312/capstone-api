'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Place = models.place

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Place.find()
    .then(places => res.json({
      places: places.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  console.log(req.params.id)
  Place.findById(req.params.id)
    .then((place) => {
      res.json({
        place: place.toJSON({ virtuals: true, user: req.user })
      })
    })
}

const showPlacesOfInterest = (req, res, next) => {
  console.log(req)
  Place.find({'category': 'interested'})
      .then(places => res.json({
        places: places.map((e) =>
          e.toJSON({ virtuals: true, user: req.user }))
      }))
      .catch(next)
}

const showDestinations = (req, res, next) => {
  console.log(req)
  Place.find({'category': 'going'}).sort('sortOrder')
      .then(places => res.json({
        places: places.map((e) =>
          e.toJSON({ virtuals: true, user: req.user }))
      }))
      .catch(next)
}

const create = (req, res, next) => {
  const place = Object.assign(req.body.place, {
    _owner: req.user._id
  })
  Place.create(place)
    .then(place =>
      res.status(201)
        .json({
          place: place.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

// const update = (req, res, next) => {
//   delete req.body.place._owner  // disallow owner reassignment.
//   req.place.update(req.body.place)
//     .then(() => res.sendStatus(204))
//     .catch(next)
// }

const changeOrder = (req, res, next) => {
  Place.findOne({
    _id: req.params.id
  }).then(place => {
    place.sortOrder = req.body.sortOrder
    return place.save()
  }).then((/* user */) =>
    res.sendStatus(204)
  ).catch(next)
}

const destroy = (req, res, next) => {
  req.place.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  changeOrder,
  destroy,
  showDestinations,
  showPlacesOfInterest
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  // { method: setModel(Place), only: ['show'] },
  { method: setModel(Place, { forUser: true }), only: ['update', 'destroy'] }
] })
