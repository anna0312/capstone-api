'use strict'

const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
  googlePlaceID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  sortOrder: {
    type: Number,
    required: false
  },
  googleInfo: {
    type: String,
    required: false
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place
