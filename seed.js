// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
const db = require('./models');

// database should only take in array of object,
// NOTE: outside of database like passing sjon object,
// json object will wrap this array with property name data,
// EX: {data: SFLocations}
let places = [
    {placetype: "Restroom", about: "a1", lat: "37.797857", lng: "-122.404884"},
    {placetype: "Drinking fountain", about: "a2", lat: "37.801807", lng: "-122.404766"},
    {placetype: "Restroom", about: "a3", lat: "37.800391", lng: "-122.400453"},
    {placetype: "Drinking fountain", about: "a4", lat: "37.796288", lng: "-122.400550"}
];

// remove all locations before seed locations
db.place.deleteMany({}, function(err, deletedplaces){
    if(err){console.log(err); return;}
    db.place.create(places, function(err, createdplaces){
        if(err){console.log(err); return;}
        console.log("Created new place", createdplaces._id)
        process.exit(); // when done, Exit program, else terminal need control-c to exit
    });
});