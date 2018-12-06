const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const placeSchema = new Schema({
    placetype: String,
    about: String,
    lat: Number,
    lng: Number
});

const place = mongoose.model('place', placeSchema);

module.exports = place;
