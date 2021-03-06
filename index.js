const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');

// to take care of cors error use either / both install cors or set request header
// install cors
// app.use(cors());
// react need both bodyParser and bodyParser.json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to take care of cors error use either / both install cors or set request header
// set request header
// to allow delete request, add delete here
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

const db = require('./models');

// root route, GET
// get all places from db, send to client as json
app.get('/', (req, res) => {
   // res.send('this is root route')
   db.place.find({}, (err, allplaces) => {
       if(err) { return console.log(err) }
       res.json(allplaces)
   });
});

// place route, POST
// listen to form sumbit request, read in form data, 
// add new place to db, send back sucess db entry
app.post('/place', (req, res) => {
   // res.send('this is places route!')
   if(req.body){
       const {placetype, about, lat, lng} = req.body;
       console.log('placetype: '+placetype, 'about: '+about, 'lat: '+lat, 'lng: '+lng);
       let newplace = {placetype: placetype, about: about, lat: lat, lng: lng};
       db.place.create(newplace, (err, addedplace) => {
           if (err) { return res.status(400).json({ err: "error can not add new place" }) }
           res.json(addedplace);
         });
       // res.json({placetype: placetype, about: about, lat: lat, lng: lng});
   }else{
       res.json({error: 'request error'});
   }
});

// place by id route, DELETE
// I did not send id as body, I send it as params that appended to url
app.delete('/place/:id', (req, res) => {
    // get place id from url params (`req.params`)
    console.log('place delete', req.params.id);
    var placeId = req.params.id;
    // find the index of the place we want to remove
    db.place.deleteOne(
    { _id: placeId },
    (err, deletedPlace) => {
      if (err) { return res.status(400).json({ err: "error has occured" }) }
      console.log('deletedPlace', deletedPlace);
      res.json(deletedPlace);
    });
 });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
