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
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// root route
// get
app.get('/', (req, res) => {
   res.send('this is root route')
});

// place route
// post
// listen to form sumbit request, read in form data, send back sucess DB entry
app.post('/place', (req, res) => {
   // res.send('this is places route!')
   if(req.body){
       const {placetype, about} = req.body;
       console.log('placetype: '+placetype, 'about: '+about);
       res.json({placetype: placetype, about: about});
   }else{
       res.json({error: 'request error'});
   }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));