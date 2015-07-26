// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions', function (req, res) {
    res.json(lions);
});

app.get('/lions/:id', function (req, res) {
    var id = req.params.id;
    res.send( lions[id] );
});

app.post('/lions', function(req, res){
    var newLion = req.body;
    if(!newLion.name || !newLion.pride || !newLion.age || !newLion.gender){
        return res.status(400).json({
            lion: newLion,
            status: "invalid lion"
        });
    }
    newLion.id = Math.round(Math.random()*1000);

    lions.push(newLion);
    res.status(201).send( newLion );
});

app.put('/lions/:id', function (req, res) {
    var id = req.params.id;
    var lion = lions.filter(function (lion) {
        return lion.id==id;
    });

    if(!lion){
        return res.status(404).send("lion not found");
    }

    // replace
    lion = lions[id] = req.body;
    res.send(lion);
});

app.delete('/lions/:id', function (req, res) {
    var id = req.params.id;
    var lion = lions[id];
    delete lions[id];

    res.send(lion);
});

app.listen(3000);
console.log('on port 3000');
