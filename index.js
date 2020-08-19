const express = require('express');
const routes = require('./router/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/iotgo',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;

//middleware
app.use(express.static('public'));

//body parser
app.use(bodyParser.json());

//initialize
app.use('/api',routes);


//error handling
app.use(function(err,req,res,next) {
   res.status(422).send({ error: err.message }); 
});

app.listen(process.env.port || 4000,function() {
   console.log('listening for requests'); 
});